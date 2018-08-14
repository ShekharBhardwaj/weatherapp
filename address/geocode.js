const request = require('request');

const url = 'http://maps.googleapis.com/maps/api/geocode/json';


var getGeocodePromise = (address) => {

    return new Promise((resolve, reject) => {

        let encodedAddress = encodeURIComponent(address);
        request({
            url: `${url}?address=${encodedAddress}`,
            json: true
        }, (error, response, body) =>{
    
            if(error) {
                reject({
                    status:error
                });
            } else {
                if(response.statusCode === 200 && body.status === "OK"){
                    
                    resolve({
                        formatted_address: body.results[0] && body.results[0].formatted_address,
                        lat: body.results[0] && body.results[0].geometry.location.lat,
                        lng: body.results[0] && body.results[0].geometry.location.lng
                    });
    
                } else {
                    reject({
                        status:body.status
                    });
    
                }
            }
    
        });


    });

}


// var getGeocode = (address, callback) => {

//     let encodedAddress = encodeURIComponent(address);
//     request({
//         url: `${url}?address=${encodedAddress}`,
//         json: true
//     }, (error, response, body) =>{

//         if(error) {
//             callback({
//                 status:error
//             });
//         } else {
//             if(response.statusCode === 200 && body.status === "OK"){
                
//                 callback(undefined, {
//                     formatted_address: body.results[0] && body.results[0].formatted_address,
//                     lat: body.results[0] && body.results[0].geometry.location.lat,
//                     lng: body.results[0] && body.results[0].geometry.location.lng
//                 });

//             } else {
//                 callback({
//                     status:body.status
//                 });

//             }
//         }

//     });


// }

module.exports = {
    getGeocodePromise
} ;


// getGeocode("12121", (error, result)=> {
//     if(error){
//         console.log(error);
//     } else {
//         console.log(JSON.stringify(result));
//     }

// });
