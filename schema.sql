create database shopping;

create table useraccounts
(id int not null auto_increment,
 user_id char(6) not null,
 user_name varchar(30) not null,
  password varchar(6) not null,
  time_created timestamp default current_timestamp,
 primary key(id));
 
 create table memberaccounts
 (id int not null auto_increment,
member_id char(4) not null,
member_name varchar(30) not null,
user_id char(6) not null,
password varchar(4) not null,
time_created timestamp default current_timestamp,
primary key(id),
foreign key (user_id) references useraccounts(id));


 
  