const request = require("request");
const fs = require("fs");

function Movie() {
    var divider = "\n\n---------------------------------------------------------------------\n\n";
    this.movieSearch = function (command, query) {
        var omdbUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
        request(omdbUrl, function(error, response, body) {
            // if the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                // parse the body of the site
                var jsonBody = JSON.parse(body);
                // store the data in an array and immediately turn the array into a string
                var movieData = [
                    command, 
                    query + divider,
                    "Movie Title: " + jsonBody.Title,
                    "Year Released: " + jsonBody.Released,
                    "Rating on IMDB: " + jsonBody.Ratings[0].Value,
                    "Rating on Rotten Tomatoes: " + jsonBody.Ratings[1].Value,
                    "Country Produced in: " + jsonBody.Country,
                    "Language Produced in: " + jsonBody.Language,
                    "Movie Plot: " + jsonBody.Plot,
                    "Movie Cast: " + jsonBody.Actors,
                    divider
                ].join("\n\n");
                // append the data to the log.txt file
                fs.appendFile("log.txt", movieData, function(error) {
                    // if an error was experienced log the error
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(movieData);
                    }
                });
            }
        });
    }
}

module.exports = Movie;