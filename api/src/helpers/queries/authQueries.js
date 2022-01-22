const authQueries = {

    sql_checkIfRegistered : 
        "SELECT * FROM `users` WHERE email LIKE ? OR LOWER(nickname) LIKE LOWER(?)"
    ,

    sql_registerUser: 
        "INSERT INTO `users`(`email`, `password`, `nickname`, `role`, `confirmed`, `registered`, `last_login`) VALUES (?,?,?,'user',1,current_timestamp(),current_timestamp());"
    ,

    sql_getRegisteredUser: 
        "SELECT * FROM `users` WHERE user_id = ?"
    ,

    sql_fillDefaultValues:
        'INSERT INTO `user_details`(`user_id`, `dt_id`, `value`) VALUES (?,1,"Welcome to my crib")'
    ,

    sql_loginCheckIfRegistered:
        'SELECT * FROM `users` WHERE email LIKE ?'
    ,
};

module.exports = authQueries;