import express from 'express'
//const { collectDefaultMetrics, Registry, Gauge } = require('prom-client');
import Prometheus from 'prom-client'
const register = new Prometheus.Registry()

export default () => {
    // Create an Express app
    const app = express();
    const PORT = 3001; // Change this to the desired port

    // Create a custom metric
    const customGauge = new Prometheus.Gauge({
        name: 'custom_metric',
        help: 'A custom metric',
        labelNames: ['label1', 'label2'],
    });

    // Collect default metrics (like process metrics)
    Prometheus.collectDefaultMetrics();

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
}

