CREATE TABLE users(
   id INT AUTO_INCREMENT,
   mail VARCHAR(320),
   password VARCHAR(100),
   salt VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE lieux(
   id INT AUTO_INCREMENT,
   nom VARCHAR(50),
   adresse VARCHAR(50),
   NPA INT,
   localite VARCHAR(50),
   latitude DECIMAL(12,6),
   longitude DECIMAL(12,6),
   PRIMARY KEY(id)
);

CREATE TABLE salles(
   id INT AUTO_INCREMENT,
   nom VARCHAR(50),
   capacite TINYINT,
   lieu_id INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(lieu_id) REFERENCES lieux(id)
);

CREATE TABLE joursFermes(
   id INT AUTO_INCREMENT,
   date_ DATE NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE formules(
   id INT AUTO_INCREMENT,
   title VARCHAR(50),
   description VARCHAR(150),
   image VARCHAR(100),
   color VARCHAR(50),
   icon VARCHAR(50),
   duree SMALLINT,
   PRIMARY KEY(id)
);

CREATE TABLE tranche_prix(
   id INT,
   prix DECIMAL(10,2),
   minPersonnes TINYINT,
   maxPersonnes TINYINT,
   formule_id INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(formule_id) REFERENCES formules(id)
);

CREATE TABLE questions(
   id INT AUTO_INCREMENT,
   question VARCHAR(1023),
   reponse VARCHAR(2047),
   PRIMARY KEY(id)
);

CREATE TABLE reservations(
   id INT AUTO_INCREMENT,
   date_ DATE,
   debut TIME,
   nbrPerson TINYINT,
   dateReservationWeb DATE,
   formule_id INT NOT NULL,
   user_id INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(formule_id) REFERENCES formules(id),
   FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE appartenir(
   salle_id INT,
   jourFerme_id INT,
   PRIMARY KEY(salle_id, jourFerme_id),
   FOREIGN KEY(salle_id) REFERENCES salles(id),
   FOREIGN KEY(jourFerme_id) REFERENCES joursFermes(id)
);

CREATE TABLE etre(
   salle_id INT,
   formule_id INT,
   PRIMARY KEY(salle_id, formule_id),
   FOREIGN KEY(salle_id) REFERENCES salles(id),
   FOREIGN KEY(formule_id) REFERENCES formules(id)
);
