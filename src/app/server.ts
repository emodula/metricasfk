import express from 'express'
const bodyParser = require('body-parser');
import { insertOne, query as queryMongo } from '../lib/drivermongo';
import { MongoServerError, MongoServerSelectionError } from 'mongodb'


export default () => {

    const app = express()

    app.use(bodyParser.json());

    app.get('/registros', (request, response) => {

        let query: any = {}

        console.log(request.query)
        //if (request.query['firstName']) { query.firstName = request.query['firstName']; }

        queryMongo('metricas', query)
            .then(res => {
                response
                    .status(200)
                    .send(res)
            })
            .catch(err => {
                response
                    .status(500)
                    .send()
            })


    })

    /*app.get('/datos', (req, res) => {
        // Lee los datos actuales del archivo y los envía como respuesta
        fs.readFile('datos.json', 'utf8', (err, fileData) => {
            if (err) {
                console.error('Error al leer el archivo:', err);
                return res.status(500).json({ mensaje: 'Error al obtener los datos.' });
            }
    
            try {
                const jsonData = JSON.parse(fileData);
                res.json(jsonData);
            } catch (err) {
                console.error('Error al analizar los datos JSON:', err);
                res.status(500).json({ mensaje: 'Error al obtener los datos.' });
            }
        });
    });*/

    app.post('/metrics', (request, response) => {
        console.log(request.body)

        insertOne('metricas', request.body)
            .then(() => {
                response
                    .status(201)
                    .send()
            })
            .catch(err => {
                console.log(err)

                if (err instanceof MongoServerError) {
                    response
                        .status(400)
                        .send()
                    return
                }

                if (err instanceof MongoServerSelectionError) {
                    response
                        .status(500)
                        .send()
                    return
                }

                response
                    .status(500)
                    .send()
            })

        /*const metricData = req.body;
        // Aquí puedes guardar o procesar las métricas recibidas como desees
        console.log('Metricas recibidas:', metricData);
        res.status(200).json({ message: 'Metricas recibidas correctamente.' })*/
        console.log('escuchando puerto 3000')
    });


    app.listen(3000, () => {
        console.log('escuchando puerto 3000')
    })
}