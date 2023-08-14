"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const endpointUrl = 'http://localhost:3000/test'; // Replace with your server URL
axios_1.default.get(endpointUrl)
    .then((response) => {
    const jsonData = response.data; // JSON data received from the server
    console.log('JSON Data:', jsonData);
})
    .catch((error) => {
    console.error('Error getting JSON:', error);
});
