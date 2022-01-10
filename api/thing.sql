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
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS `threads` (
    `thread_id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `user_id` INT NOT NULL,
    `title` VARCHAR(255),
    `text` VARCHAR(255),
    `created` DATETIME,
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