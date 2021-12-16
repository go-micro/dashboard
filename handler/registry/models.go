package registry

import "go-micro.dev/v4/registry"

type registryServiceSummary struct {
	Name     string   `json:"name" binding:"required"`
	Versions []string `json:"versions,omitempty"`
}

type getServiceListResponse struct {
	Services []registryServiceSummary `json:"services" binding:"required"`
}

type registryService struct {
	Name        string             `json:"name" binding:"required"`
	Version     string             `json:"version" binding:"required"`
	Metadata    map[string]string  `json:"metadata,omitempty"`
	Handlers    []registryEndpoint `json:"handlers,omitempty"`
	Subscribers []registryEndpoint `json:"subscribers,omitempty"`
	Nodes       []registryNode     `json:"nodes,omitempty"`
}

type registryEndpoint struct {
	Name     string            `json:"name" binding:"required"`
	Request  registryValue     `json:"request" binding:"required"`
	Response registryValue     `json:"response"`
	Stream   bool              `json:"stream,omitempty"`
	Metadata map[string]string `json:"metadata,omitempty"`
}

type registryNode struct {
	Id       string            `json:"id" binding:"required"`
	Address  string            `json:"address" binding:"required"`
	Metadata map[string]string `json:"metadata,omitempty"`
}

type registryValue struct {
	Name   string          `json:"name" binding:"required"`
	Type   string          `json:"type" binding:"required"`
	Values []registryValue `json:"values,omitempty"`
}

type getServiceDetailResponse struct {
	Services []registryService `json:"services"`
}

type getServiceHandlersResponse struct {
	Handlers []registryEndpoint `json:"handlers"`
}

type getServiceSubscribersResponse struct {
	Subscribers []registryEndpoint `json:"subscribers"`
}

type registryNodeDetail struct {
	Id       string            `json:"id" binding:"required"`
	Version  string            `json:"version" binding:"required"`
	Address  string            `json:"address" binding:"required"`
	Metadata map[string]string `json:"metadata,omitempty"`
}

type registryServiceNodes struct {
	Name  string               `json:"name"`
	Nodes []registryNodeDetail `json:"nodes"`
}

type getNodeListResponse struct {
	Services []registryServiceNodes `json:"services"`
}

func convertRegistryValue(v *registry.Value) registryValue {
	if v == nil {
		return registryValue{}
	}
	res := registryValue{
		Name:   v.Name,
		Type:   v.Type,
		Values: make([]registryValue, 0, len(v.Values)),
	}
	for _, vv := range v.Values {
		res.Values = append(res.Values, convertRegistryValue(vv))
	}
	return res
}
