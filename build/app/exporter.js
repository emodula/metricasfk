"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//const { collectDefaultMetrics, Registry, Gauge } = require('prom-client');
const prom_client_1 = __importDefault(require("prom-client"));
const register = new prom_client_1.default.Registry();
exports.default = () => {
    // Create an Express app
    const app = (0, express_1.default)();
    const PORT = 3001; // Change this to the desired port
    // Create a custom metric
    const customGauge = new prom_client_1.default.Gauge({
        name: 'custom_metric',
        help: 'A custom metric',
        labelNames: ['label1', 'label2'],
    });
    // Collect default metrics (like process metrics)
    prom_client_1.default.collectDefaultMetrics();
    // Simulate updating the custom metric
    function updateCustomMetric() {
        customGauge.labels('value1', 'value2').set(Math.random());
    }
    // Schedule metric updates
    setInterval(updateCustomMetric, 1000); // Update the metric every second
    // Endpoint to expose Prometheus metrics
    app.get('/metrics', (req, res) => {
        res.setHeader('Content-Type', register.contentType);
        res.end(register.metrics());
    });
    // Start the server
    app.listen(PORT, () => {
        console.log(`Prometheus exporter listening on port ${PORT}`);
    });
};
