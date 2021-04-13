
const axios = require('axios')

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San José']
    constructor() {
        //TODO: leer db si existe
    }
    get parametros() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
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

}
module.exports = Busquedas