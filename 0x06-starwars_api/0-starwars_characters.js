#!/usr/bin/node

const request = require('request');

// Get the movie ID from the command line arguments
const movieId = process.argv[2];
const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

// First, fetch the movie data
request(apiUrl, function (error, response, body) {
  if (error) {
    console.error('Error fetching the movie data:', error);
    return;
  }

  // Parse the JSON response
  const movieData = JSON.parse(body);
  const characterUrls = movieData.characters;

  // Function to fetch and print a character's name
  function fetchCharacterName(url, callback) {
    request(url, function (err, res, body) {
      if (err) {
        console.error('Error fetching character data:', err);
        return;
      }

      const characterData = JSON.parse(body);
      console.log(characterData.name);
      callback();
    });
  }

  // Sequentially fetch each character name in order
  function fetchAllCharacters(index) {
    if (index === characterUrls.length) return;

    fetchCharacterName(characterUrls[index], function () {
      fetchAllCharacters(index + 1);
    });
  }

  fetchAllCharacters(0);
});
