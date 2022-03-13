const axios = require('axios');
const db = require('../../database/db');
const getMangaTitle = require('../getMangaTitle');

class chatClass {
    constructor(){
        this.sql_getFriends =
            'SELECT * FROM `user_details` WHERE user_id = ? AND dt_id = 4 ;'
        ;

        this.sql_insertMessage =
            'INSERT INTO `messages`(`sender_id`, `reciever_id`, `message`, `timestamp`) VALUES (?,?,?,?)'
        ;

        this.sql_ownMessages =
            'SELECT * FROM `messages` WHERE sender_id = ? ORDER BY reciever_id DESC, timestamp DESC LIMIT ? ; ' + 
            'SELECT * FROM `messages` WHERE reciever_id = ? ORDER BY sender_id DESC, timestamp DESC LIMIT ? ' 
        ;

        this.sql_allMessages =
            'SELECT * FROM `messages` WHERE ( sender_id = ? AND reciever_id = ? ) OR ( sender_id = ? AND reciever_id = ? ) ORDER BY timestamp DESC'    
        ;

        this.sql_message =
            'SELECT * FROM `messages` WHERE message_id = ?'    
        ;

    };

    /*async getMangaLatestChapterInLanguage(manga_id,translatedL) {
        return await axios.get(`https://api.mangadex.org/chapter?manga=${manga_id}&translatedLanguage[]=${translatedL}&order[volume]=desc&order[chapter]=desc&limit=1&includes[]=manga`)
        .then(
            res => {
                if(res.data.total === 0) return {result: "Language", chapter: -1.0};
                if(res.data.data[0].attributes.title === "Oneshot") return {result: "Oneshot", chapter: -1.0};
                return {result: "Success", chapter: parseFloat(res.data.data[0].attributes.chapter), manga_name:getMangaTitle(res.data.data[0].relationships,translatedL), chapterId:res.data.data[0].id};
                
            }
        )
    };*/

    async getFriendlist(id){
        let error = new Error('Get friendlist');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getFriends, [id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getEverySubscribed query error";
                    error.log = err;
        
                    reject(error);
                }else{
                    resolve({success: true, data:results})
                }
            });
        })  
    };

    async sendMessage(sender_id, reciever_id, message, timestamp){
        let error = new Error('Send message');
        return new Promise((resolve,reject) => {
            db.query(this.sql_insertMessage, [sender_id, reciever_id, message, timestamp], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_insertMessage query error";
                    error.log = err;
        
                    reject(error);
                }else{
                    if(results.affectedRows === 1){
                        resolve({success: true, data:results})
                    }else{
                        reject({success: false, data:results});
                    }
                }
            });
        })  
    };

    async getOwnMessages(user_id,length){
        let error = new Error('Send message');
        return new Promise((resolve,reject) => {
            db.query(this.sql_ownMessages, [user_id, length, user_id, length], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_ownMessages query error";
                    error.log = err;
        
                    reject(error);
                }else{
                    resolve({success: true, datasent:results[0], datarecieved:results[1]})
                }
            });
        })  
    };

    async getAllMessages(user_id,friend_id){
        let error = new Error('Send message');
        return new Promise((resolve,reject) => {
            db.query(this.sql_allMessages, [user_id, friend_id, friend_id, user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_allMessages query error";
                    error.log = err;
        
                    reject(error);
                }else{
                    resolve({success: true, data:results})
                }
            });
        })  
    };

    async getMessage(message_id){
        let error = new Error('Send message');
        return new Promise((resolve,reject) => {
            db.query(this.sql_message, [message_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_allMessages query error";
                    error.log = err;
        
                    reject(error);
                }else{
                    resolve({success: true, data:results})
                }
            });
        })  
    };
}

module.exports = chatClass;