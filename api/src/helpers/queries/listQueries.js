const listQueries = {

    //Create list
    sql_checkBeforeCreateList : 
        'SELECT * FROM lists WHERE user_id = ? AND list_name LIKE ?'
    ,

    sql_createList : 
        'INSERT INTO `lists` (`user_id`, `list_name`, `visibility`, `created`) VALUES (?,?,?,current_timestamp())'
    ,

    //Getters
    sql_getLists :
        'SELECT * FROM lists WHERE user_id = ?'
    ,

    sql_getFriendsLists :
        "SELECT * FROM lists WHERE user_id = ? AND (visibility LIKE 'public' OR visibility LIKE 'friends')"
    ,

    sql_getUsersLists :
        "SELECT * FROM lists WHERE user_id = ? AND visibility LIKE 'public'"
    ,

    sql_getUsersListsData :
        "SELECT * FROM lists_data WHERE user_id = ? AND visibility LIKE 'public'"
    ,

    //Add to list
    sql_checkBeforeAddingMangaToList :
        'SELECT * FROM `lists` WHERE user_id = ? AND list_id = ? ;' + 
        'SELECT * FROM `lists_data` WHERE user_id = ? AND list_id = ? AND manga_id LIKE ? ;'
    ,

    sql_addToMangaList :
        'INSERT INTO `lists_data` (`user_id`, `list_id`, `manga_name`, `manga_id`) VALUES (?,?,?,?)'
    ,

    //Edit list
    sql_checkIfListOwner :
        'SELECT * FROM `lists` WHERE user_id = ? AND list_id = ?'
    ,

    sql_editList :
        'UPDATE `lists` '+
        'SET list_name = ? , visibility = ? '+
        'WHERE list_id = ? ;'
    ,

    //Delete list
    sql_deleteList :
        'DELETE FROM `lists_data` WHERE user_id = ? AND list_id = ? ;' + 
        'DELETE FROM `lists` WHERE user_id = ? AND list_id = ? ;'
    ,

    //List entry
    sql_deleteListEntry :
        'DELETE FROM `lists_data` WHERE user_id = ? AND list_id = ? AND ld_id = ? ;'
    ,

};

module.exports = listQueries;