CREATE TABLE IF NOT EXISTS adverts(
    advertId INT AUTO_INCREMENT PRIMARY KEY,
    advertName VARCHAR(100),
    advertDescription VARCHAR(100),
    contact VARCHAR(30)
);


CREATE TABLE IF NOT EXISTS photos(
    photoId INT AUTO_INCREMENT PRIMARY KEY,
    nameoFile VARCHAR(100),
    advert INT,
    FOREIGN KEY (advert) REFERENCES adverts(advertId),
    photoDescription VARCHAR(100) 
);

CREATE TABLE IF NOT EXISTS users(
    userId INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(30),
    userEmail VARCHAR(50),
    userPassword VARCHAR(50)

);
