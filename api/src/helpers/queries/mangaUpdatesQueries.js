const axios = require('axios');
const db = require('../../database/db');
const getMangaTitle = require('../getMangaTitle');

class mangaUpdatesClass {
    constructor(){
        this.sql_checkIfMangaLanguageExists =
        'SELECT * FROM `intrigued_manga_translations` as imt WHERE imt.manga_id = ? AND imt.translated_language LIKE ? ;' + 
        'SELECT * FROM `intrigued_manga_translations` as imt JOIN `imt_subscribers` as imts ON imt.imt_id = imts.imt_id  WHERE imt.manga_id = ? AND imt.translated_language LIKE ? AND imts.user_id = ?'
        ;

        //CHAPTERID
        this.sql_insertMangaLanguage = 
            'INSERT INTO `intrigued_manga_translations`(`manga_id`, `chapter_id`, `manga_name`, `translated_language`, `chapter`, `followers`) VALUES (?,?,?,?,?,1)'
        ;

        this.sql_deleteMangaLanguage = 
            'DELETE FROM `intrigued_manga_translations` WHERE `manga_id` LIKE ? '
        ;

        this.sql_deleteSubscriber = 
            'DELETE FROM `imt_subscribers` WHERE `user_id` = ? AND `imt_id` = ? '
        ;

        this.sql_addUserToMangaLanguage = 
            'INSERT INTO `imt_subscribers`(`user_id`, `imt_id`) VALUES (?,?)'
        ;

        this.sql_manageMangaUpdateFollowers =
            "SET @p0=?;"+
            "SET @p1=?;"+
            "CALL `sp_manage_manga_subscribers`(@p0, @p1, @p2);"+
            "SELECT @p2 AS `Q_STATUS`; "
        ;

        this.sql_getAllSubscribedManga = 
            'SELECT * FROM `intrigued_manga_translations` as imt JOIN  `imt_subscribers` as ims ON imt.imt_id = ims.imt_id WHERE ims.user_id = ?'
        ;

        this.sql_getAllManga = 
            'SELECT * FROM `intrigued_manga_translations` '
        ;
    };

    async getMangaLatestChapterInLanguage(manga_id,translatedL) {
        return await axios.get(`https://api.mangadex.org/chapter?manga=${manga_id}&translatedLanguage[]=${translatedL}&order[volume]=desc&order[chapter]=desc&limit=1&includes[]=manga`)
        .then(
            res => {
                if(res.data.total === 0) return {result: "Language", chapter: -1.0};
                if(res.data.data[0].attributes.title === "Oneshot") return {result: "Oneshot", chapter: -1.0};
                return {result: "Success", chapter: parseFloat(res.data.data[0].attributes.chapter), manga_name:getMangaTitle(res.data.data[0].relationships,translatedL), chapterId:res.data.data[0].id};
                
            }
        )
    };

