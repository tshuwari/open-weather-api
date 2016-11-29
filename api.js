
var request        = require('request'),
    readline       = require('readline'),
    requestPromise = require('request-promise'),
    apiUrl         = "",
    chalk          = require('chalk');
const APIKEY = '8ead506fd703f7cc3978d9a394a9be07';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(chalk.grey.bgWhite.bold("Please type in the name of your city, e.g lagos"));
rl.question('-->  ', (city) => {
    apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKEY;
    getWeather();
    rl.close();
});

function getWeather(){
    var options = {
        uri: apiUrl,
        json: true
    };

    requestPromise(options)

    .then(function(response){
        if(!response)
        getWeather();

        var weatherInfo = response;
        printWeatherCast(weatherInfo);
    })

    .catch(function(err){
        console.log(chalk.red('Sorry, unable to retrieve weather information', err));
    })

}

function printWeatherCast(weatherInfo){
    console.log("");
    console.log(chalk.blue.bold("The weather details for: " + (weatherInfo.name + " in " + weatherInfo["sys"].country)));
    for (var x in weatherInfo){
        if(x === "coord"){
            console.log("");
            console.log(chalk.green("LONGITUDE:   ") + chalk.yellow(weatherInfo[x].lon));
            console.log(chalk.green("LATITUDE:    ") + chalk.yellow(weatherInfo[x].lat));
        }
        if(x === "main"){
            console.log(chalk.green("TEMPERATURE: ") + chalk.yellow(weatherInfo[x].temp));
            console.log(chalk.green("PRESSURE:    ") + chalk.yellow(weatherInfo[x].pressure));
            console.log(chalk.green("HUMIDITY:    ") + chalk.yellow(weatherInfo[x].humidity));

        }
    }
}


