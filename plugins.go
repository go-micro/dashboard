package main

import (
	_ "github.com/go-micro/plugins/broker/kafka"
	_ "github.com/go-micro/plugins/broker/mqtt"
	_ "github.com/go-micro/plugins/broker/nats"
	_ "github.com/go-micro/plugins/broker/rabbitmq"
	_ "github.com/go-micro/plugins/broker/redis"

	_ "github.com/go-micro/plugins/registry/consul"
	_ "github.com/go-micro/plugins/registry/etcd"
	_ "github.com/go-micro/plugins/registry/eureka"
	_ "github.com/go-micro/plugins/registry/gossip"
	_ "github.com/go-micro/plugins/registry/kubernetes"
	_ "github.com/go-micro/plugins/registry/nacos"
	_ "github.com/go-micro/plugins/registry/nats"
	_ "github.com/go-micro/plugins/registry/zookeeper"
)
