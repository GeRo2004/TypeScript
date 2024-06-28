create database if not exists veterinary;

use veterinary;

create user if not exists dsw@'%' identified by 'dsw';
grant select, update, insert, delete on veterinary.* to dsw@'%';


create table if not exists `veterinary`.`observations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `dificultyLevel` INT UNSIGNED NULL,
  `materialsUsed` INT UNSIGNED NULL,
  `description` VARCHAR(255) NULL,
  `datePerformed` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));

insert into veterinary.observations values(001,'Leg cast',3,4,'Leg broken in 2 places','27/06/2024');
