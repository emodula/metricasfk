import server from './app/server'
import simulador from './app/simulador'

switch (process.argv[2]) {
    case 'server':
        server()
        break
    case 'simulador':
        simulador()
        break
}