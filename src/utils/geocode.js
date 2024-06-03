const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+encodeURIComponent(address)+'&access_token=pk.eyJ1IjoibmVoYWpvc2h5MTIzIiwiYSI6ImNsdjUyMzBlZjBlcWoycW1uMzkybjZmZDQifQ.w76ulkCUXbf75K7sUQN25g'
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location services!')
        } else if(response.body?.features?.length === 0) {
            callback('Unable to find location! try another search.')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].geometry.coordinates[1],
                longitude: response.body.features[0].geometry.coordinates[0],
                location: response.body.features[0].properties.full_address
            })
        }
    })
}

module.exports = geocode