package main

import (
	mhttp "github.com/asim/go-micro/plugins/server/http/v4"
	"github.com/gin-gonic/gin"
	"github.com/xpunch/go-micro-dashboard/config"
	"github.com/xpunch/go-micro-dashboard/handler"
	"go-micro.dev/v4"
	"go-micro.dev/v4/logger"
)

const (
	Name    = "go.micro.dashboard"
	Version = "1.0.0"
)

// @title Go Micro Dashboard
// @version 1.0.0
// @description go micro dashboard restful-api
// @termsOfService http://swagger.io/terms/
// @BasePath /
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization

func main() {
	if err := config.Load(); err != nil {
		logger.Fatal(err)
	}
	srv := micro.NewService(micro.Server(mhttp.NewServer()))
	opts := []micro.Option{
		micro.Name(Name),
		micro.Address(config.GetServerConfig().Address),
		micro.Version(Version),
	}
	srv.Init(opts...)
	if config.GetServerConfig().Env == config.EnvProd {
		gin.SetMode(gin.ReleaseMode)
	}
	router := gin.New()
	router.Use(gin.Recovery(), gin.Logger())
	if err := handler.Register(handler.Options{Client: srv.Client(), Router: router}); err != nil {
		logger.Fatal(err)
	}
	if err := micro.RegisterHandler(srv.Server(), router); err != nil {
		logger.Fatal(err)
	}
	if err := srv.Run(); err != nil {
		logger.Fatal(err)
	}
}
