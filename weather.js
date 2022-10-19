// variable for api key
const API_KEY = "2949515e6c24e0022b62db34c9029a63";
console.log(API_KEY)

// variable for base url
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
console.log(baseURL)

// Cached Element References

// Functions
// q={city name}&appid={API_KEY}
function weatherSearch(cityName) {
    const url = `${baseURL}q=${cityName}&units=imperial&appid=${API_KEY}`
    $.ajax(url)
    .then((city) => {
        console.log(city)
        // render data onto the DOM
        const $main = $("main")
        const $desc = $("#desc") 
        const $temp = $("#temp")
        const $index = $("#index")
        $main.empty()
        $main.html(`<h2>Weather for: ${city.name} ${city.sys.country}</h2>
        <p>Wind Speed: ${city.wind.speed} mph</p>
        <p>Wind gusts up to ${city.wind.gust} mph`) 
        $desc.html(`Weather Description: ${city.weather[0].main}`)
        $temp.html(`Temperature: ${city.main.temp} degrees`)
        $index.html(`Feels Like: ${city.main.feels_like} degrees`)     
    })
}

// grab the submit button and put an event on it
$("form").on("submit", (event) => {
    event.preventDefault()
    const inputText = $("input[type=text]").val()
    weatherSearch(inputText)
})

weatherSearch("Providence")