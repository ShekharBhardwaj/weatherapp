const request = require('request');
var LOGGER  = require('./../logger').logger;

const url = 'https://api.darksky.net/forecast';
const api_key = '64991c13572fe39c33ad0225f9e09efc';



var getWeatherPromise = (location) => {
    LOGGER.debug(`Geolocation input: ${JSON.stringify(location)}`);
    return new Promise((resolve, reject) => {
        request({
            url: `${url}/${api_key}/${location.lat},${location.lng}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject({ status: error });
            } else {

                if (response.statusCode === 200) {
                    resolve({
                        address: location.formatted_address,
                        timezone: body.timezone,
                        time: body.currently.time,
                        summary: body.currently.summary,
                        temperature: body.currently.temperature,
                        feelsLike: body.currently.apparentTemperature,
                        windSpeed: body.currently.windSpeed,
                        uvIndex: body.currently.uvIndex,
                        visibility: body.currently.visibility
                    });
                } else {
                    reject({ status: body.status });

                }

            }
        });

    });

}

// var getWeather = (address, callback) => {

//     request({
//         url: `${url}/${api_key}/${address.lat},${address.lng}`,
//         json: true
//     }, (error, response, body) => {
//         if (error) {
//             callback({ status: error });
//         } else {

//             if (response.statusCode === 200) {
//                 callback(undefined, {
//                     address: address.formatted_address,
//                     timezone: body.timezone,
//                     time: body.currently.time,
//                     summary: body.currently.summary,
//                     temperature: body.currently.temperature,
//                     feelsLike: body.currently.apparentTemperature,
//                     windSpeed: body.currently.windSpeed,
//                     uvIndex: body.currently.uvIndex,
//                     visibility: body.currently.visibility
//                 });
//             } else {
//                 callback({ status: body.status });

//             }

//         }
//     });


// }

module.exports = {
    getWeatherPromise
};