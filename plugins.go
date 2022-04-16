package main

import (
	_ "github.com/go-micro/plugins/v4/broker/kafka"
	_ "github.com/go-micro/plugins/v4/broker/mqtt"
	_ "github.com/go-micro/plugins/v4/broker/nats"
	_ "github.com/go-micro/plugins/v4/broker/rabbitmq"
	_ "github.com/go-micro/plugins/v4/broker/redis"

	_ "github.com/go-micro/plugins/v4/registry/consul"
	_ "github.com/go-micro/plugins/v4/registry/etcd"
	_ "github.com/go-micro/plugins/v4/registry/eureka"
	_ "github.com/go-micro/plugins/v4/registry/gossip"
	_ "github.com/go-micro/plugins/v4/registry/kubernetes"
	_ "github.com/go-micro/plugins/v4/registry/nacos"
	_ "github.com/go-micro/plugins/v4/registry/nats"
	_ "github.com/go-micro/plugins/v4/registry/zookeeper"
)
