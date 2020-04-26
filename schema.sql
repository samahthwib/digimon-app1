DROP TABLE IF EXISTS myDigimon;

CREATE TABLE myDigimon(
id SERIAL PRIMARY KEY,
name varchar(255),
img varchar(255),
level varchar(255)
);

INSERT INTO myDigimon (name,img,level) VALUES ('samah','not found' ,'training');
