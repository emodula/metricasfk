"use strict";
const express = require('express');
const promClient = require('prom-client');
const app = express();
const register = promClient.register;
// Crear métricas
const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route'],
    buckets: [0.1, 0.5, 1, 1.5, 2, 3], // Histogram buckets
});
// Middleware para medir la duración de las peticiones
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const responseTimeInMs = Date.now() - start;
        httpRequestDurationMicroseconds
            .labels(req.method, req.route.path)
            .observe(responseTimeInMs / 1000); // Convertir a segundos
    });
    next();
});
// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('Hello Prometheus!');
});
// Ruta para exponer métricas
app.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
