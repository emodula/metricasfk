import axios from 'axios'

const endpointUrl = 'http://localhost:3000/test'; // Replace with your server URL

axios.get(endpointUrl)
    .then((response) => {
        const jsonData = response.data; // JSON data received from the server
        console.log('JSON Data:', jsonData);
    })
    .catch((error) => {
        console.error('Error getting JSON:', error);
    });