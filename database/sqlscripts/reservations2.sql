-- Création d’un utilisateur factice
INSERT INTO users (id, mail, password, salt) VALUES
(1, 'test@happycolours.ch', 'hashed_pw', 'random_salt')
ON DUPLICATE KEY UPDATE mail = VALUES(mail);

-- Réservations du 10 au 13 octobre 2025
INSERT INTO reservations (date_, debut, nbrPerson, dateReservationWeb, formule_id, user_id) VALUES
-- 10 octobre
('2025-10-10','09:00:00', 2, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-10','11:00:00', 4, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-10','14:00:00', 1, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-10','16:00:00', 3, CURDATE(), FLOOR(1 + RAND()*5), 1),

-- 11 octobre
('2025-10-11','09:00:00', 5, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-11','11:00:00', 2, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-11','14:00:00', 4, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-11','16:00:00', 1, CURDATE(), FLOOR(1 + RAND()*5), 1),

-- 12 octobre
('2025-10-12','09:00:00', 3, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-12','11:00:00', 1, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-12','14:00:00', 5, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-12','16:00:00', 2, CURDATE(), FLOOR(1 + RAND()*5), 1),

-- 13 octobre
('2025-10-13','09:00:00', 2, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-13','11:00:00', 4, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-13','14:00:00', 3, CURDATE(), FLOOR(1 + RAND()*5), 1),
('2025-10-13','16:00:00', 1, CURDATE(), FLOOR(1 + RAND()*5), 1);
ss