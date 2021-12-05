const threadQueries = {

    sql_checkBeforeCreateThread : 
        "SELECT * FROM `threads` WHERE user_id = ? AND title LIKE ?"
    ,

    sql_createThread : 
        "INSERT INTO `threads` (`thread_id`, `user_id`, `title`, `text`, `created`) VALUES (?,?,?,?,current_timestamp())"
    ,

    sql_getAllThreads : 
        "SELECT * FROM `threads`"
    ,

    sql_getThread:
        'SELECT * FROM `threads` WHERE thread_id LIKE ?'
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