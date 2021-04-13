
require('dotenv').config()
const { leerInput, inquirerMenu, pausa } = require("./helper/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
    let opt = 0
    const busquedas = new Busquedas()
    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ciudad: ')
                await busquedas.ciudad(lugar)
                //mostrar mensaje

                //buscar lugar

                //seleccionar el lugar

                //mostrar datos de clima

                //mostrar resultados
                console.log('\nInformaicón de la ciudad\n'.green)
                console.log('Ciudad')
                console.log('Lat')
                console.log('Lng')
                console.log('Temperatura')
                console.log('Mínima')



                break;
            case 2:
                console.log(`usted ha seleccionado la opción ${opt}`)
                break;
        }

        await pausa()
    } while (opt !== 0);

}

main()