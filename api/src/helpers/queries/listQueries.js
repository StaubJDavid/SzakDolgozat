const db = require('../../database/db');

class listClass {
    constructor(){
        //Create list
        this.sql_checkBeforeCreateList = 
            'SELECT * FROM lists WHERE user_id = ? AND list_name LIKE ?'
        ;

        this.sql_createList = 
            'INSERT INTO `lists` (`user_id`, `list_name`, `visibility`, `created`) VALUES (?,?,?,current_timestamp())'
        ;

        //Getters
        this.sql_getLists =
            'SELECT * FROM `lists` WHERE user_id = ?;'+
            'SELECT * FROM `lists_data` WHERE user_id = ? '
        ;

        this.sql_getFriendsLists =
            "SELECT * FROM `lists` WHERE user_id = ? AND (visibility LIKE 'public' OR visibility LIKE 'friends');"+
            "SELECT ld.*, l.visibility FROM `lists_data` as ld JOIN `lists` as l ON ld.list_id = l.list_id WHERE ld.user_id = ? AND (visibility LIKE 'public' OR visibility LIKE 'friends')"
        ;

        this.sql_getUsersLists =
            "SELECT * FROM `lists` WHERE user_id = ? AND (visibility LIKE 'public');"+
            "SELECT ld.*, l.visibility FROM `lists_data` as ld JOIN `lists` as l ON ld.list_id = l.list_id WHERE ld.user_id = ? AND (visibility LIKE 'public')"
        ;

        this.sql_getUsersListsData =
            "SELECT * FROM lists_data WHERE user_id = ? AND visibility LIKE 'public'"
        ;

        this.sql_getListFriends=
            "SELECT * FROM lists WHERE "
        ;

        //sql_getListNotFriends=,

        //Add to list
        this.sql_checkBeforeAddingMangaToList =
            'SELECT * FROM `lists` WHERE user_id = ? AND list_id = ? ;' + 
            'SELECT * FROM `lists_data` WHERE user_id = ? AND list_id = ? AND manga_id LIKE ? ;'
        ;

        this.sql_addToMangaList =
            'INSERT INTO `lists_data` (`user_id`, `list_id`, `manga_name`, `manga_id`) VALUES (?,?,?,?)'
        ;

        //Edit list
        this.sql_checkIfListOwner =
            'SELECT * FROM `lists` WHERE user_id = ? AND list_id = ?'
        ;

        this.sql_editList =
            'UPDATE `lists` '+
            'SET list_name = ? , visibility = ? '+
            'WHERE list_id = ? ;'
        ;

        //Delete list
        this.sql_deleteList =
            'DELETE FROM `lists_data` WHERE user_id = ? AND list_id = ? ;' + 
            'DELETE FROM `lists` WHERE user_id = ? AND list_id = ? ;'
        ;

        //List entry
        this.sql_deleteListEntry =
            'DELETE FROM `lists_data` WHERE user_id = ? AND list_id = ? AND ld_id = ? ;'
        ;

    };

    checkBeforeCreateList(user_id, list_name){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkBeforeCreateList, [user_id, list_name], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkBeforeCreateList query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    createList(user_id, list_name, visibility){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_createList, [user_id, list_name, visibility], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_createList query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    getLists(user_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getLists, [user_id,user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getLists query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    getFriendsLists(user_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getFriendsLists, [user_id,user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getFriendsLists query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    getUsersLists(user_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_getUsersLists, [user_id,user_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_getUsersLists query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    checkIfListOwner(user_id, list_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkIfListOwner, [user_id, list_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkIfListOwner query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    editList(list_name, visibility, list_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_editList, [list_name, visibility, list_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_editList query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    checkBeforeAddingMangaToList(user_id, list_id, manga_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_checkBeforeAddingMangaToList, [user_id, list_id, user_id, list_id, manga_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_checkBeforeAddingMangaToList query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    addToMangaList(user_id, list_id, manga_name, manga_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_addToMangaList, [user_id, list_id, manga_name, manga_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_addToMangaList query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    deleteList(user_id, list_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_deleteList, [user_id, list_id, user_id, list_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_deleteList query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };

    deleteListEntry(user_id, list_id, list_data_id){
        let error = new Error('Check if registered for login');
        return new Promise((resolve,reject) => {
            db.query(this.sql_deleteListEntry, [user_id, list_id, list_data_id], (err, results) => {
                if(err){
                    console.log(err);
                    error.query = "sql_deleteListEntry query error";
                    error.log = err;
    
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })  
    };
}

module.exports = listClass;