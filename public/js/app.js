
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherInfo = document.querySelector('#message-1')
const locationInfo = document.querySelector('#message-2')
const loading = document.querySelector('#loading')
locationInfo.style.display = 'none';
weatherInfo.style.display = 'none';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    locationInfo.style.display = 'none';
    weatherInfo.style.display = 'none';
    loading.textContent = 'Loading...'
    locationInfo.textContent = ''
    weatherInfo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                weatherInfo.style.display = 'block';
                loading.textContent = ''
                weatherInfo.textContent = data.error
            } else {
                locationInfo.style.display = 'block';
                weatherInfo.style.display = 'block';

                loading.textContent = ''
                locationInfo.textContent = data.location
                weatherInfo.textContent = data.forecast
            }
        })
    })
})