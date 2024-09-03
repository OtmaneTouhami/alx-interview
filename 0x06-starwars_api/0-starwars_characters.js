#!/usr/bin/node

const request = require('request');

const filmId = process.argv[2];
const filmURL = 'https://swapi-api.alx-tools.com/api/films/';

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
function printCharacterNames(movieId) {
  request(`${filmURL}${movieId}/`, async (error, response, body) => {
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

// Check if movie ID is provided
if (!filmId) {
  console.log('Please provide a movie ID');
} else {
  printCharacterNames(filmId);
}