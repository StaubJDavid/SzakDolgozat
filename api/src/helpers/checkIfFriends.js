const db = require('../database/db');
const uq = require('./queries/userQueries')

const checkIfFriends = (user_id, friend_id) => {
  //console.log("before new Promise");
  return new Promise((resolve, reject) => {
    //console.log("before query");
    db.query(uq.sql_getFriend, [user_id, friend_id], (err1, results1) => {
      if(err1){
        //console.log("in error quety");
        console.log(-1);
        return reject(-1);
      }else{
          //console.log("in good quety");
          let ufudid = -1;
          let ffudid = -1;
          //let fid = results2[i].value.substring(0,results2[i].value.indexOf(' '));
          //fnickname = results2[i].value.substring(results2[i].value.indexOf(' ')+1)
          for(let i = 0; i < results1[0].length; i++){
              let frId = parseInt(results1[0][i].value.substring(0,results1[0][i].value.indexOf(' ')));
              if(results1[0][i].user_id == user_id && frId == friend_id){
                  ufudid = results1[0][i].ud_id;
              }
          }  
          
          for(let i = 0; i < results1[1].length; i++){
              let uId = parseInt(results1[1][i].value.substring(0,results1[1][i].value.indexOf(' ')));
              if(results1[1][i].user_id == friend_id && uId == user_id){
                  ffudid = results1[1][i].ud_id;
              }
          } 
          
          if(ufudid != -1 && ffudid != -1){
            /*console.log("in friends quety");
            console.log(1);*/
            return resolve(1);
          }else{
            /*console.log("in not friends quety");
            console.log(0);*/
            return resolve(0);
          }
      }
    });
  })
}

module.exports = checkIfFriends;