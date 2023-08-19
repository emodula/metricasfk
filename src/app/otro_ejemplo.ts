import express from 'express'
const router = express.Router();
import request from 'request'
// Config for health check endpoint
const healthCheckURL = 'http://68.183.153.111:3001/metrics';
const zone = 'DEV';

// Initialize Prometheus
const Prometheus = require('prom-client');
const collectDefaultMetrics = Prometheus.collectDefaultMetrics;
collectDefaultMetrics({
    timeout: 5000
});

router.get('/', (req, res) => {
    res.end(Prometheus.register.metrics());
});

const serviceHealthGauge = new Prometheus.Gauge({
    name: 'service_health',
    help: 'Health of service component',
    labelNames: ['zone']
});

setInterval(() => {
    request({
        url: healthCheckURL,
        method: "GET",
    },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const JSONBody = JSON.parse(body);

                // check service health
                if (JSONBody.app && JSONBody.app.success) {
                    serviceHealthGauge.set({
                        zone: zone
                    }, 1);
                } else {
                    serviceHealthGauge.set({
                        zone: zone
                    }, 0);

                }
            } else {
                serviceHealthGauge.set({
                    zone: zone
                }, 0);
            }
        }
    );
}, 10000);

module.exports.metricNames = ['service_health'];

module.exports = router;