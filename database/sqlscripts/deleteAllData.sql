-- Vider proprement toutes les tables de la base `colours`
-- sans se heurter aux FKs (DELETE au lieu de TRUNCATE).

SET FOREIGN_KEY_CHECKS = 0;

-- Tables d'association / enfants (si elles existent chez toi)
-- La table ReservationSalle est mentionnée dans ton seed, mais pas dans ton DDL.
-- Si tu l’as créée, décommente la ligne suivante :
-- DELETE FROM ReservationSalle;

DELETE FROM appartenir;     -- FKs: salles, joursFermes
DELETE FROM etre;           -- FKs: salles, formules
DELETE FROM reservations;   -- FKs: formules, users
DELETE FROM tranche_prix;   -- FK : formules
DELETE FROM salles;         -- FK : lieux
DELETE FROM joursFermes;
DELETE FROM questions;
DELETE FROM formules;
DELETE FROM lieux;
DELETE FROM users;

-- Remettre les auto-incréments à 1 (optionnel)
ALTER TABLE appartenir      AUTO_INCREMENT = 1;
ALTER TABLE etre            AUTO_INCREMENT = 1;
ALTER TABLE reservations    AUTO_INCREMENT = 1;
ALTER TABLE tranche_prix    AUTO_INCREMENT = 1;
ALTER TABLE salles          AUTO_INCREMENT = 1;
ALTER TABLE joursFermes     AUTO_INCREMENT = 1;
ALTER TABLE questions       AUTO_INCREMENT = 1;
ALTER TABLE formules        AUTO_INCREMENT = 1;
ALTER TABLE lieux           AUTO_INCREMENT = 1;
ALTER TABLE users           AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;
