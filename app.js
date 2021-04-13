
require('dotenv').config()
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helper/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
    let opt = 0
    const busquedas = new Busquedas()
    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                // mostrar mensaje
                const termino = await leerInput('Ciudad: ')
                //selecciona lugar
                const lugares = await busquedas.ciudad(termino)
                const id = await listarLugares(lugares)
                const seleccionado = lugares.find(l => l.id === id)
                //clima
                const clima = await busquedas.obtenerClima(seleccionado.lat, seleccionado.lng)
                //console.log(clima)


                console.log(`\nInformación de la ciudad\n`.green)
                console.log(`Ciudad:`, seleccionado.nombre)
                console.log(`Lat:`, seleccionado.lat)
                console.log(`Lng:`, seleccionado.lng)
                console.log(`Temperatura:`, clima.temp)
                console.log(`Temperatura Máxima:`, clima.max)
                console.log(`Temperatura Mínima:`, clima.min)



                break;
            case 2:
                console.log(`usted ha seleccionado la opción ${opt}`)
                break;
        }

        await pausa()
    } while (opt !== 0);

}

main()