# Go Micro Dashboard

Go micro dashboard is designed to make it as easy as possible for users to work with go-micro framework.

## Features

- [ ] Logo
- [x] Dashboard
- [x] Services list
- [ ] Health check
- [ ] Configure service
- [ ] Endpoint request
- [ ] Broker messages

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

## Docker

```
docker run .
```

## Docker Compose

```
docker-compose up -d
```

### Community

QQ Group: 953973712

[![View](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fxpunch%2Fgo-micro-dashboard&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## License

[Apache License 2.0](./LICENSE)
