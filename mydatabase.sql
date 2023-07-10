
CREATE DATABASE IF NOT EXISTS image_db;
use image_db;
CREATE TABLE `binddata`
(
    `id`   INT NOT NULL AUTO_INCREMENT,
    `data` BLOB,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
