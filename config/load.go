package config

import (
	"os"
	"strings"
	"time"

	"github.com/asim/go-micro/plugins/config/encoder/toml/v4"
	"github.com/asim/go-micro/plugins/config/encoder/yaml/v4"
	"github.com/pkg/errors"
	"github.com/xpunch/go-micro-dashboard/util"
	"go-micro.dev/v4/config"
	"go-micro.dev/v4/config/reader"
	"go-micro.dev/v4/config/reader/json"
	"go-micro.dev/v4/config/source/env"
	"go-micro.dev/v4/config/source/file"
	"go-micro.dev/v4/logger"
)

// internal instance of Config
var _cfg *Config = &Config{
	Server: ServerConfig{
		Env:     EnvProd,
		Address: ":4000",
		Auth: AuthConfig{
			Username:        "admin",
			Password:        "123456",
			TokenSecret:     "modifyme",
			TokenExpiration: 24 * time.Hour,
		},
		Swagger: SwaggerConfig{
			Host: "localhost:4000",
			Base: "/",
		},
		Web: WebConfig{
			Path: "web",
		},
	},
}

// Load will load configurations and update it when changed
func Load() error {
	var configor config.Config
	var err error
	switch strings.ToLower(os.Getenv("CONFIG_TYPE")) {
	case "env":
		configor, err = config.NewConfig(
			config.WithSource(env.NewSource()),
		)
	case "toml":
		filename := "config.toml"
		if name := os.Getenv("CONFIG_FILE"); len(name) > 0 {
			filename = name
		}
		configor, err = config.NewConfig(
			config.WithSource(file.NewSource(file.WithPath(filename))),
			config.WithReader(json.NewReader(reader.WithEncoder(toml.NewEncoder()))),
		)
	default:
		filename := "config.yaml"
		if name := os.Getenv("CONFIG_FILE"); len(name) > 0 {
			filename = name
		}
		configor, err = config.NewConfig(
			config.WithSource(file.NewSource(file.WithPath(filename))),
			config.WithReader(json.NewReader(reader.WithEncoder(yaml.NewEncoder()))),
		)
	}
	if err != nil {
		return errors.Wrap(err, "configor.New")
	}
	if err := configor.Load(); err != nil {
		return errors.Wrap(err, "configor.Load")
	}
	if err := configor.Scan(_cfg); err != nil {
		return errors.Wrap(err, "configor.Scan")
	}
	w, err := configor.Watch()
	if err != nil {
		return errors.Wrap(err, "configor.Watch")
	}
	util.GoSafe(func() {
		for {
			v, err := w.Next()
			if err != nil {
				logger.Error(err)
				return
			}
			if err := v.Scan(_cfg); err != nil {
				logger.Error(err)
				return
			}
		}
	})
	return nil
}
