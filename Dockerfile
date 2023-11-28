FROM node:16 as frontend-builder

WORKDIR /micro

COPY frontend .

RUN npm install -g @angular/cli && \
    npm install && \
    npm run build

FROM golang:1.20 as backend-builder

WORKDIR /micro

COPY . .
COPY --from=frontend-builder /micro/dist frontend/dist

RUN go install github.com/swaggo/swag/cmd/swag@latest && \
    swag init && \
    go install github.com/UnnoTed/fileb0x@latest && \
    fileb0x b0x.yaml && \
    CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o dashboard .

FROM alpine:latest

WORKDIR /usr/local/bin

COPY --from=backend-builder /micro/dashboard .

EXPOSE 80

ENTRYPOINT [ "/usr/local/bin/dashboard" ]