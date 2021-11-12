package registry

import (
	"github.com/gin-gonic/gin"
	"github.com/xpunch/go-micro-dashboard/handler/route"
	"go-micro.dev/v4/registry"
)

type service struct {
	registry registry.Registry
}

func NewRouteRegistrar(registry registry.Registry) route.Registrar {
	return service{registry: registry}
}

func (s service) RegisterRoute(router gin.IRoutes) {
	router.POST("/api/registry/services", s.GetServices)
}

// @Tags Registry
// @ID registry_getServices
// @Success 200 	{object}	getServiceListResponse
// @Failure 400 	{object}	string
// @Failure 401 	{object}	string
// @Failure 500		{object}	string
// @Router /api/registry/services [get]
func (h *service) GetServices(ctx *gin.Context) {
	services, err := h.registry.ListServices()
	if err != nil {
		ctx.AbortWithStatusJSON(500, err)
	}
	var convertValue func(v *registry.Value) registryValue
	convertValue = func(v *registry.Value) registryValue {
		res := registryValue{
			Name:   v.Name,
			Type:   v.Type,
			Values: make([]registryValue, 0, len(v.Values)),
		}
		for _, vv := range v.Values {
			res.Values = append(res.Values, convertValue(vv))
		}
		return res
	}
	resp := getServiceListResponse{Services: make([]registryService, 0, len(services))}
	for _, s := range services {
		endpoints := make([]registryEndpoint, 0, len(s.Endpoints))
		for _, e := range s.Endpoints {
			endpoints = append(endpoints, registryEndpoint{
				Name:     e.Name,
				Request:  convertValue(e.Request),
				Response: convertValue(e.Response),
				Metadata: e.Metadata,
			})
		}
		nodes := make([]registryNode, 0, len(s.Nodes))
		for _, n := range s.Nodes {
			nodes = append(nodes, registryNode{
				Id:       n.Id,
				Address:  n.Address,
				Metadata: n.Metadata,
			})
		}
		resp.Services = append(resp.Services, registryService{
			Name:      s.Name,
			Version:   s.Version,
			Metadata:  s.Metadata,
			Endpoints: endpoints,
			Nodes:     nodes,
		})
	}
	ctx.JSON(200, services)
}
