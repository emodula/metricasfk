import server from './app/server'
import simulador from './app/simulador'
import convert from './app/json_to_prometh'
import exporter from './app/exporter'

switch (process.argv[2]) {
    case 'server':
        server()
        break
    case 'simulador':
        simulador()
        break
    case 'convert':
        convert()
        break
    case 'exporter':
        exporter()
        break

}