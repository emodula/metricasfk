import axios from 'axios'

const endpointUrl = 'http://localhost:3000/test'; // Replace with your actual endpoint URL

async function getInfoFromEndpoint() {
    try {
        const response = await axios.get(endpointUrl);
        const data = response.data; // The information retrieved from the endpoint
        console.log('Received Data:', data);
    } catch (error) {
        console.error('Error getting data from the endpoint:', error);
    }
}

getInfoFromEndpoint();
