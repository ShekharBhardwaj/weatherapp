const request = require('request');

const url = 'https://api.darksky.net/forecast';
const api_key = '64991c13572fe39c33ad0225f9e09efc';

var getWeather = (address, callback) => {

    request({
        url: `${url}/${api_key}/${address.lat},${address.lng}`,
        json: true
    },(error, response, body) => {
        if(error) {
            callback({status: error});
        } else {

            if(response.statusCode === 200){
                callback(undefined, {
                        address: address.formatted_address,
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
                callback({status: body.status});

            }

        }
    });


}

module.exports = {
    getWeather};

// getWeather({
//     formatted_address: "400 Foulk Rd, Wilmington, DE 19803, USA",
//     lat: "39.7816011",
//     lng: "-75.53945200000001"  
// }, (error, result) => {
//     if(error){
//         console.log(error);
//     } else {
//         console.log(JSON.stringify(result));
//     }
// });