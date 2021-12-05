const voteQueries = {

    sql_getLike : 
        'SELECT * FROM `likes` WHERE user_id = ? AND target_id LIKE ? '
    ,

    sql_postLike : 
        'INSERT INTO `likes`(`user_id`, `target_id`, `like`) VALUES (?,?,?);'
    ,

    sql_deleteLike :
        'DELETE FROM `likes` WHERE user_id = ? AND target_id LIKE ? '
    ,

    sql_updateLike :
        'UPDATE `likes` SET like = ? WHERE user_id = ? AND target_id LIKE ? '
    ,
    sql_getAllLikes :
        'SET @dlike = (SELECT COUNT(*) FROM `likes` l WHERE l.target_id = ? AND l.like = 0);'+
        'SET @plike = (SELECT COUNT(*) FROM `likes` l WHERE l.target_id = ? AND l.like = 1);'+
        'SELECT ? as target_id, @dlike as dislike, @plike as plike'
    ,

    sql_getMangaRatings :
        'SELECT AVG(score) AS atlag , COUNT(*) as db FROM `ratings` WHERE manga_id LIKE ? '
    ,

    sql_checkBeforeMangaRatingPost:
        'SELECT * FROM `ratings` WHERE user_id = ? AND manga_id LIKE ? '
    ,

    sql_postMangaRating:
        'INSERT INTO `ratings` (user_id, manga_name, manga_id, score, timestamp) '+
        'VALUES (?,?,?,?,current_timestamp())'
    ,

    sql_updateMangaRating:
        'UPDATE `ratings` SET score = ? WHERE user_id = ? AND manga_id LIKE ? '
    ,

    sql_deleteMangaRating:
        'DELETE FROM `ratings` WHERE user_id = ? AND manga_id LIKE ? '
    ,
};

module.exports = voteQueries;