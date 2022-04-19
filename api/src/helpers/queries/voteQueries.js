const db = require('../../database/db');

class voteClass {
    constructor(){
        this.sql_getLike = 
            'SELECT * FROM `likes` WHERE user_id = ? AND target_id LIKE ? '
        ;

        this.sql_postLike = 
            'INSERT INTO `likes`(`user_id`, `target_id`, `like`) VALUES (?,?,?);'
        ;

        this.sql_deleteLike =
            'DELETE FROM `likes` WHERE user_id = ? AND target_id LIKE ? '
        ;

        this.sql_updateLike =
            'UPDATE `likes` SET `like` = ? WHERE user_id = ? AND target_id = ? ;'
        ;

        this.sql_getAllLikes =
            'SET @dlike = (SELECT COUNT(*) FROM `likes` l WHERE l.target_id = ? AND l.like = 0);'+
            'SET @plike = (SELECT COUNT(*) FROM `likes` l WHERE l.target_id = ? AND l.like = 1);'+
            'SELECT ? as target_id, @dlike as dislike, @plike as plike'
        ;

        this.sql_getMangaRatings =
            'SELECT AVG(score) AS atlag , COUNT(*) as db FROM `ratings` WHERE manga_id LIKE ? ;' +
            'SELECT * FROM `ratings` WHERE manga_id LIKE ? AND user_id = ? '
        ;

        this.sql_checkBeforeMangaRatingPost =
            'SELECT * FROM `ratings` WHERE user_id = ? AND manga_id LIKE ? '
        ;

        this.sql_postMangaRating =
            'INSERT INTO `ratings` (user_id, manga_name, manga_id, score, timestamp) '+
            'VALUES (?,?,?,?,current_timestamp())'
        ;

        this.sql_updateMangaRating =
            'UPDATE `ratings` SET score = ? WHERE user_id = ? AND manga_id LIKE ? '
        ;

        this.sql_deleteMangaRating =
            'DELETE FROM `ratings` WHERE user_id = ? AND manga_id LIKE ? '
        ;

    };

    getLike(user_id,target_id){
        //Error definiálása
        let error = new Error('Get the user\'s like on target');
        return new Promise((resolve,reject) => {
            //SQL utasítás futtatása
            db.query(this.sql_getLike, [user_id,target_id], (err, results) => {
                if(err){
                    //Hiba történt, try catch blokkban elkell kapni ezt a kivételt
                    console.log(err);
                    error.query = "sql_getLike query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    //Minden jó, vissza adja az eredményt
                    resolve(results);
                }
            });
        })  
    };

    postLike(user_id,target_id,like){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_postLike, [user_id,target_id,like], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_postLike query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    deleteLike(user_id,target_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_deleteLike, [user_id,target_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_deleteLike query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    updateLike(like,user_id,target_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_updateLike, [like,user_id,target_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_updateLike query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    getAllLikes(target_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getAllLikes, [target_id, target_id, target_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getAllLikes query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    getMangaRatings(manga_id,id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getMangaRatings, [manga_id,manga_id,id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getMangaRatings query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    checkBeforeMangaRatingPost(user_id, manga_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkBeforeMangaRatingPost, [user_id, manga_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkBeforeMangaRatingPost query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    postMangaRating(user_id, manga_name, manga_id, score){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_postMangaRating, [user_id, manga_name, manga_id, parseInt(score)], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_postMangaRating query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    updateMangaRating(score, user_id, manga_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_updateMangaRating, [score, user_id, manga_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_updateMangaRating query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    deleteMangaRating(user_id, manga_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_deleteMangaRating, [user_id, manga_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_deleteMangaRating query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };
}

module.exports = voteClass;