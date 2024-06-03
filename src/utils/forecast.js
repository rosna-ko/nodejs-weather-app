const request = require('request')


const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3884092626fdf23d30c617460e7a924c&query=' + lon + ',' + lat;

    request({url: url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!')
        } else if(body.error) {
            callback('Unable to find location!')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out' + ' but feels like. There is a ' + body.current.precip +'% chance of rain.')
        }
    })
}

module.exports = forecast;