CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255),
    `password` VARCHAR(255),
    `nickname` VARCHAR(255),
    `role` ENUM('user', 'admin'),
    `confirmed` BOOLEAN DEFAULT 0,
    `registered` DATETIME,
    `last_login` DATETIME,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `detail_types` (
    `dt_id` INT NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(255),
    PRIMARY KEY (`dt_id`)
);

CREATE TABLE IF NOT EXISTS `user_details` (
    `ud_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `dt_id` INT NOT NULL,
    `value` VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (dt_id) REFERENCES detail_types(dt_id)
);

CREATE TABLE IF NOT EXISTS `lists` (
    `list_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `list_name` VARCHAR(255),
    `created` DATETIME,
    `visibility` ENUM('public', 'private', 'friends'),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS `lists_data` (
    `ld_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `list_id` INT NOT NULL,
    `manga_name` VARCHAR(255),
    `manga_id` VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (list_id) REFERENCES lists(list_id)
);

CREATE TABLE IF NOT EXISTS `ratings` (
    `rating_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `manga_name` VARCHAR(255),
    `manga_id` VARCHAR(255),
    `score` INT,
    `timestamp` DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS `comments` (
    `comment_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `target_id` VARCHAR(255),
    `comment` VARCHAR(255),
    `timestamp` DATETIME,
    `likes` INT DEFAULT 0,
    `dislikes` INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS `threads` (
    `thread_id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `user_id` INT NOT NULL,
    `title` VARCHAR(255),
    `text` VARCHAR(255),
    `created` DATETIME,
    `views` INT DEFAULT 0,
    `likes` INT DEFAULT 0,
    `dislikes` INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS `likes` (
    `like_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `target_id` VARCHAR(255),
    `like` BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS `friend_requests` (
    `fr_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `sender_id` INT NOT NULL,
    `reciever_id` INT NOT NULL,
    `message` VARCHAR(255),
    `timestamp` DATETIME,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (reciever_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS `intrigued_manga_translations` (
    `imt_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `manga_id` VARCHAR(255),
    `chapter_id` VARCHAR(255),
    `manga_name` VARCHAR(255),
    `translated_language` VARCHAR(8),
    `chapter` FLOAT,
    `followers` INT
);

CREATE TABLE IF NOT EXISTS `imt_subscribers` (
    `imts_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `imt_id` INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (imt_id) REFERENCES intrigued_manga_translations(imt_id)
);


//Inserts
//USER
INSERT INTO `users`(`email`, `password`, `nickname`, `role`, `confirmed`, `registered`, `last_login`)
VALUES ("davidkah20@gmail.com","Nothing","Kindpex","admin",1,'2021-10-31 08:34:00','2021-10-31 08:34:00')

INSERT INTO `users`(`email`, `password`, `nickname`, `role`, `confirmed`, `registered`, `last_login`)
VALUES ("kavicskah20@gmail.com","Nothing","Debiddo","user",1,current_timestamp(),current_timestamp())

//Detail types
INSERT INTO `detail_types`(`type_name`) 
VALUES ("About me"),
("Liked Manga"),
("Disliked Manga"),
("Friends")

//User Details
INSERT INTO `user_details`(`user_id`, `dt_id`, `value`) VALUES (1,1,"Hi I'm the creator of this site, enjoy"),
(1,2,"Mairimashita Iruma Kun"),
(1,2,"Gate"),
(1,2,"Mushoku Tensei"),
(1,3,"Dummy Value"),
(1,3,"Dummy Value3")

//Thread
INSERT INTO `threads`(`user_id`, `title`, `text`, `created`) VALUES (1,"This is tittle","This is the text question","2021-10-31 09:06:30")

//Ratings
INSERT INTO `ratings`(`user_id`, `manga_name`, `manga_id`, `score`, `timestamp`) VALUES (1,"Mairimashita! Iruma-kun","d7037b2a-874a-4360-8a7b-07f2899152fd",10,"2021-10-31 09:06:30")

//Lists
INSERT INTO `lists`(`user_id`, `list_name`, `created`, `visibility`) VALUES (1,"My private list","2021-10-31 09:09:30","private"),
(1,"My public list","2021-10-31 09:09:30","public"),
(1,"My friends list","2021-10-31 09:09:30","friends")

//List data
INSERT INTO `lists_data`(`user_id`, `list_id`, `manga_name`, `manga_id`) VALUES (1,4,"Mairimashita! Iruma-kun","d7037b2a-874a-4360-8a7b-07f2899152fd")

//comments
INSERT INTO `comments`(`user_id`, `target_id`, `comment`, `timestamp`) VALUES (1,"d7037b2a-874a-4360-8a7b-07f2899152fd","Yeah this is a good maga",current_timestamp()),
(1,"1","Interesting thread",current_timestamp()),
(2,"1","Indeed",current_timestamp()),
(1,"f98a8318-5217-4fc8-885a-8e0913d8af59","Best chapter IMO",current_timestamp()),
(2,"f98a8318-5217-4fc8-885a-8e0913d8af59","True that",current_timestamp())

//friend request
INSERT INTO `friend_requests`(`sender_id`, `reciever_id`, `message`, `timestamp`) VALUES (2,1,"Yo, accept it",current_timestamp())

//Likes
INSERT INTO `likes`(`user_id`, `target_id`, `like`) VALUES (1,"1",1),(1,"2",1),(1,"5",1),(2,"1",1),(2,"2",1),(2,"5",1)

DELIMITER //

CREATE PROCEDURE simpleproc (IN in_cId INT, IN in_state INT)
BEGIN
	DECLARE clikes INT;
	START TRANSACTION;
	SELECT likes INTO clikes FROM `comments` WHERE comment_id=in_cId;
	UPDATE `comments` SET likes=(clikes+1) WHERE comment_id=in_cId;
	COMMIT;
END;
//

DELIMITER ;

1 = increase like
2 = decrease like
3 = increase dislike
4 = decrease dislike

--COMMENT MANAGER
DELIMITER //

CREATE PROCEDURE sp_manage_likes (IN in_cId INT, IN in_state VARCHAR(11), OUT Q_STATUS INT)
BEGIN
	DECLARE clikes INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SHOW ERRORS;
        SET Q_STATUS= 0;
        ROLLBACK;
    END;

    SET Q_STATUS = 3;
    
    CASE in_state
    	WHEN 'INC_LIKE' THEN
        	START TRANSACTION;
            SELECT likes INTO clikes FROM `comments` WHERE comment_id=in_cId;
            UPDATE `comments` SET likes=(clikes+1) WHERE comment_id=in_cId;
            SET Q_STATUS = 1;
            COMMIT;
    	WHEN 'DEC_LIKE' THEN
        	START TRANSACTION;
            SELECT likes INTO clikes FROM `comments` WHERE comment_id=in_cId;
            IF clikes = 0 THEN
            	SET Q_STATUS = 2;
            ELSE
                UPDATE `comments` SET likes=(clikes-1) WHERE comment_id=in_cId;
                SET Q_STATUS = 1;
            END IF;
            COMMIT;
    	WHEN 'INC_DISLIKE' THEN
        	START TRANSACTION;
            SELECT dislikes INTO clikes FROM `comments` WHERE comment_id=in_cId;
            UPDATE `comments` SET dislikes=(clikes+1) WHERE comment_id=in_cId;
            SET Q_STATUS = 1;
            COMMIT;
    	WHEN 'DEC_DISLIKE' THEN
        	START TRANSACTION;
            SELECT dislikes INTO clikes FROM `comments` WHERE comment_id=in_cId;
            IF clikes = 0 THEN
            	SET Q_STATUS = 2;
            ELSE
            	UPDATE `comments` SET dislikes=(clikes-1) WHERE comment_id=in_cId;
            	SET Q_STATUS = 1;
            END IF;
            COMMIT;
	END CASE;
    
END;
//

DELIMITER ;

-- THREAD LIKE MANAGER

DELIMITER //

CREATE PROCEDURE sp_manage_likes_thread (IN in_tId VARCHAR(255), IN in_state VARCHAR(11), OUT Q_STATUS INT)
BEGIN
	DECLARE tlikes INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SHOW ERRORS;
        SET Q_STATUS= 0;
        ROLLBACK;
    END;

    SET Q_STATUS = 3;
    
    CASE in_state
    	WHEN 'INC_LIKE' THEN
        	START TRANSACTION;
            SELECT likes INTO tlikes FROM `threads` WHERE thread_id=in_tId;
            UPDATE `threads` SET likes=(tlikes+1) WHERE thread_id=in_tId;
            SET Q_STATUS = 1;
            COMMIT;
    	WHEN 'DEC_LIKE' THEN
        	START TRANSACTION;
            SELECT likes INTO tlikes FROM `threads` WHERE thread_id=in_tId;
            IF tlikes = 0 THEN
            	SET Q_STATUS = 2;
            ELSE
                UPDATE `threads` SET likes=(tlikes-1) WHERE thread_id=in_tId;
                SET Q_STATUS = 1;
            END IF;
            COMMIT;
    	WHEN 'INC_DISLIKE' THEN
        	START TRANSACTION;
            SELECT dislikes INTO tlikes FROM `threads` WHERE thread_id=in_tId;
            UPDATE `threads` SET dislikes=(tlikes+1) WHERE thread_id=in_tId;
            SET Q_STATUS = 1;
            COMMIT;
    	WHEN 'DEC_DISLIKE' THEN
        	START TRANSACTION;
            SELECT dislikes INTO tlikes FROM `threads` WHERE thread_id=in_tId;
            IF tlikes = 0 THEN
            	SET Q_STATUS = 2;
            ELSE
            	UPDATE `threads` SET dislikes=(tlikes-1) WHERE thread_id=in_tId;
            	SET Q_STATUS = 1;
            END IF;
            COMMIT;
	END CASE;
    
END;
//

DELIMITER ;

//Manage manga subscribers

DELIMITER //

CREATE PROCEDURE sp_manage_manga_subscribers (IN in_imt_id INT, IN in_state VARCHAR(3), OUT Q_STATUS INT)
BEGIN
	DECLARE temp_followers INT;
    DECLARE temp_followers_count INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SHOW ERRORS;
        SET Q_STATUS= 0;
        ROLLBACK;
    END;

    SET Q_STATUS = 3;
    SELECT followers INTO temp_followers_count FROM `intrigued_manga_translations` WHERE imt_id = in_imt_id ;
    CASE in_state
    	WHEN 'INC' THEN
        	START TRANSACTION;
            UPDATE `intrigued_manga_translations` SET followers = (temp_followers_count + 1) WHERE imt_id = in_imt_id ;
            SET Q_STATUS = 1;
            COMMIT;
    	WHEN 'DEC' THEN
        	START TRANSACTION;
            UPDATE `intrigued_manga_translations` SET followers = (temp_followers_count - 1) WHERE imt_id = in_imt_id ;
            SELECT followers INTO temp_followers FROM `intrigued_manga_translations` WHERE imt_id = in_imt_id ;
            IF temp_followers = 0 THEN
            	DELETE FROM `intrigued_manga_translations` WHERE imt_id = in_imt_id ;
            	SET Q_STATUS = 2;
            ELSE
                SET Q_STATUS = 1;
            END IF;
            COMMIT;
	END CASE;
    
END;
//

DELIMITER ;

query_str = "CALL sp_whatever(?,?,?,@output); select @output";
 con.query(query_str, [param1, param2, param3], function(err,rows){
     if(err) throw err;
     console.log(rows);
 });