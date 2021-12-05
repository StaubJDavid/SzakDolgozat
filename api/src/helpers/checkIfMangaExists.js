const db = require('../database/db');
const uq = require('./queries/userQueries')

const checkIfMangaExists = (manga_name, manga_id) => {
  //console.log("before new Promise");
  return new Promise((resolve, reject) => {
    return resolve(1);
  })
}

module.exports = checkIfMangaExists;