package config

import "time"

const (
	EnvDev  = "dev"
	EnvProd = "prod"
)

type Config struct {
	Server ServerConfig
}

type ServerConfig struct {
	Env     string
	Address string
	Auth    AuthConfig
	CORS    CORSConfig
	Swagger SwaggerConfig
	Web     WebConfig
}

type AuthConfig struct {
	Username        string
	Password        string
	TokenSecret     string
	TokenExpiration time.Duration
}

type CORSConfig struct {
	Enable bool   `toml:"enable"`
	Origin string `toml:"origin"`
}

type SwaggerConfig struct {
	Host string
	Base string
}

type WebConfig struct {
	Path string
}

func GetConfig() Config {
	return *_cfg
}

func GetServerConfig() ServerConfig {
	return _cfg.Server
}

func GetAuthConfig() AuthConfig {
	return _cfg.Server.Auth
}

func GetSwaggerConfig() SwaggerConfig {
	return _cfg.Server.Swagger
}
