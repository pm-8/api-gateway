import client from "prom-client";
export const register = new client.Registry();
client.collectDefaultMetrics({
    register
});
export const httpRequestsTotal = new client.Counter({
    name: "gateway_http_requests_total",
    help: "Total number of HTTP requests received by the gateway",
    labelNames: ["method", "route", "status"],
    registers: [register]
});
export const httpRequestDuration = new client.Histogram({
    name: "gateway_http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status"],
    buckets: [
        0.005,
        0.01,
        0.025,
        0.05,
        0.1,
        0.25,
        0.5,
        1,
        2,
        5
    ],
    registers: [register]
});
export const activeRequests = new client.Gauge({
    name: "gateway_active_requests",
    help: "Number of active HTTP requests",
    registers: [register]
});
export const rateLimitedRequests = new client.Counter({
    name: "gateway_rate_limited_total",
    help: "Total number of requests rejected by rate limiting",
    registers: [register]
});