    async checkIfMLanguage(manga_id,translated_language,user_id){
        let err = new Error('Check If Manga Language exists, and user subscribed');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkIfMangaLanguageExists, [manga_id,translated_language,manga_id,translated_language,user_id], (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_checkIfMangaLanguageExists query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    if(results1[0].length === 1){
                        if(results1[1].length === 0){
                            //return {manga:true,user:false}
                            resolve({manga:true,user:false,mangaLanguage:results1[0], mlUserJoin:results1[1]});
                        }else{
                            err.user = "This user is already subscribed to this manga update";
                                        
                            reject(err);
                        }
                    }else if(results1[0].length === 0){
                        //return {manga:false,user:false}
                        resolve({manga:false,user:false, mangaLanguage:results1[0], mlUserJoin:results1[1]});
                    }else{
                        err.query = "More than 1 manga updates with " + manga_id + " and " + translated_language;
        
                        reject(err);
                    }
                }
            });
        })   
    };
    
    async addUserToMangaLanguage(user_id,imt_id){
        let err = new Error('Subscribe user to Manga Language Update');
        return new Promise((resolve,reject) => {
            db.query(this.sql_addUserToMangaLanguage, [user_id, imt_id], (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_addUserToMangaLanguage query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    if(results1.affectedRows === 1){
                        resolve({userInsert: true})
                    }else{
                        err.query = `More than 1 user insert imt_id: ${imt_id} ,user_id: ${user_id}`;
        
                        reject(err);
                    }
                }
            });
        })   
    };
    
    async createMangaLanguage(manga_id,manga_name,translated_language, chapter, chapterId){
        let err = new Error('Subscribe user to Manga Language Update');
        return new Promise((resolve,reject) => {
            db.query(this.sql_insertMangaLanguage, [manga_id,chapterId,manga_name,translated_language,chapter], (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_insertMangaLanguage query error";
                    err.log = err1;
    
                    reject(err);
                }else{
                    if(results1.affectedRows === 1){
                        resolve({insertMangaLanguage:true, insertedId: results1.insertId});
                    }else{
                        err.query = `Manga language insert on ${manga_id} with language: ${translated_language} failed`;
    
                        reject(err);
                    }
                }
            });
        })   
    };
    
    async manageMangaUpdatesFollowers(imt_id,operation){
        let err = new Error('Increase or Decrease Manga Updates Followers count');
        return new Promise((resolve,reject) => {
            db.query(this.sql_manageMangaUpdateFollowers, [imt_id,operation], (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_insertMangaLanguage query error";
                    err.log = err1;
    
                    reject(err);
                }else{
                    if(results1[2][0]){
                        console.log(results1[2][0]);
                        err.query = results1[2][0].message;
                        reject(err);
                    }else{
                        if(results1[3][0].Q_STATUS === 1){
                            resolve({success: true, reason:`Successfully ${operation} the ${imt_id} followers count`})
                        }else if(results1[3][0].Q_STATUS === 2){
                            resolve({success: true, reason:`Successfully lowered, and deleted ${imt_id}`})
                        }else{
                            err.query = "Hehe something wrong";
                            reject(err);
                        }
                    }
                }
            });
        })   
    };

    async getSubscribedMangas(user_id){
        let err = new Error('Get all of the users subscribed mangas');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getAllSubscribedManga, [user_id], (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_getAllSubscribedManga query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    resolve(results1);
                }
            });
        })   
    };

    async unsubscribeUser(user_id, imt_id){
        let err = new Error('Remove user from subscriber table');
        return new Promise((resolve,reject) => {
            db.query(this.sql_deleteSubscriber, [user_id, imt_id], (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_checkIfMangaLanguageExists query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    if(results1.affectedRows === 1){
                        resolve({success:true, reason:`Successfully deleted user ${user_id} who was subscribed to ${imt_id}`})
                    }else{
                        if(results1.affectedRows === 0){
                            err.query = `Not subscribed`;
                        }else{
                            err.query `Deleted ${results1.affectedRows} rows instead of 1`;
                        }
        
                        reject(err);
                    }
                }
            });
        })   
    };

    async getAllMangaTranslate(){
        let err = new Error('Get every manga and chapter that is subscribed to');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getAllManga, (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_getAllManga query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    resolve({success: true, data:results1})
                }
            });
        })   
    };

    //CHAPTERID
    async updateMangaTranslate(mangas){
        let err = new Error('Update every manga');

        let sql = "INSERT INTO `intrigued_manga_translations`(`imt_id`,`manga_id`, `chapter_id`, `manga_name`, `translated_language`, `chapter`, `followers`) VALUES ";
        // INSERT INTO chart (id, flag) 
        // VALUES (1, 'FLAG_1'),(2, 'FLAG_2') AS aliased
        // ON DUPLICATE KEY UPDATE flag=aliased.flag;
        for(let i = 0; i < mangas.length; i++){
            const {imt_id, manga_id, manga_name, translated_language, followers} = mangas[i].manga;
            sql += `(${imt_id},"${manga_id}","${mangas[i].chapterId}","${manga_name}","${translated_language}",${mangas[i].chapter},${followers}),`
        }

        sql = sql.replace(/.$/," ");
        sql += " ON DUPLICATE KEY UPDATE chapter=VALUES(chapter), chapter_id=VALUES(chapter_id)";
        
        return new Promise((resolve,reject) => {
            db.query(sql, (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_getAllManga query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    //console.log(results1);
                    if(results1.affectedRows === mangas.length*2){
                        resolve({success: true, data:results1})
                    }else{
                        reject({success: false, data:results1})
                    }
                }
            });
        })   
    };

    async getEverySubscribedUser(mangas){
        let err = new Error('Update every manga');

        let sql = "SELECT imt.*, u.user_id, u.email, u.nickname "+
        "FROM `intrigued_manga_translations` imt " +
        "JOIN `imt_subscribers` ims ON imt.imt_id = ims.imt_id "+
        "JOIN `users` u ON ims.user_id = u.user_id " +
        "WHERE"

        for(let i = 0; i < mangas.length; i++){
            sql += ` imt.imt_id = ${mangas[i].manga.imt_id} OR`
        }

        sql = sql.replace(/ OR$/,"");

        return new Promise((resolve,reject) => {
            db.query(sql, (err1, results1) => {
                if(err1){
                    console.log(err1);
                    err.query = "sql_getEverySubscribed query error";
                    err.log = err1;
        
                    reject(err);
                }else{
                    resolve({success: true, data:results1})
                }
            });
        })  
    };
}

module.exports = mangaUpdatesClass;