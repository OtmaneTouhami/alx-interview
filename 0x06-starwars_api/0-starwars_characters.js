#!/usr/bin/node

const request = require('request');

// Function to get character name from URL
function getCharacterName(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        const character = JSON.parse(body);
        resolve(character.name);
      }
    });
  });
}

// Main function to get and print character names
async function printCharacterNames(movieId) {
  const movieUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

  request(movieUrl, async (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      return;
    }

    const movie = JSON.parse(body);
    const characterUrls = movie.characters;

    for (const url of characterUrls) {
      try {
        const name = await getCharacterName(url);
        console.log(name);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    }
  });
}

// Get movie ID from command line argument
const movieId = process.argv[2];

if (!movieId) {
  console.log('Please provide a movie ID');
} else {
  printCharacterNames(movieId);
}
