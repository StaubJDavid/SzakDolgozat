const db = require('../database/db');
const friendClass = require('./queries/friendQueries');
const fc = new friendClass();

const checkIfFriends = (user_id, friend_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkFriendsResult = await fc.checkIfFriends(user_id, friend_id);
      if(checkFriendsResult){
        resolve(1);
      }else{
        resolve(0);
      }
    } catch (error) {
      reject(-1);
    }
  })
}

module.exports = checkIfFriends;