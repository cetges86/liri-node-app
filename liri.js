require("dotenv").config();
const inquirer = require("inquirer");
const request = require("request");
const keys = require("./keys.js");

const Twitter = require("twitter");
const Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

const userInput = process.argv[2];

switch (userInput) {
    case "my-tweets":
        //call twitterAPI to GET 20 more recent tweets with timestamps
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
                })
            } else {
                console.log(error)
            }
        });

        break;

    case "spotify-this-song":
        inquirer.prompt([
            {
                type: "input",
                name: "song",
                message: "What song would you like to search for?"
            }
        ]).then(function (answers) {
            console.log(answers.song)
            spotify.search({ type: 'track', query: answers.song, limit: 4 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                data.tracks.items.forEach(function (songInfo) {
                    console.log("-------------------");
                    console.log(`Artist: ${songInfo.album.artists[0].name}`);
                    console.log(`Song Name: ${songInfo.name}`);
                    console.log(`Album Name: ${songInfo.album.name}`);
                    console.log(`Spotify Link: ${songInfo.album.external_urls.spotify}`);
                    console.log("-------------------");

                })
            });
        })

        //search spotify API for a song name to give Artist, song name back, link of the song on spotify, album that song is from
        break;

    case "movie-this":
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What movie would you like to search for?"
            }
        ]).then(function (answers) {
            //omdb request for movie
            if (answers.title === "") {
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
                }
            });
        })
}