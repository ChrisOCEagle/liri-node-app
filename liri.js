// require the core node package for reading and writing files
var fs = require('fs');
const Movie = require("./movie.js");
const Concert = require("./concert.js");
const SpotifySearch = require("./spotify.js");
// var Inquirer = require('Inquirer');
// I want to use Inquirer for the inputs, but I ran out of time during this project.
// So that will be a part of the next phase of development.

var movie = new Movie();
var concert = new Concert();
var spotifySearch = new SpotifySearch();

// grab two node arguments and store them in a variable
var command = process.argv[2],
    query = process.argv.slice(3).join(" ");

liri(command, query);
// creation of a liri function to recursively use the same code for the do-what-it-says command
function liri(command, query) {
    // the command can be concert-this, spotify-this-song, movie-this, do-what-it-says
    if ( command === "concert-this" ) {
        concert.concertSearch(command, query);
    } else if ( command === 'spotify-this-song' && query ) {
        spotifySearch.spotifySearch(command, query);
    } else if ( command === 'spotify-this-song' && !query ) {
        query = "The Sign"
        spotifySearch.spotifySearch(command, query);
    } else if ( command === 'movie-this' && query ) {
        movie.movieSearch(command, query);
    } else if ( command === 'movie-this' && !query ) {
        query = "Mr. Nobody";
        movie.movieSearch(command, query);
    } else if ( command === 'do-what-it-says' ) {
        doWhatItSays();
    }
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // if the code experiences any errors log error to the console
        if (error) {
            return console.log(error);
        } else {
            // parse the data by the comma
            var dataArr = data.split(",");
            // grab the text inside the dataArr and shadow it into the command and query variables
            var command = dataArr[0],
                query = dataArr[1],
                newData = ["Do What It Says", command, query];
                fs.appendFile("log.txt", newData, function(error) {
                    // if there is an error log the error
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Content Added to log.txt");
                    }
                });
                liri(command, query);
        }
    });

}
