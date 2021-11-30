package handler

import (
	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
	"github.com/xpunch/go-micro-dashboard/config"
	"github.com/xpunch/go-micro-dashboard/docs"
	"github.com/xpunch/go-micro-dashboard/handler/account"
	handlerclient "github.com/xpunch/go-micro-dashboard/handler/client"
	"github.com/xpunch/go-micro-dashboard/handler/registry"
	"github.com/xpunch/go-micro-dashboard/handler/route"
	"github.com/xpunch/go-micro-dashboard/handler/statistics"
	"github.com/xpunch/go-micro-dashboard/web"
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
	if err := web.RegisterRoute(router); err != nil {
		return err
	}
	if cfg := config.GetServerConfig().CORS; cfg.Enable {
		router.Use(route.CorsHandler(cfg.Origin))
	}
	for _, r := range []route.Registrar{
		account.NewRouteRegistrar(),
		handlerclient.NewRouteRegistrar(opts.Client, opts.Client.Options().Registry),
		registry.NewRouteRegistrar(opts.Client.Options().Registry),
		statistics.NewRouteRegistrar(opts.Client.Options().Registry),
	} {
		r.RegisterRoute(router)
	}
	return nil
}
