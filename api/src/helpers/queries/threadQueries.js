const threadQueries = {

    sql_checkBeforeCreateThread : 
        "SELECT * FROM `threads` WHERE user_id = ? AND title LIKE ?"
    ,

    sql_createThread : 
        "INSERT INTO `threads` (`thread_id`, `user_id`, `title`, `text`, `created`) VALUES (?,?,?,?,current_timestamp())"
    ,

    sql_getAllThreads : 
        "SELECT t.*,u.nickname FROM `threads` t JOIN `users` u ON t.user_id = u.user_id"
    ,

    sql_getAllThreadsLiked : 
        "SELECT t.*,u.nickname, l.like FROM `threads` t "+
        "JOIN `users` u ON t.user_id = u.user_id "+
        "LEFT JOIN `likes` l ON l.target_id = t.thread_id AND l.user_id = ? "+
        "ORDER BY t.created DESC"
    ,

    sql_getThread:
        "SELECT t.*,u.nickname, l.like FROM `threads` t "+
        "JOIN `users` u ON t.user_id = u.user_id "+
        "LEFT JOIN `likes` l ON l.target_id = t.thread_id AND l.user_id = ? "+
        "WHERE t.thread_id = ? "
    ,

    

    sql_checkBeforeDelThread:
        'SELECT * FROM `threads` WHERE user_id = ? && thread_id LIKE ?'
    ,

    sql_delThread:
        'DELETE FROM `threads` WHERE thread_id LIKE ?'
    ,

    sql_getUsersThreads:
        'SELECT * FROM `threads` WHERE user_id = ?'
    ,
};

module.exports = threadQueries;