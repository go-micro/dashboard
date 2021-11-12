# Go Micro Dashboard

Go micro dashboard is designed to make it as easy as possible for users to work with go-micro framework.

# Features

- [ ] Dashboard
- [ ] Services list
- [ ] Support request endpoints
- [ ] Support dashboard authenticate
- [ ] Support configure service

## Development

### Server

#### Swagger

```
swagger generate spec -o docs/swagger.json -b ./docs
swag init
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

## License

[Apache License 2.0](./LICENSE)
