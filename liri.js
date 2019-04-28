var env = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');

var spotify = new Spotify({
  id: "9560a843b8df433e9421edb85f2a7963",
  secret: "e3ad0bfce44c47d0932ad2fd28034853"
});

var omdb = {
  key: "c2f3b287"
}

if (process.argv.length < 3) {
  help();
  return;
}

function help() {
  console.log("To use this app you need to include a command and a band/artist name");
  console.log("commands are: concert-this, spotify-this-song, movie-this, do-what-it-says");
  console.log("example: node liri.js concert-this prodigy");
  return;
}

var command = process.argv[2].trim();
var search = process.argv.slice(3).join(" ").trim();

switch (command) {
  case "concert-this":
    myConcerts(search);
    break;
  case "spotify-this-song":
    mySpotify(search);
    break;
  case "movie-this":
    myMovie(search);
    break;
  case "do-what-it-says":
    fileReading(search);
    break;
  default:
    help();
}

function mySpotify(search) {

  if (!search || search === "") {



    spotify.search({
        type: 'track',
        query: 'The Sign',
        limit: 15
      })
      .then(function (response) {
        //console.log(JSON.stringify(response.tracks.items));

        var output = response.tracks.items;

        console.log("\nSpotifying with search: " + search + "\n\n");
        appendMyFile("\nSpotifying with search: " + search + "\n\n");

        output.forEach(track => {
          if (track.album.artists[0].name === "Ace of Base") {

            var showData = [
              "Name: " + track.name,
              "Artist(s): " + track.album.artists[0].name,
              "Album: " + track.album.name,
              "Link: " + track.preview_url
            ].join("\n\n");

            console.log(showData);
            console.log("\n\n");

            appendMyFile(showData);

          }
        })
      })
      .catch(function (err) {
        console.log(err);
      });

  } else {

    spotify.search({
        type: 'track',
        query: search,
        limit: 5
      })
      .then(function (response) {
        //console.log(JSON.stringify(response.tracks.items));

        var output = response.tracks.items;

        console.log("\nSpotifying with search: " + search + "\n\n");
        appendMyFile("\nSpotifying with search: " + search + "\n\n");

        output.forEach(track => {

          var artists = "";

          track.artists.forEach(tr =>
            (artists === "") ?
            artists += tr.name :
            artists += ", " + tr.name
          )

          var showData = [
            "Name: " + track.name,
            "Artist(s): " + artists,
            "Album: " + track.album.name,
            "Link: " + track.preview_url
          ].join("\n\n");


          console.log(showData);
          console.log("\n\n");

          appendMyFile(showData);

        })
      })
      .catch(function (err) {
        console.log(err);
      });

  }

}

function appendMyFile(showData) {
  fs.appendFileSync('log.txt', showData, function (err) {
    if (err) throw err;
    //console.log('Saved!');
  });
}

function myMovie(search) {

  if (search === "") {
    search = "Mr. Nobody";
  }


  var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  //console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {

      console.log("\nDoing movie query with search: " + search + "\n\n");
      appendMyFile("\nDoing movie query with search: " + search + "\n\n");

      var movie = response.data;

      var rotten = "N/A";
      //console.log(JSON.stringify(movie))


      movie.Ratings.forEach(rating => {
        if (rating.Source == "Rotten Tomatoes") {
          rotten = rating.Value;
        }
      })

      var showData = [
        "Title: " + movie.Title,
        "Release Year: " + movie.Released,
        "IMDB Rating: " + movie.imdbRating,
        "Rotten Tomatoes Rating: " + rotten,
        "Country Produced: " + movie.Country,
        "Language of Movie: " + movie.Language,
        "Plot: " + movie.Plot,
        "Actor(s): " + movie.Actors
      ].join("\n\n");

      console.log(showData);
      console.log("\n\n");

      appendMyFile(showData);
    }
  );

}

function myConcerts(search) {

  if (search === "") {
    search = "Pink";
  }

  var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

  // This line is just to help us debug against the actual URL.
  //console.log(queryUrl);



  axios.get(queryUrl).then(
    function (response) {

      var venues = response.data;

      console.log("\nConcert search for band: " + search + "\n\n");
      appendMyFile("\nConcert search for band: " + search + "\n\n");

      venues.forEach(venue => {
        var showData = [
          "Venue: " + venue.venue.name,
          "Location: " + venue.venue.city + " " + venue.venue.country,
          "Event Date: " + moment(venue.datetime).format("MM/DD/YYYY")
        ].join("\n\n");

        console.log(showData);
        console.log("\n\n");

        appendMyFile(showData);
      })
    }
  );

}

function fileReading() {

  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    var lines = data.split('\n');

    lines.forEach(line => {

      var arr = line.split(',');

      var command = arr[0].trim();
      var search = arr[1].trim();

      switch (command) {
        case "concert-this":
          myConcerts(search);
          break;
        case "spotify-this-song":
          mySpotify(search);
          break;
        case "movie-this":
          myMovie(search);
          break;
        default:
          help();
      }
    })
  });
}