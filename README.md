# Go Micro Dashboard [![View](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fxpunch%2Fgo-micro-dashboard&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=go&edge_flat=false)](https://hits.seeyoufarm.com)

Go micro dashboard is designed to make it as easy as possible for users to work with go-micro framework.

## Features

- [ ] Logo
- [x] Web UI
- [x] Service discovery
- [ ] Health check
- [ ] Configure service
- [x] Endpoint request
- [ ] Broker messages

## Installation

```
go install github.com/xpunch/go-micro-dashboard@latest
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
default password: 123456
```

### Web UI

[Document](https://github.com/xpunch/go-micro-dashboard/tree/main/frontend)

#### Generate Web Files

```
go install github.com/UnnoTed/fileb0x@latest
fileb0x b0x.yaml
```

## Docker

```
docker run -d --name "go-micro-dashboard" -p "4000:4000" xpunch/go-micro-dashboard
```

### Community

QQ Group: 953973712

## License

[Apache License 2.0](./LICENSE)
