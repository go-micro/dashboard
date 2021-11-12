package registry

type registryService struct {
	Name      string             `json:"name"`
	Version   string             `json:"version,omitempty"`
	Metadata  map[string]string  `json:"metadata,omitempty"`
	Endpoints []registryEndpoint `json:"endpoints,omitempty"`
	Nodes     []registryNode     `json:"nodes,omitempty"`
}

type registryEndpoint struct {
	Name     string            `json:"name"`
	Request  registryValue     `json:"request"`
	Response registryValue     `json:"response"`
	Metadata map[string]string `json:"metadata"`
}

type registryNode struct {
	Id       string            `json:"id"`
	Address  string            `json:"address"`
	Metadata map[string]string `json:"metadata"`
}

type registryValue struct {
	Name   string          `json:"name"`
	Type   string          `json:"type"`
	Values []registryValue `json:"values"`
}

type getServiceListResponse struct {
	Services []registryService `json:"services"`
}
