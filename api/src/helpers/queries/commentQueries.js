const db = require('../../database/db');

class commentClass {
    constructor(){
        this.sql_getComments = 
            'SELECT c.*, u.nickname, l.like FROM comments c '+
            'JOIN users u ON u.user_id = c.user_id '+
            'LEFT JOIN `likes` l ON l.target_id = c.comment_id AND l.user_id = ? '+
            'WHERE c.target_id LIKE ?'+
            'ORDER BY c.timestamp ASC'
        ;

        this.sql_postComment = 
            'INSERT INTO `comments` (`user_id`, `target_id`, `comment`, `timestamp`) VALUES (?,?,?,current_timestamp())'
        ;

        this.sql_checkIfCommentOwner =
            'SELECT * FROM `comments` WHERE comment_id = ? AND user_id = ?'
        ;

        this.sql_manageCommentLikes =
            "SET @p0=?;"+
            "SET @p1=?;"+
            "CALL `sp_manage_likes`(@p0, @p1, @p2);"+
            "SELECT @p2 AS `Q_STATUS`; "
        ;

        this.sql_manageThreadLikes =
            "SET @p0=?;"+
            "SET @p1=?;"+
            "CALL `sp_manage_likes_thread`(@p0, @p1, @p2);"+
            "SELECT @p2 AS `Q_STATUS`; "
        ;

        this.sql_deleteComment =
            'DELETE FROM `likes` WHERE target_id = ? ;'+
            'DELETE FROM `comments` WHERE user_id = ? AND comment_id = ? ;'
        ;

    };

    getComments(id, target_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getComments, [id,target_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getComments query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    postComment(user_id, target_id, message){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_postComment, [user_id, target_id, message], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_postComment query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    checkIfCommentOwner(comment_id, user_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkIfCommentOwner, [comment_id, user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkIfCommentOwner query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    deleteComment(comment_id, user_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_deleteComment, [comment_id, user_id, comment_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_deleteComment query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    manageCommentLikes(target_id,type){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_manageCommentLikes, [target_id,type], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_manageCommentLikes query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    manageThreadLikes(target_id,type){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_manageThreadLikes, [target_id,type], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_manageThreadLikes query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };
}

module.exports = commentClass;