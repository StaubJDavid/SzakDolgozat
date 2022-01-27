const commentQueries = {

    sql_getComments : 
        'SELECT c.*, u.nickname, l.like FROM comments c '+
        'JOIN users u ON u.user_id = c.user_id '+
        'LEFT JOIN `likes` l ON l.target_id = c.comment_id AND l.user_id = ? '+
        'WHERE c.target_id LIKE ?'+
        'ORDER BY c.timestamp ASC'
    ,

    sql_postComment : 
        'INSERT INTO `comments` (`user_id`, `target_id`, `comment`, `timestamp`) VALUES (?,?,?,current_timestamp())'
    ,

    sql_checkIfCommentOwner :
        'SELECT * FROM `comments` WHERE comment_id = ? AND user_id = ?'
    ,

    sql_manageCommentLikes :
    "SET @p0=?;"+
    "SET @p1=?;"+
    "CALL `sp_manage_likes`(@p0, @p1, @p2);"+
    "SELECT @p2 AS `Q_STATUS`; "
    ,

    sql_manageThreadLikes :
    "SET @p0=?;"+
    "SET @p1=?;"+
    "CALL `sp_manage_likes_thread`(@p0, @p1, @p2);"+
    "SELECT @p2 AS `Q_STATUS`; "
    ,

    sql_deleteComment :
        'DELETE FROM `likes` WHERE target_id = ? ;'+
        'DELETE FROM `comments` WHERE user_id = ? AND comment_id = ? ;'
    ,
};

module.exports = commentQueries;