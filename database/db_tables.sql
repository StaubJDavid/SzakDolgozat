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

CREATE TABLE IF NOT EXISTS `messages` (
    `message_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `sender_id` INT NOT NULL,
    `reciever_id` INT NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `timestamp` DATETIME,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (reciever_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS `friend_list` (
    `fr_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `friend_id` INT NOT NULL,
    `message_id` INT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (friend_id) REFERENCES users(user_id),
    FOREIGN KEY (message_id) REFERENCES messages(message_id)
);

INSERT INTO `detail_types` (`type_name`) VALUES ("About me"), ("Liked Manga"), ("Disliked Manga");

DELIMITER $$
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
    
END$$
DELIMITER ;

DELIMITER $$
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
    
END$$
DELIMITER ;

DELIMITER $$
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
    
END$$
DELIMITER ;