"use strict";
// client-post.js
const axios = require('axios');
const endpointUrl = 'http://localhost:3000/enviar_datos'; // Replace with your server URL
const jsonData = {
    hola: 'mundo',
    chau: 'world',
};
axios.post(endpointUrl, jsonData)
    .then((response) => {
    console.log('Response from server (POST):', response.data);
})
    .catch((error) => {
    console.error('Error sending JSON (POST):', error);
});
