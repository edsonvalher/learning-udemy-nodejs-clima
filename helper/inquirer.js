const inquirer = require('inquirer')
require('colors')


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1'.green}. Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2'.green}. Historial`
            },
            {
                value: 0,
                name: `${'0'.green}. Salir`
            },
        ]

    }
]

const inquirerMenu = async () => {
    console.clear()
    console.log("=============================".green)
    console.log("   seleccione una opcion     ".white)
    console.log("=============================\n".green)
    const { opcion } = await inquirer.prompt(preguntas)
    return opcion

}
const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`

        }
    ]
    console.log('\n')
    await inquirer.prompt(question)
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) { //para que sea obligatorio
                if (value.length === 0) {
                    return 'Ingrese un valor'
                }
                return true
            }
        }
    ]
    const { desc } = await inquirer.prompt(question)
    return desc
}

const listadoTareas = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const indice = `${i + 1}.`.green
        return {
            value: tarea.id,
            name: `${indice} ${tarea.desc}`
        }
    })
    //añade al inicio del arreglo de choices
    choices.unshift({
        value: 0,
        name: '0'.green + ' Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas)
    return id
}
const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question)
    return ok
}

const checklistTareas = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const indice = `${i + 1}.`.green
        return {
            value: tarea.id,
            name: `${indice} ${tarea.desc}`,
            checked: (tarea.completado) ? true : false
        }
    })
    //añade al inicio del arreglo de choices
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(preguntas)
    return ids
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareas,
    confirmar,
    checklistTareas
}