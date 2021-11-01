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
    `thread_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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