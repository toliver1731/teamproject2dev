### Schema

CREATE DATABASE lists_db;

USE lists_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	user_name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE Table items
(
	id int NOT NULL AUTO_INCREMENT,
	item_name varchar(100) NOT NULL,
	item_brand varchar(30) NOT NULL,
	item_color varchar(30) NOT NULL,
	PRIMARY KEY(id)
);