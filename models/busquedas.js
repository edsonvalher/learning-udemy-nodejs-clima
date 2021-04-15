
const fs = require('fs')

const axios = require('axios')

class Busquedas {

    historial = []
    dbPath = './db/database.json'
    constructor() {
        //TODO: leer db si existe
        this.leerDB()
    }
    get parametros() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get historialCapitalizado() {
        //capitalizar historial
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ')
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))
            return palabras.join(' ')
        })

    }
    async ciudad(lugar = '') {
        try {
            //const resp = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/Madrid.json?access_token=pk.eyJ1IjoiZWRzb252YWxoZXIiLCJhIjoiY2tuZ2l4b3VtMGJzbTJ3czM3ZXVxaTZrbCJ9.n8zNScoKeSaykySKFBKfRA&limit=5&language=es")
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.parametros
            })
            const resp = await instance.get()
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
        } catch (error) {
            return []
        }
    }

    get parametrosClima() {
        return {
            'appid': process.env.OPENWHEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }
    async obtenerClima(lat, lon) {
        try {
            //crear instancia axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.parametrosClima, lat, lon }
            })
            const resp = await instance.get()

            const { weather, main } = resp.data


            //resp --> extraer la información  resp.data
            return {
                desc: weather[0].description, //del main
                min: main.temp,
                max: main.temp_min,
                temp: main.temp_max
            }
        } catch (error) {
            //no se encontro la ciudad

        }
    }
    agregarHistorial(lugar = '') {
        //TODO: prevenir duplicados

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return
        }
        this.historial = this.historial.splice(0, 5)
        this.historial.unshift(lugar.toLocaleLowerCase()) //unshift ees para que lo coloque de primero en la cosa

        //grabar en db
        this.guardarDB()

    }
    guardarDB() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))

    }
    leerDB() {
        ///verficar si existe
        if (!fs.existsSync(this.dbPath)) {
            return null
        }
        //si existe cargar la informacion
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
        //cargar la data leida parsearla 
        const data = JSON.parse(info)
        //registrar en historial 
        this.historial = data.historial





    }


}
module.exports = Busquedas