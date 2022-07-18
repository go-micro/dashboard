package client

type callRequest struct {
	Service  string `json:"service" binding:"required"`
	Version  string `json:"version"`
	Endpoint string `json:"endpoint" binding:"required"`
	Metadata string `json:"metadata"`
	Request  string `json:"request"`
	Timeout  int64  `json:"timeout"`
}

type publishRequest struct {
	Topic    string `json:"topic" binding:"required"`
	Metadata string `json:"metadata"`
	Message  string `json:"message" binding:"required"`
}

type healthCheckRequest struct {
	Service string `json:"service" binding:"required"`
	Version string `json:"version" binding:"required"`
	Address string `json:"address" binding:"required"`
	Timeout int64  `json:"timeout"`
}
