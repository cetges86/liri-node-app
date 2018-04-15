require("dotenv").config();
const inquirer = require("inquirer");
const request = require("request");
const keys = require("./keys.js");
const fs = require('fs')

const Twitter = require("twitter");
const Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

const userInput = process.argv[2];

const viewTweets = () => {
    var params = {
        screen_name: 'bootcamp_etges',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(function (userTweets) {
                console.log("-------------------")
                console.log(userTweets.created_at);
                console.log(userTweets.text);
                console.log("-------------------")

                fs.appendFile("log.txt", `\n${userTweets.text}`, function (err) {
                    if (err) { console.log(err); }
                })
                fs.appendFile("log.txt", `\n-----------`, function (err) {
                    if (err) console.log(err);
                })
            })
        } else {
            console.log(error)
        }
    });
}

const spotSearch = (song) => {
    inquirer.prompt([
        {
            type: "input",
            name: "song",
            message: "What song would you like to search for?"
        }
    ]).then(function (answers) {

        if (answers.song === '') {
            answers.song = song;
        }

        spotify.search({ type: 'track', query: answers.song, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            data.tracks.items.forEach(function (songInfo) {
                console.log("-------------------");
                console.log(`Artist: ${songInfo.album.artists[0].name}`);
                console.log(`Song Name: ${songInfo.name}`);
                console.log(`Album Name: ${songInfo.album.name}`);
                console.log(`Spotify Link: ${songInfo.album.external_urls.spotify}`);

                fs.appendFile("log.txt", `\n${songInfo.album.artists[0].name}\n${songInfo.name}`, function (err) {
                    if (err) { console.log(err); }
                })
                fs.appendFile("log.txt", `\n-----------`, function (err) {
                    if (err) console.log(err);
                })
            })
        });
    })
}

const movieSearch = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What movie would you like to search for?"
        }
    ]).then(function (answers) {
        //omdb request for movie
        if (answers.title === '') {
            answers.title = "Mr. Nobody";
        }
        request(`http://www.omdbapi.com/?t=${answers.title}&y=&plot=short&apikey=trilogy`, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log("-------------------")
                console.log(JSON.parse(body).Title);
                console.log(JSON.parse(body).Year);
                console.log("imdb Rating: " + JSON.parse(body).Ratings[0].Value);
                console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
                console.log(JSON.parse(body).Country);
                console.log(JSON.parse(body).Language);
                console.log(JSON.parse(body).Plot);
                console.log(JSON.parse(body).Actors);
                console.log("-------------------")

                fs.appendFile("log.txt", `\n${JSON.parse(body).Title}`, function (err) {
                    if (err) { console.log(err); }
                })
                fs.appendFile("log.txt", `\n-----------`, function (err) {
                    if (err) console.log(err);
                })
            } else { console.log(error) }
        });
    })
}

const log = (userInput) => {
    fs.appendFile("log.txt", `\n${userInput}`, function (err) {
        if (err) { console.log(err); }
    })
}

switch (userInput) {
    case "my-tweets":
        //call twitterAPI to GET 20 more recent tweets with timestamps
        log(userInput);
        viewTweets();
        break;

    case "spotify-this-song":
        log(userInput);
        spotSearch();
        //search spotify API for a song name to give Artist, song name back, link of the song on spotify, album that song is from
        break;

    case "movie-this":
        log(userInput);
        movieSearch();
        break;

    case "do-what-it-says":
        log(userInput);
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            } else {
                let song = data.split(",")
                console.log("Hit Enter To Continue")
                spotSearch(song[1]);
            }
        })
        break;

}



