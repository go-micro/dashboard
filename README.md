# Go Micro Dashboard [![GoDoc](https://godoc.org/github.com/go-micro/plugins?status.svg)](https://godoc.org/github.com/go-micro/plugins) [![Unit Tests](https://github.com/go-micro/dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/go-micro/dashboard/actions/workflows/ci.yml) [![Docker](https://github.com/go-micro/dashboard/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/go-micro/dashboard/actions/workflows/docker-publish.yml) [![Vistors](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fxpunch%2Fgo-micro-dashboard&count_bg=%2379C83D&title_bg=%23555555&icon=github.svg&icon_color=%23E7E7E7&title=Vistors&edge_flat=false)](https://hits.seeyoufarm.com) [![License](https://img.shields.io/:license-apache-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Go micro dashboard is designed to make it as easy as possible for users to work with go-micro framework.

## Features

- [x] Logo
- [x] Web UI
- [x] Service discovery
  - [ ] Register service
  - [ ] Deregister service
- [x] Health check
- [ ] Configuration service
- [x] Synchronous communication
  - [x] RPC
  - [ ] Stream
- [x] Asynchronous communication
  - [x] Publish
  - [ ] Subscribe

## Installation

```
go install github.com/go-micro/dashboard@latest
```

## Development

### Server

#### Swagger

```
swagger generate spec -o docs/swagger.json -b ./docs
swag init
```

#### Config

```
default username: admin
default password: micro
```

##### ENV
```
export SERVER_ADDRESS=:8082
export SERVER_AUTH_USERNAME=user
export SERVER_AUTH_PASSWORD=pass
```

##### YAML
```
export CONFIG_TYPE=yaml
```
```yaml
server:
  env: "dev"
  address: ":8082"
  swagger:
    host: "localhost:8082"
```

##### TOML
```
export CONFIG_TYPE=toml
```
```toml
[server]
env = "dev"
address = ":8082"
[server.swagger]
host = "localhost:8082"
```

### Web UI

[Document](https://github.com/go-micro/dashboard/tree/main/frontend)

#### Generate Web Files

```
go install github.com/UnnoTed/fileb0x@latest
fileb0x b0x.yaml
```

## Docker

```
docker run -d --name micro-dashboard -p 8082:8082 xpunch/go-micro-dashboard:latest
```

## Docker Compose

```
docker-compose -f docker-compose.yml up -d
```

## Kubernetes

```
kubectl apply -f deployment.yaml
```

## Community

- [Discord](https://discord.gg/qV3HvnEJfB)
- [Slack](https://join.slack.com/t/go-micro/shared_invite/zt-175aaev1d-iHExPTlfxvfkOeeKLIYEYw)
- [QQ Group](https://jq.qq.com/?_wv=1027&k=5Gmrfv9i)

## Screen Shots
![Login](docs/screenshots/1.login.png)
![Dashboard](docs/screenshots/2.dashboard.png)
![Services](docs/screenshots/3.services.png)
![Service Detail](docs/screenshots/4.service%20detail.png)
![Nodes](docs/screenshots/5.nodes.png)
![Request](docs/screenshots/6.call.png)

## License

[Apache License 2.0](./LICENSE)
