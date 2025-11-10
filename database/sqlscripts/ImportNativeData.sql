START TRANSACTION;

INSERT INTO lieux (id, nom, adresse, NPA, localite, latitude, longitude) VALUES
(1, 'Bern - Zentweg 27', 'Zentweg 27', 3006, 'Bern', 46.95525699188261, 7.476678589949091);


INSERT INTO salles (id ,nom, capacite, lieu_id) VALUES
(1,'Box 1 (tres grande)', 40, 1),
(2,'Box 2 (grande)', 15, 1),
(3,'Box 3 fluo', 12, 1),
(4,'Salle spéciale', 40, 1);

-- Ajout des formules
INSERT INTO formules (id, titleFR, titleDE, titleEN, descriptionFR, descriptionDE, descriptionEN, image, color, icon, duree) VALUES
(1, 'Team building', 'Team Building', 'Team Building',
    '3 box activities (3x30min + apéro 30min). 1 toile 150x100 cm pour 5 pers. Max 60. 3 activités, verre inclus.',
    '3 Box-Aktivitäten (3x30min + Apéro 30min). 1 Leinwand 150x100 cm für 5 Pers. Max 60. 3 Aktivitäten, Getränk inklusive.',
    '3 box activities (3x30min + aperitif 30min). 1 canvas 150x100 cm for 5 people. Max 60. 3 activities, drink included.',
    'images/teambuilding.jpg', '#FFD54F', 'group', 120),

(2, 'Anniversaire', 'Geburtstag', 'Birthday',
    '1 box + salle sirop. Toile 50x60 cm par pers. Max 40. 45min + 30min apéro, sirop offert.',
    '1 Box + Raum mit Sirup. Leinwand 50x60 cm pro Pers. Max 40. 45min + 30min Apéro, Sirup gratis.',
    '1 box + room with syrup. Canvas 50x60 cm per person. Max 40. 45min + 30min aperitif, syrup offered.',
    'images/anni.jpg', '#FF8A80', 'cake', 75),

(3, 'Fun / Family 45min', 'Spaß / Familie 45min', 'Fun / Family 45min',
    'Box 45min. Toile 150x100 cm pour 5 pers. Tarifs selon taille du groupe.',
    'Box 45min. Leinwand 150x100 cm für 5 Pers. Preise je nach Gruppengröße.',
    'Box 45min. Canvas 150x100 cm for 5 people. Rates according to group size.',
    'images/family45.jpg', '#81D4FA', 'family', 45),

(4, 'Fun / Family 60min', 'Spaß / Familie 60min', 'Fun / Family 60min',
    'Box 60min. Toile 150x100 cm pour 5 pers. Tarifs selon taille du groupe.',
    'Box 60min. Leinwand 150x100 cm für 5 Pers. Preise je nach Gruppengröße.',
    'Box 60min. Canvas 150x100 cm for 5 people. Rates according to group size.',
    'images/family60.jpg', '#4FC3F7', 'family', 60),

(5, 'Fluo Night 60min', 'Fluo Night 60min', 'Fluo Night 60min',
    'Box fluo 60min. Toile 100x150 cm toutes les 5 pers. Ambiance fluo.',
    'Fluo Box 60min. Leinwand 100x150 cm alle 5 Pers. Fluo-Atmosphäre.',
    'Fluo box 60min. Canvas 100x150 cm every 5 people. Fluorescent atmosphere.',
    'images/fluo.png', '#CE93D8', 'flash', 60);

-- Ajout des tranches de prix (id unique, prix en CHF)
-- Team building (id_1 = 1)
INSERT INTO tranche_prix (id, prix, minPersonnes, maxPersonnes, formule_id) VALUES
(1, 120.00, 6, 20, 1),
(2, 100.00, 21, 60, 1);

-- Anniversaire (id_1 = 2)
INSERT INTO tranche_prix (id, prix, minPersonnes, maxPersonnes, formule_id) VALUES
(3, 60.00, 1, 5, 2),
(4, 50.00, 6, 40, 2);

-- Fun / Family 45min (id_1 = 3)
INSERT INTO tranche_prix (id, prix, minPersonnes, maxPersonnes, formule_id) VALUES
(5, 100.00, 1, 1, 3),
(6, 70.00, 2, 2, 3),
(7, 50.00, 3, 4, 3),
(17, 40.00, 5,5,3),
(8, 45.00, 6, 40, 3),
(19, 40.00, 11, 20, 3),
(20, 35.00, 21, 40, 3);


-- Fun / Family 60min (id_1 = 4)
INSERT INTO tranche_prix (id, prix, minPersonnes, maxPersonnes, formule_id) VALUES
(9, 120.00, 1, 1, 4),
(10, 80.00, 2, 2, 4),
(11, 60.00, 3, 4, 4),
(18, 50.00, 5,5, 4),
(12, 55.00, 6, 10, 4),
(21, 50.00, 11, 20, 4),
(22, 45.00, 21, 40, 4);

-- Fluo Night 60min (id_1 = 5)
INSERT INTO tranche_prix (id, prix, minPersonnes, maxPersonnes, formule_id) VALUES
(13, 120.00, 1, 1, 5),
(14, 100.00, 2, 2, 5),
(15, 80.00, 3, 5, 5),
(16, 60.00, 6, 12, 5);


INSERT INTO etre (salle_id, formule_id) VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(1,2),
(2,2),
(4,2),
(1,3),
(2,3),
(1,4),
(2,4),
(3,5);

COMMIT;
