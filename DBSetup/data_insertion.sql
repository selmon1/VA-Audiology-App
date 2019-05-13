\c va_trial

insert into Patient values
(00001, FALSE,'Bar', 'Movshovich', 'movshov@pdx.edu', 'Were no strangers to love You know the rules and so do I A full commitment what Im thinking of You wouldnt get this from any other guy'), 
(00002, TRUE, 'Elijah', 'Rich-Wimmer', 'elij2@pdx.edu', 'Sweet dreams are made of this Who am I to disagree? I travel the world And the seven seas, Everybodys looking for something.'),
(00003, FALSE, 'Dominic', 'Lastname', 'fakeemail@pdx.edu', 'Its early morning, the sun comes out Last night was shaking and pretty loud My cat is purring, it scratches my skin So what is wrong with another sin?'),
(00004, TRUE, 'Liam', 'Wynn', 'wynnliam@pdx.edu', 'Sometimes I feel Ive got to Run away Ive got to Get away from the pain that you drive into the heart of me The love we share Seems to go nowhere And Ive lost my light For I toss and turn I cant sleep at night'),
(00005, FALSE, 'Griffin', 'Dor', 'harrypotter@gmail.com', 'Woah, were half way there Woah, livin on a prayer Take my hand, well make it I swear Woah, livin on a prayer'),
(00006, FALSE, 'Mishal', 'Alajmi', 'mialajmi@pdx.edu', 'Layla, youve got me on my knees. Layla, Im begging, darling please. Layla, darling wont you ease my worried mind.'),
(00007, TRUE, 'Dante', 'inferno', 'devilmaycry@gmail.com', 'Oh, Momma, Im in fear for my life from the long arm of the law. Lawman has put an end to my runnin, and Im so far from my home. Oh, Momma, I can hear you a cryin; youre so scared and all alone. Hangman is comin down from the gallows, and I dont have very long.');

insert into SessionKeys values
('0', 00001, 1556100000, 1556200000),
('1', 00002, 1556000000, 1557000000),
('2', 00003, 1558000000, 1559000000),
('3', 00004, 1559000000, 1560000000),
('4', 00005, 1560000000, 1561000000),
('cafebabe', 00006, 1562000000, 1563000000),
('1122334455667788', 00007, 1564000000, 1565000000);

