// variable for api key
const API_KEY = "2949515e6c24e0022b62db34c9029a63";
console.log(API_KEY)

// variable for base url
const baseURL = "https://api.openweathermap.org/geo/1.0/direct?";
console.log(baseURL)

const baseURL2 = "https://api.openweathermap.org/data/2.5/forecast?"

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO','CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA','KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI','WY'];

for (let state of states){
  $("#states").append(`<option value=${state}>${state}</option>`)
}


// Functions
function weatherSearch(cityName, stateCode) {
    const url = `${baseURL}q=${cityName},${stateCode},US&limit=1&units=imperial&appid=${API_KEY}`
    $.ajax(url)
    .then((data) => {
      console.log(data)
        const lat = (data[0].lat)
        const lon = (data[0].lon)
        $.ajax(`${baseURL2}lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
        .then((finalData) => {
        // render data onto the DOM
        console.log(finalData)  
        const $main = $("main")
        const $desc = $("#desc") 
        const $temp = $("#temp")
        const $index = $("#index")
        const $state = $("option")
        $main.empty()
        $main.html(`<h2>Weather for ${cityName}</h2>`) 
        $desc.html(`Weather Description: ${finalData.list[0].weather[0].main}`)
        $temp.html(`Temperature: ${Math.floor(finalData.list[0].main.temp)} degrees`)
        $index.html(`Feels Like: ${Math.floor(finalData.list[0].main.feels_like)} degrees`) 
      })   
    })
}

// grab the submit button and put an event on it
$("form").on("submit", (event) => {
    event.preventDefault()
    const city = $("input[type=text]").val()
    const state = $("#states").val()
    weatherSearch(city, state)
})

weatherSearch("Providence", "RI")


