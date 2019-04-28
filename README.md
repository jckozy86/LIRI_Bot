# LIRI Bot Assignment

This is Week 11 assignment and is a CLI application that requires Node to run.

## Pre-requisites

If you have already installed yarn, ignore the following instructions and go to the next step

* Windows Users: Install Yarn [here](https://yarnpkg.com/latest.msi).
* Mac Users: Using Homebrew Install Yarn like this: `brew install yarn`

## Using The Application

In order to use the app, you need to download all the files from github, and then run `yarn install`

Once complete you can do any of the following:

### Check for Movies

You can search for a movie with any title by running
`node liri.js movie-this <*Name of movie*>`
or if you forget to add a movie name, you will get by default the movie: "Mr Nobody."

The response includes:
* Title
* Release Year
* IMDB Rating
* Rotten Tomatoes Rating
* Country Produced
* Language of Movie
* Plot
* Actors

### Check for Songs at Spotify by Song Title

You can search for a song at spotify with any title by running
`node liri.js spotify-this-song <*Name of song*>`
or if you forget to add a song title, you will get by default the song: "The Sign." by "Ace of Base"

The response includes:
* Track Name
* Artist(s)
* Album Name
* Link to song preview


### Concerts using BandsInTown by Artist Name

You can search for band venues for specific artists by running
`node liri.js concert-this <*Artist Name*>`
or if you forget to add a song title, you will get by default the song: "The Sign." by "Ace of Base"

The response includes:
* Venue Name
* Location (city and country)
* Event Date (MM/DD/YYYY)

### Concerts/Movies/Spotify songs in bulk

You can also add all the above commands in a file called *random.txt* that will all run by running `node liri.js do-what-it-says`

## Results

The results will show up on the console view of the terminal, but will also be added on the *log.txt* file on the project root directory

## Instructional Video

An instructional video can be found at: [demo video](https://drive.google.com/open?id=1SFuaVYGJLrpn2YztXAp54WYCWqRTOzMa)

## Folder and file Structure

```
liri.js -> main file to run
keys.js -> contains the format of spotify keys
random.txt -> file containing all the commands you wish to run on each line, delimited by a ','
log.txt -> file created (if not already existing) with the output of each command run
.env -> contains the actual keys for the app
package.json -> file containing all dependencies
yarn.lock -> file containing exact module version dependencies
```
For purposes of this project working, please do not change file names or folder locations.

### Thanks for checking this out :D
