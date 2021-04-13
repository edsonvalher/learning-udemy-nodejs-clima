
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
        //peticion http
        //console.log(lugar)
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
            //console.log(resp.data.features)
            //return [] //retorna los lugares que coincidan coneste lugar            
        } catch (error) {
            return []
        }


    }

}
module.exports = Busquedas