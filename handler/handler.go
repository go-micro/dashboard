package handler

import (
	"path/filepath"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
	"github.com/xpunch/go-micro-dashboard/config"
	"github.com/xpunch/go-micro-dashboard/docs"
	"github.com/xpunch/go-micro-dashboard/handler/account"
	"github.com/xpunch/go-micro-dashboard/handler/registry"
	"github.com/xpunch/go-micro-dashboard/handler/route"
	"github.com/xpunch/go-micro-dashboard/handler/statistics"
	"go-micro.dev/v4/client"
)

type Options struct {
	Client client.Client
	Router *gin.Engine
}

func Register(opts Options) error {
	router := opts.Router
	if cfg := config.GetServerConfig(); cfg.Env == config.EnvDev {
		docs.SwaggerInfo.Host = cfg.Swagger.Host
		docs.SwaggerInfo.BasePath = cfg.Swagger.Base
		router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
	router.Use(static.Serve("/", static.LocalFile(config.GetServerConfig().Web.Path, false)))
	router.NoRoute(func(c *gin.Context) {
		c.File(filepath.Join(config.GetServerConfig().Web.Path, "index.html"))
	})
	if cfg := config.GetServerConfig().CORS; cfg.Enable {
		router.Use(CorsHandler(cfg.Origin))
	}
	for _, r := range []route.Registrar{
		account.NewRouteRegistrar(),
	} {
		r.RegisterRoute(router)
	}
	authRouter := opts.Router.Use(AuthRequired())
	for _, r := range []route.Registrar{
		registry.NewRouteRegistrar(opts.Client.Options().Registry),
		statistics.NewRouteRegistrar(opts.Client.Options().Registry),
	} {
		r.RegisterRoute(authRouter)
	}
	return nil
}
