# LIRI - Language Interpretation and Recognition Interface

## Nodejs Application for API Calls

###Run npm i to install necessary npm packages!
####Packages used:
    dotenv
    inquirer
    request
    twitter
    node-spotify-api

##Takes in the following commands:
    'my-tweets' - displays the 20 most recent tweets from a dummy Twitter   account (bootcamp_etges) along with timestamps

    'spotify-this-song' - prompts for a song track name, and searches   Spotify API to display information about that song. Displays the 5 most   relevant results

    'movie-this' - prompts user to search for a movie title to get more     information
        **Known Issue** - If the user searches for something that isn't     necessarily a movie (eg a video game), the search will return an    error because certain rating values will be undefined

    'do-what-it-says' - runs a Spotify search with information from     "random.txt" text file

Each command and result is logged to a log.txt file
