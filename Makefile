fmt:
	@go fmt ./...

vet:
	@go vet ./...

test:
	@go test ./...

build:
	@cd frontend && npm install && npm run build
	@go install github.com/UnnoTed/fileb0x@latest && fileb0x b0x.yaml
	@swag init

docker:
	docker build -t xpunch/go-micro-dashboard:latest .