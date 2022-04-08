FROM golang:1.17 as builder

RUN git clone https://github.com/go-micro/dashboard.git /usr/local/micro \
    && cd /usr/local/micro \
    && go install github.com/swaggo/swag/cmd/swag@latest \
    && swag init \
    && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o dashboard .

FROM alpine:latest

WORKDIR /usr/local/bin

COPY --from=builder /usr/local/micro/dashboard .

EXPOSE 80

ENTRYPOINT [ "/usr/local/bin/dashboard" ]