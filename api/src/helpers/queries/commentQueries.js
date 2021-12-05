const commentQueries = {

    sql_getComments : 
        'SELECT c.*, u.nickname FROM comments c '+
        'JOIN users u ON u.user_id = c.user_id '+
        'WHERE c.target_id LIKE ?'
    ,

    sql_postComment : 
        'INSERT INTO `comments` (`user_id`, `target_id`, `comment`, `timestamp`) VALUES (?,?,?,current_timestamp())'
    ,

    sql_checkIfCommentOwner :
        'SELECT * FROM `comments` WHERE comment_id = ? AND user_id = ?'
    ,

    sql_deleteComment :
        'DELETE FROM `likes` WHERE target_id = ? ;'+
        'DELETE FROM `comments` WHERE user_id = ? AND comment_id = ? ;'
    ,
};

module.exports = commentQueries;