insert into tfiSurvey values
(10000, 00001, 0, 2, 3, 5, 3, 5, 1, 4, 7),
(20000, 00002, 1, 9, 8, 9, 3, 4, 3, 4, 8),
(30000, 00003, 0, 1, 5, 3, 2, 5, 0, 1, 5),
(40000, 00004, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(50000, 00005, 0, 8, 3, 4, 5, 6, 1, 2, 6), (60000, 00006, 1, 2, 3, 4, 5, 6, 7, 8, 9),
(70000, 00007, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(80000, 00001, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(90000, 00002, 3, 4, 2, 1, 9, 4, 0, 0, 1),
(100000, 00003, 5, 6, 7, 8, 9, 1, 3, 4, 5),
(110000, 00003, 3, 4, 3, 2, 1, 3, 9, 2, 4);

insert into thsSurvey values
(10000, 00001, 0, 4, 3, 'example'),
(20000, 00002, 1, 5, 8, 'example'),
(30000, 00003, 0, 1, 2, 'example'),
(40000, 00004, 8, 7, 3, 'example'),
(50000, 00005, 4, 1, 2, 'example'),
(60000, 00006, 7, 7, 6, 'example'),
(70000, 00007, 8, 3, 1, 'example'),
(80000, 00001, 3, 4, 1, 'example'),
(90000, 00002, 6, 9, 5, 'example'),
(100000, 00003, 8, 8, 8, 'example'),
(110000, 00003, 4, 3, 1, 'example');

insert into tsSurvey values
(10000, 00001, 'TYPE A'),
(20000, 00002, 'TYPE B'),
(30000, 00003, 'TYPE A'),
(40000, 00004, 'TYPE B'),
(50000, 00005, 'TYPE C'),
(60000, 00006, 'TYPE A'),
(70000, 00007, 'TYPE C'),
(80000, 00001, 'TYPE A'), 
(90000, 00002, 'TYPE B'),
(100000, 00003, 'TYPE A'),
(110000, 00003, 'TYPE A');

insert into Authority values
(111, 'Audio1', '$2b$12$DYhr7TOVcajggMkNIj59YOCQflxKRWpVDeNXJKusNEJk9FN2G6Dl6', 'John (password1)', 0),
(222, 'Audio2', '$2b$12$y8NXh.6bdGYzoH0R4QSqPupWed29lxxJ4etdas8Ecl2eoYRgy1pRy', 'Jim (password2)', 0),
(333, 'Audio3', '$2b$12$1i4LYl4aKBXCnrV1mtZ2Suw1Xnk6gId0TfFOapCO.5yMsGxQ1s3Au', 'Jimmy (password3)', 0),
(444, 'Stat', '$2b$12$iAq0Y1m7sxjn52wVm45omeAyselFqK7KHpQ52HBi3l2ZV7JurDbDW', 'Emily (qwertyuiop)', 1),
(555, 'Audio4', '$2b$12$CnUTwCaYtQFkNboPDHb4d.fIwVZeAICqoca8lxIKYcwwPd4/gQAFq', 'Jill (password4)', 0),
(666, 'Admin', '$2b$12$g/slSWxU4kvytubcT3ZEWuo5uIrdKyEnhB6HI6n7atCc/Yz8yq8GO', 'Satan (Master)', 2),
(777, 'Audio5', '$2b$12$MTADOtwldX8YedHCMi4qpOY.KWibqgZMW2VcAG9eaiWCdkqz9x7g2', 'Janet (password5)', 0);

insert into AudiologistExams values
(1, 00001, 'Conductive Hearing Loss, Bilateral', 'Normal', 'Moderate', 'Normal', 'Normal', 'Moderate', 'Symmetric', 'Symmetric', 'Rising', 'Symmetric', 'Sensorineural'),
(2, 00002, 'Conductive Hearing Loss', 'Unilateral Right', 'Normal, Severe', 'Moderate', 'Normal', 'Moderate/Severe', 'Flat', 'Flat', 'Flat', 'Asymmetric', 'Sensorineural'),
(3, 00003, 'Conductive Hearing Loss', 'Unilateral Left', 'Normal', 'Normal', 'Severe', 'Normal', 'Normal, Corner', 'Rising', 'Flat', 'Symmetric', 'Mixed'),
(4, 00004, 'Conductive Hearing Loss', 'Bilateral', 'Normal', 'Profound, Profound', 'Moderate', 'Profound', 'Cookie Bite', 'Rising', 'Symmetric', 'Progressive', 'Conductive'), 
(5, 00005, 'Conductive Hearing Loss', 'Unilateral Left, Not Normal', 'Moderate', 'Moderate', 'Moderate', 'Moderate', 'Noise-Notch', 'Cookie Bite', 'Corner', 'Sudden', 'Sensorineural'), 
(6, 00006, ' Conductive Hearing Loss', 'Unilateral Right', 'Normal', 'Moderate/Severe', 'Severe', 'Normal', 'Normal', 'Percipitous', 'Sudden, Sudden', 'Sudden', 'Condcutive'), 
(7, 00007, 'Conductive Hearing Loss', 'Bilateral', 'Normal', 'Normal', 'Normal', 'Moderate', 'Severe', 'Progressive, Progressive', 'Asymmetrical', 'Asymmetrical', 'Mixed'),
(8, 00001, 'Conductive Hearing Loss, Bilateral', 'Normal', 'Moderate', 'Normal', 'Normal', 'Moderate', 'Symmetric', 'Symmetric', 'Rising', 'Symmetric', 'Sensorineural'),
(9, 00002, 'Conductive Hearing Loss', 'Unilateral Right', 'Normal, Severe', 'Moderate', 'Normal', 'Moderate/Severe', 'Flat', 'Flat', 'Flat', 'Asymmetric', 'Sensorineural'),
(10, 00003, 'Conductive Hearing Loss', 'Unilateral Left', 'Normal', 'Normal', 'Severe', 'Normal', 'Normal, Corner', 'Rising', 'Flat', 'Symmetric', 'Mixed'),
(11, 00003, 'Conductive Hearing Loss', 'Unilateral Left', 'Normal', 'Normal', 'Severe', 'Normal', 'Normal, Corner', 'Rising', 'Flat', 'Symmetric', 'Mixed');

insert into Appointments values
(001, 111, 00001, 10000, 10000, 10000, 1, '2019-04-10 10:13:54+02'),
(002, 222, 00002, 20000, 20000, 20000, 2, '2019-04-12 11:23:24+02'),
(003, 333, 00003, 30000, 30000, 30000, 3, '2019-04-17 17:08:15+02'),
(004, 444, 00004, 40000, 40000, 40000, 4, '2019-04-19 08:01:05+02'),
(005, 555, 00005, 50000, 50000, 50000, 5, '2019-04-20 10:23:54+02'),
(006, 666, 00006, 60000, 60000, 60000, 6, '2019-04-22 13:55:40+02'),
(007, 777, 00007, 70000, 70000, 70000, 7, '2019-04-24 16:44:34+02'),
(008, 111, 00001, 80000, 80000, 80000, 8, '2019-04-30 09:12:34+02'),
(009, 222, 00002, 90000, 90000, 90000, 9, '2019-05-01 14:11:01+02'),
(010, 333, 00003, 100000, 100000, 100000, 10, '2019-05-01 15:04:50+02'),
(011, 333, 00003, 110000, 110000, 110000, 11, '2019-05-02 12:08:22+02');

