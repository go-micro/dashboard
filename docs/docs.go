// Package docs GENERATED BY THE COMMAND ABOVE; DO NOT EDIT
// This file was generated by swaggo/swag
package docs

import (
	"bytes"
	"encoding/json"
	"strings"
	"text/template"

	"github.com/swaggo/swag"
)

var doc = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api/account/login": {
            "post": {
                "tags": [
                    "Account"
                ],
                "operationId": "account_login",
                "parameters": [
                    {
                        "description": "request",
                        "name": "input",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/account.loginRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "success",
                        "schema": {
                            "$ref": "#/definitions/account.loginResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/account/profile": {
            "get": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "tags": [
                    "Account"
                ],
                "operationId": "account_profile",
                "responses": {
                    "200": {
                        "description": "success",
                        "schema": {
                            "$ref": "#/definitions/account.profileResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/client/call": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "tags": [
                    "Client"
                ],
                "operationId": "client_call",
                "parameters": [
                    {
                        "description": "request",
                        "name": "input",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/client.callRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "success",
                        "schema": {
                            "type": "object"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/client/publish": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "tags": [
                    "Client"
                ],
                "operationId": "client_publish",
                "parameters": [
                    {
                        "description": "request",
                        "name": "input",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/client.publishRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "success",
                        "schema": {
                            "type": "object"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/registry/service": {
            "get": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "tags": [
                    "Registry"
                ],
                "operationId": "registry_getServiceDetail",
                "parameters": [
                    {
                        "type": "string",
                        "description": "service name",
                        "name": "name",
                        "in": "query",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "service version",
                        "name": "version",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/registry.getServiceDetailResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/registry/service/handlers": {
            "get": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "tags": [
                    "Registry"
                ],
                "operationId": "registry_getServiceHandlers",
                "parameters": [
                    {
                        "type": "string",
                        "description": "service name",
                        "name": "name",
                        "in": "query",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "service version",
                        "name": "version",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/registry.getServiceHandlersResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/registry/service/subscribers": {
            "get": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "tags": [
                    "Registry"
                ],
                "operationId": "registry_getServiceSubscribers",
                "parameters": [
                    {
                        "type": "string",
                        "description": "service name",
                        "name": "name",
                        "in": "query",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "service version",
                        "name": "version",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/registry.getServiceSubscribersResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/registry/services": {
            "get": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "tags": [
                    "Registry"
                ],
                "operationId": "registry_getServices",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/registry.getServiceListResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/summary": {
            "get": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "tags": [
                    "Statistics"
                ],
                "operationId": "statistics_getSummary",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/statistics.getSummaryResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/version": {
            "get": {
                "operationId": "getVersion",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "account.loginRequest": {
            "type": "object",
            "required": [
                "password",
                "username"
            ],
            "properties": {
                "password": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "account.loginResponse": {
            "type": "object",
            "required": [
                "token"
            ],
            "properties": {
                "token": {
                    "type": "string"
                }
            }
        },
        "account.profileResponse": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                }
            }
        },
        "client.callRequest": {
            "type": "object",
            "required": [
                "endpoint",
                "service"
            ],
            "properties": {
                "endpoint": {
                    "type": "string"
                },
                "request": {
                    "type": "string"
                },
                "service": {
                    "type": "string"
                },
                "timeout": {
                    "type": "integer"
                },
                "version": {
                    "type": "string"
                }
            }
        },
        "client.publishRequest": {
            "type": "object",
            "required": [
                "message",
                "topic"
            ],
            "properties": {
                "message": {
                    "type": "string"
                },
                "topic": {
                    "type": "string"
                }
            }
        },
        "registry.getServiceDetailResponse": {
            "type": "object",
            "properties": {
                "services": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/registry.registryService"
                    }
                }
            }
        },
        "registry.getServiceHandlersResponse": {
            "type": "object",
            "properties": {
                "handlers": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/registry.registryEndpoint"
                    }
                }
            }
        },
        "registry.getServiceListResponse": {
            "type": "object",
            "required": [
                "services"
            ],
            "properties": {
                "services": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/registry.registryServiceSummary"
                    }
                }
            }
        },
        "registry.getServiceSubscribersResponse": {
            "type": "object",
            "properties": {
                "subscribers": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/registry.registryEndpoint"
                    }
                }
            }
        },
        "registry.registryEndpoint": {
            "type": "object",
            "required": [
                "name",
                "request"
            ],
            "properties": {
                "metadata": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                },
                "name": {
                    "type": "string"
                },
                "request": {
                    "$ref": "#/definitions/registry.registryValue"
                },
                "response": {
                    "$ref": "#/definitions/registry.registryValue"
                }
            }
        },
        "registry.registryNode": {
            "type": "object",
            "required": [
                "address",
                "id"
            ],
            "properties": {
                "address": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "metadata": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            }
        },
        "registry.registryService": {
            "type": "object",
            "required": [
                "name",
                "version"
            ],
            "properties": {
                "handlers": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/registry.registryEndpoint"
                    }
                },
                "metadata": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                },
                "name": {
                    "type": "string"
                },
                "nodes": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/registry.registryNode"
                    }
                },
                "subscribers": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/registry.registryEndpoint"
                    }
                },
                "version": {
                    "type": "string"
                }
            }
        },
        "registry.registryServiceSummary": {
            "type": "object",
            "required": [
                "name"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "versions": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        },
        "registry.registryValue": {
            "type": "object",
            "required": [
                "name",
                "type"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "values": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/registry.registryValue"
                    }
                }
            }
        },
        "statistics.getSummaryResponse": {
            "type": "object",
            "properties": {
                "registry": {
                    "$ref": "#/definitions/statistics.registrySummary"
                },
                "services": {
                    "$ref": "#/definitions/statistics.servicesSummary"
                }
            }
        },
        "statistics.registrySummary": {
            "type": "object",
            "properties": {
                "addrs": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "type": {
                    "type": "string"
                }
            }
        },
        "statistics.servicesSummary": {
            "type": "object",
            "properties": {
                "count": {
                    "type": "integer"
                },
                "nodes_count": {
                    "type": "integer"
                }
            }
        }
    },
    "securityDefinitions": {
        "ApiKeyAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    }
}`

type swaggerInfo struct {
	Version     string
	Host        string
	BasePath    string
	Schemes     []string
	Title       string
	Description string
}

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = swaggerInfo{
	Version:     "1.2.0",
	Host:        "",
	BasePath:    "/",
	Schemes:     []string{},
	Title:       "Go Micro Dashboard",
	Description: "go micro dashboard restful-api",
}

type s struct{}

func (s *s) ReadDoc() string {
	sInfo := SwaggerInfo
	sInfo.Description = strings.Replace(sInfo.Description, "\n", "\\n", -1)

	t, err := template.New("swagger_info").Funcs(template.FuncMap{
		"marshal": func(v interface{}) string {
			a, _ := json.Marshal(v)
			return string(a)
		},
		"escape": func(v interface{}) string {
			// escape tabs
			str := strings.Replace(v.(string), "\t", "\\t", -1)
			// replace " with \", and if that results in \\", replace that with \\\"
			str = strings.Replace(str, "\"", "\\\"", -1)
			return strings.Replace(str, "\\\\\"", "\\\\\\\"", -1)
		},
	}).Parse(doc)
	if err != nil {
		return doc
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, sInfo); err != nil {
		return doc
	}

	return tpl.String()
}

func init() {
	swag.Register("swagger", &s{})
}
