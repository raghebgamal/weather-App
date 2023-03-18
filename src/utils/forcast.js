const request = require("postman-request");

const forcast = (lat, lng, callback) => {
const url=`http://api.weatherstack.com/current?access_key=0251bb1a08119ce2a4df50c3e81fbe00&query=${lat},${lng}&units=m`
    request({ url, json: true }, function (error, response,body) {
        if (error) {
            callback("there is an error , unable to connect  ", undefined);
        } else if (body.error) {
            callback("unable to find location", undefined);
        } else {
            callback(undefined,`the temprature is :${body.current.temperature}  , and feeling is :${body.current.feelslike}`);

        }
    }
    )
}
module.exports =forcast;