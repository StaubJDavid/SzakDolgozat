const userQueries = {

    sql_getUserDetails : 
        'SELECT ud.ud_id,ud.user_id,ud.dt_id,dt.type_name,ud.value '+
        'FROM user_details as ud '+
        'JOIN detail_types as dt ON ud.dt_id = dt.dt_id '+
        'WHERE ud.user_id = ?'
    ,

    sql_getUser : 
        'SELECT user_id,email,nickname,registered,last_login FROM users WHERE user_id = ?'
    ,

    sql_getUserNickname : 
        'SELECT nickname FROM users WHERE user_id = ?'
    ,

    sql_checkBeforeAddDetails :
        'SELECT * FROM user_details WHERE user_id = ? AND dt_id = ? AND value LIKE ?'
    ,

    sql_addDetails :
        'INSERT INTO `user_details`(`user_id`, `dt_id`, `value`) VALUES (?,?,?)'
    ,

    sql_checkBeforeDeleteDetail :
        'SELECT * FROM user_details WHERE user_id = ? AND ud_id = ?'
    ,

    sql_deleteDetail :
        'DELETE FROM `user_details` WHERE user_id = ? AND ud_id = ?'
    ,

    sql_checkBeforeEditDetail :
        'SELECT * FROM user_details WHERE (user_id = ? AND ud_id = ?) OR (user_id = ? AND value LIKE ?)'
    ,

    sql_editDetail :
        'UPDATE `user_details` SET `value`=? WHERE user_id = ? AND ud_id = ?'
    ,

    sql_getFriend :
        'SELECT * from user_details WHERE user_id = ? AND dt_id = 4 ;'+
        'SELECT * from user_details WHERE user_id = ? AND dt_id = 4 ;'
    ,

    sql_deleteFriend :
        'DELETE FROM user_details WHERE ud_id = ? OR ud_id = ?'
    ,

};

module.exports = userQueries;