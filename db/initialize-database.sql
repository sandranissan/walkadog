CREATE TABLE IF NOT EXISTS users(
    userId INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(30),
    userEmail VARCHAR(50),
    userPassword VARCHAR(100),
    isAdmin BOOLEAN

);

CREATE TABLE IF NOT EXISTS adverts(
    advertId INT AUTO_INCREMENT PRIMARY KEY,
    advertName VARCHAR(100),
    advertDescription VARCHAR(100),
    contact VARCHAR(50),
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(userId) 
);


CREATE TABLE IF NOT EXISTS photos(
    photoId INT AUTO_INCREMENT PRIMARY KEY,
    nameOfFile VARCHAR(100),
    advert INT,
    FOREIGN KEY (advert) REFERENCES adverts(advertId) ON DELETE CASCADE,
    photoDescription VARCHAR(100) 
);



INSERT INTO users (userName, userEmail, userPassword, isAdmin) VALUES ("aljona", "aljona@aljona", "aljona",1);
INSERT INTO users (userName, userEmail, userPassword, isAdmin) VALUES ("sandra", "sandra@sandra", "sandra",1);
INSERT INTO users (userName, userEmail, userPassword, isAdmin) VALUES ("sebbe", "sebbe@sandra", "sebbe",0);


