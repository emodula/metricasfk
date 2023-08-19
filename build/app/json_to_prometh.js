"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
// Create an Express app
const app = (0, express_1.default)();
const PORT = 9100; // Change this to the desired port
const inputJson = {
    "_id": "64d54e77a7b4825db1532a79",
    "brand": "ADSA",
    "country": "AR",
    "type": "core",
    "version": "230622.78063",
    "hostname": "dlvr-ar-core-ec2-1",
    "name": "backend-core-all-01-02",
    "id": 1,
    "events": [
        {
            "type": "CPU",
            "timestamp": "2023-08-10T20:54:15.447Z",
            "avg": 1.291376521635859,
            "current": 8.049852858436509,
            "user": 7.016482607800179,
            "system": 4.581105580321436
        },
        {
            "type": "SYSTEM",
            "timestamp": "2023-08-10T20:54:15.447Z",
            "uptime": 2317526,
            "nodejs": "14.19.3"
        },
        {
            "type": "MEMORY",
            "timestamp": "2023-08-10T20:54:15.447Z",
            "total": 401756,
            "used": 512078,
            "free": 115610,
            "buffcache": 68471,
            "available": 496532,
            "use": 49.57332715227874
        },
        {
            "type": "DISK",
            "timestamp": "2023-08-10T20:54:15.447Z",
            "fs": "overlay",
            "size": 2873761,
            "used": 1124046,
            "use": 91.63680274910523
        },
        {
            "type": "DISK",
            "timestamp": "2023-08-10T20:54:15.447Z",
            "fs": "/dev/xvda1",
            "size": 4652580,
            "used": 2179010,
            "use": 31.729108897417708
        },
        {
            "type": "FILES",
            "timestamp": "2023-08-10T20:54:15.447Z",
            "max": 131707,
            "allocated": 3949
        },
        {
            "type": "NETWORK",
            "timestamp": "2023-08-10T20:54:15.447Z",
            "latency": 1.457312508545403
        }
    ]
};
// Convert JSON events to Prometheus exposition format
exports.default = () => {
    function convertToPrometheusFormat(events) {
        const lines = [];
        events.forEach(event => {
            if (event.type) {
                const labels = Object.entries(event)
                    .filter(([key]) => key !== 'type' && key !== 'timestamp')
                    .map(([key, value]) => `${key}="${value}"`)
                    .join(', ');
                lines.push(`event_${event.type}{${labels}} ${JSON.stringify(event)}`);
            }
        });
        return lines.join('\n');
    }
    // Write the converted metrics to a file
    const prometheusMetrics = convertToPrometheusFormat(inputJson.events);
    axios_1.default.post("http://68.183.153.111:3001/metrics", prometheusMetrics)
        .then(response => {
        console.log('Metricas enviadas correctamente.');
    })
        .catch(error => {
        console.error('Error al enviar metricas:', error);
    });
    //fs.writeFileSync('prometheus_metrics.txt', prometheusMetrics);
    console.log('Metrics converted and saved to prometheus_metrics.txt');
};
