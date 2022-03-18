const db = require('../../database/db');

class threadClass {
    constructor(){
        this.sql_checkBeforeCreateThread = 
            "SELECT * FROM `threads` WHERE user_id = ? AND title LIKE ?"
        ;

        this.sql_createThread = 
            "INSERT INTO `threads` (`thread_id`, `user_id`, `title`, `text`, `created`) VALUES (?,?,?,?,current_timestamp())"
        ;

        this.sql_getAllThreads = 
            "SELECT t.*,u.nickname FROM `threads` t JOIN `users` u ON t.user_id = u.user_id"
        ;

        this.sql_getAllThreadsLiked = 
            "SELECT t.*,u.nickname, l.like FROM `threads` t "+
            "JOIN `users` u ON t.user_id = u.user_id "+
            "LEFT JOIN `likes` l ON l.target_id = t.thread_id AND l.user_id = ? "+
            "ORDER BY t.created DESC"
        ;

        this.sql_getThread =
            "SELECT t.*,u.nickname, l.like FROM `threads` t "+
            "JOIN `users` u ON t.user_id = u.user_id "+
            "LEFT JOIN `likes` l ON l.target_id = t.thread_id AND l.user_id = ? "+
            "WHERE t.thread_id = ? "
        ;

        this.sql_checkBeforeDelThread =
            'SELECT * FROM `threads` WHERE user_id = ? && thread_id LIKE ?'
        ;

        this.sql_delThread =
            'DELETE FROM `threads` WHERE thread_id LIKE ?'
        ;

        this.sql_getUsersThreads =
            'SELECT * FROM `threads` WHERE user_id = ?'
        ;

    };

    checkBeforeCreateThread(user_id, title){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkBeforeCreateThread, [user_id, title], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkBeforeCreateThread query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    createThread(thread_id, user_id, title, text){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_createThread, [thread_id, user_id, title, text], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_createThread query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    getThread(id,thread_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getThread, [id,thread_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getThread query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    getAllThreadsLiked(user_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getAllThreadsLiked, [user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getAllThreadsLiked query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    checkBeforeDelThread(user_id,thread_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkBeforeDelThread, [user_id, thread_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkBeforeDelThread query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    delThread(thread_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_delThread, [thread_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_delThread query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    getUsersThread(user_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getUsersThreads, [user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getUsersThreads query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };
}

module.exports = threadClass;