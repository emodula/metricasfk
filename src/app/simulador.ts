import axios from 'axios'

export default () => {

  function customRandom(min, max) {
    return Math.random() * (max - min + 1) + min;
  }

  /*const hostnames = [
    {
      hostname: "dlvr-ar-core-ec2-1",
      container: [
        "backend-core-all-00-02"
      ]
    }
  ]*/


  const hostnames = [
    {
      hostname: "dlvr-ar-core-ec2-1",
      container: [
        "backend-core-all-00-02",
        "backend-core-all-01-02",
        "backend-core-all-01-02"
      ]
    },
    {
      hostname: "dlvr-ar-core-ec2-2",
      container: [
        "backend-core-pedidos-ya-00-01",
        "backend-core-pedidos-ya-00-02"
      ]
    },
    {
      hostname: "dlvr-ar-core-ec2-3",
      container: [
        "backend-core-rappi-00-01",
        "backend-core-rappi-00-02"
      ]
    },
    {
      hostname: "dlvr-ar-core-ec2-4",
      container: [
        "backend-core-gigigo-00-01",
        "backend-core-mercado-pago-00-01"
      ]
    }

  ]

  function obtenerMetricas() {
    const stats = [
      {
        "type": "CPU",
        "timestamp": new Date().toISOString(),
        "avg": customRandom(0, 1),
        "current": customRandom(0, 10),
        "user": customRandom(0, 10),
        "system": customRandom(0, 10)
      },
      {
        "type": "SYSTEM",
        "timestamp": new Date().toISOString(),
        "uptime": 2317526,
        "nodejs": "14.19.3"
      },
      {
        "type": "MEMORY",
        "timestamp": new Date().toISOString(),
        "total": Math.floor(customRandom(0, 600000)),
        "used": Math.floor(customRandom(0, 600000)),
        "free": Math.floor(customRandom(0, 600000)),
        "buffcache": Math.floor(customRandom(0, 600000)),
        "available": Math.floor(customRandom(0, 600000)),
        "use": customRandom(0, 100)
      },
      {
        "type": "DISK",
        "timestamp": new Date().toISOString(),
        "fs": "overlay",
        "size": Math.floor(customRandom(0, 6000000)),
        "used": Math.floor(customRandom(0, 6000000)),
        "use": customRandom(0, 100)
      },
      {
        "type": "DISK",
        "timestamp": new Date().toISOString(),
        "fs": "/dev/xvda1",
        "size": Math.floor(customRandom(0, 6000000)),
        "used": Math.floor(customRandom(0, 6000000)),
        "use": customRandom(0, 100)
      },
      {
        "type": "FILES",
        "timestamp": new Date().toISOString(),
        "max": Math.floor(customRandom(0, 200000)),
        "allocated": Math.floor(customRandom(0, 5000))
      },
      {
        "type": "NETWORK",
        "timestamp": new Date().toISOString(),
        "latency": customRandom(0, 15)
      }
    ]
    return stats
  }


  async function enviar() {
    try {
      //let resultados: any = []

      for (const hostname of hostnames) {
        for (const cont of hostname.container) {

          const metricas = obtenerMetricas()

          // Formato de datos como lo envia Delivery
          const resultado = {
            brand: "ADSA",
            country: "AR",
            type: "core",
            version: "230622.78063",
            hostname: hostname.hostname,
            name: cont,
            id: 1,
            events: metricas
          }

          //console.log(resultado)
          console.log(resultado)
          axios.post("http://64.225.16.70:3001/metrics", resultado)
            .then(response => {
              console.log('Metricas enviadas correctamente.');
            })
            .catch(error => {
              console.error('Error al enviar metricas:', error);
            });

        }
      }

      // Guardas el tiempo actual
      //console.log(JSON.stringify(resultados))
      // Enviar los resultados a un endpoint
      /*const resultado = {
        brand: "ADSA",
        country: "AR",
        type: "core",
        version: "230622.78063",
        hostname: 'aaa',
        //name: hostnames.hostname.container,
        id: 1,
        //events: metricas
      }*/

      // Restas el tiempo actual al guardado -> cuanto tardó en ejecutarse el envio de datos  

    } catch (error) {
      console.log(error)
    }
  }

  setInterval(enviar, 30000)
}

