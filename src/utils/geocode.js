const request = require("postman-request");

const geocode = (address, callback) => {
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=VV_U1pnjXzgfYkBzk_LJeVYhlsv4_Doog2ikMnjE3qI`

    request({ url, json: true }, function (error, response,body) {
        if (error) {
            callback("there is an error , unable to connect  ", undefined);
        } else if (body.error === "Unauthorized" || body.status === 400||!body.items[0]) {
            callback("unable to find location", undefined);
        } else {
            callback(undefined, {
                lantitude:body.items[0].position.lat,
                langtiude:body.items[0].position.lng,
                location:body.items[0].address.label

            });

        }
    }
    )
}
module.exports = geocode;