#!/usr/bin/node

const request = require('request');
const util = require('util');

// Convert request to return a promise
const requestPromise = util.promisify(request);

const filmNum = process.argv[2] + '/';
const filmURL = 'https://swapi-api.hbtn.io/api/films/';

(async function () {
  try {
    // Make API request for the film
    const filmRes = await requestPromise(filmURL + filmNum);
    const charURLList = JSON.parse(filmRes.body).characters;

    // Use URL list to make requests for each character, in order
    for (const charURL of charURLList) {
      const charRes = await requestPromise(charURL);
      console.log(JSON.parse(charRes.body).name);
    }
  } catch (err) {
    console.error(err);
  }
})();
