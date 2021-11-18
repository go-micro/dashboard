package main

import (
	_ "github.com/asim/go-micro/plugins/client/grpc/v4"
	_ "github.com/asim/go-micro/plugins/client/http/v4"
	_ "github.com/asim/go-micro/plugins/client/mucp/v4"
	_ "github.com/asim/go-micro/plugins/registry/etcd/v4"
	_ "github.com/asim/go-micro/plugins/registry/kubernetes/v4"
)
