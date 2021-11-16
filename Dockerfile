FROM golang:1.17 as api-builder

WORKDIR /usr/local/bin

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o dashboard .

FROM node:17 as web-builder

WORKDIR /usr/local/bin

RUN cd frontend && npm install && ng build --output-path web

FROM alpine:latest

WORKDIR /usr/local/bin

COPY --from=api-builder /usr/local/bin/dashboard .

COPY --from=web-builder /usr/local/bin/web .

EXPOSE 80

CMD [ "/usr/local/bin/dashboard" ]