const userQueries = {

    sql_getUserDetails : 
        'SELECT ud.user_id,ud.dt_id,dt.type_name,ud.value '+
        'FROM user_details as ud '+
        'JOIN detail_types as dt ON ud.dt_id = dt.dt_id '+
        'WHERE ud.user_id = ?'
    ,

    sql_getUser : 
        'SELECT user_id,nickname,registered,last_login FROM users WHERE user_id = ?'
    ,

    sql_getUserNickname : 
        'SELECT nickname FROM users WHERE user_id = ?'
    ,

};

module.exports = userQueries;