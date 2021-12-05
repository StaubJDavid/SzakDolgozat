const friendRequestQueries = {
    //Sending
    sql_checkBeforeSendFriendRequest : 
        "SELECT * FROM `friend_requests` WHERE sender_id = ? AND reciever_id = ?"
    ,

    sql_checkIfFriends : 
        "SELECT * FROM `user_details` WHERE user_id = ? AND dt_id = 4"
    ,

    sql_sendFriendRequest : 
        "INSERT INTO `friend_requests` (`sender_id`, `reciever_id`, `message`, `timestamp`) VALUES (?,?,?,current_timestamp())"
    ,

    //Accept
    sql_checkBeforeAcceptFriendRequest: 
        "SELECT * FROM friend_requests WHERE sender_id = ? AND reciever_id = ?"
    ,

    sql_getUserNickname: 
        "SELECT nickname FROM users WHERE user_id = ?"
    ,

    sql_acceptFriendRequest: 
        "DELETE FROM `friend_requests` WHERE (sender_id = ? AND reciever_id = ?) OR (sender_id = ? AND reciever_id = ?);"+
        "INSERT INTO user_details (`user_id`,`dt_id`,`value`) VALUES (?,4,?), (?,4,?)"
    ,

    //Delete
    sql_checkBeforeDeleteFriendRequest:
        'SELECT * FROM `friend_requests` WHERE (sender_id = ? AND reciever_id = ?) OR (sender_id = ? AND reciever_id = ?)'
    ,

    sql_deleteFriendRequest:
        'DELETE FROM `friend_requests` WHERE (sender_id = ? AND reciever_id = ?) OR (sender_id = ? AND reciever_id = ?)'
    ,

    //Get
    sql_getFriendRequests:
        'SELECT * FROM friend_requests fr JOIN users u on fr.reciever_id = u.user_id WHERE fr.sender_id = ? ;'+
        'SELECT * FROM friend_requests fr JOIN users u on fr.sender_id = u.user_id WHERE fr.reciever_id = ? ;'
    ,
};

module.exports = friendRequestQueries;