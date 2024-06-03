const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rosina'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Rosina'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rosina'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address to get weather!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

       forecast(longitude, latitude, (error, weatherData) => {
        if(error) {
            return res.send({ error })
        }

        res.send({
            forecast: weatherData,
            location,
            address: req.query.address
        })
       })
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Rosina',
        errorMsg: 'Page Not Found!'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000!");
})