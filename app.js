var express = require('express');
var geocode = require('./address/geocode');
var weather = require('./weather/weather');
var app = express();



app.get('/weather', function (req, res) {
    
    geocode.getGeocodePromise(req.query && req.query.address)
    .then(weather.getWeatherPromise)
    .then((payload) => {
        res.send(payload);
    })
    .catch((error) => {
        send(error);
    });
  
});


// app.get('/weather', function (req, res) {
//     console.log(req.query);
//     geocode.getGeocode(req.query.address,(error, result) => {
//         if(error){
//             res.send(error);
//         } else {
//             weather.getWeather(result, (error, location) => {
//                 if(error){
//                     res.send(error);
//                 } else {
//                     res.send(location);
//                 }

//             });
//         }

//     });
// });

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Weather app listening at http://%s:%s", host, port)
});
