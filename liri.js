require("dotenv").config();
const request = require("request");
const codes = require("./keys.js")

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

const userInput = process.argv[2];

switch(userInput){
    case "my-tweets":
    //call twitterAPI to GET 20 more recent tweets with timestamps
    let queryURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=bootcamp_etges&count=20"
    request(queryURL, function(error,response,body){
        if(!error && response.statusCode === 200){
            
            console.log(JSON.stringify(body,null,2));
        } else {
            console.log(error)
        }
    });
    
    break;

    case "spotify-this-song":
    let songName = process.argv[3];

    //search spotify API for a song name to give Artist, song name back, link of the song on spotify, album that song is from
    break;

    case "movie-this":
    let movieName = process.arg[3];
    //omdb request for movie
}