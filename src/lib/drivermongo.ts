import { MongoClient } from 'mongodb'

export let query = async (nombreColeccion, query) => {
    const url = 'mongodb://64.225.16.70:27017'

    let cliente = await MongoClient.connect(url)
    let db = cliente.db('prometheus')
    let collection = db.collection(nombreColeccion)
    let resultado = await collection.find(query).toArray()
    await cliente.close()
    return resultado
}

export let insertOne = async (nombreColeccion, documento) => {
    const url = 'mongodb://64.225.16.70:27017'

    let cliente = await MongoClient.connect(url)
    let db = cliente.db('prometheus')
    let collection = db.collection(nombreColeccion)
    let metadata = await collection.insertOne(documento)
    await cliente.close()
    return metadata
}