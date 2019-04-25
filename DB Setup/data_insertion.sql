
\c va_trial

insert into SessionKeys values
	(0, 00001, '6:00AM', '6:30AM'),
	(1, 00002, '7:00AM', '7:30AM'), (2, 00003, '8:00AM', '8:30AM'),
	(3, 00004, '9:00AM', '9:30AM'),
	(4, 00005, '10:00AM', '10:30AM'),
	(5, 00006, '11:00AM', '11:30AM'),
	(6, 00007, '12:00PM', '12:30PM');

insert into tfiSurvey values
	(10000, TRUE,  00001, 'June 1, 2019', '6:30AM', 0, 2, 3, 5, 3, 5, 1, 4, 7),
	(20000, TRUE, 00002, 'June 2, 2019', '7:30AM', 1, 9, 8, 9, 3, 4, 3, 4, 8),
	(30000, TRUE, 00003, 'June 3, 2019', '8:30AM', 0, 1, 5, 3, 2, 5, 0, 1, 5),
	(40000, FALSE, 00004, 'June 4, 2019', '9:30AM', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(50000, TRUE, 00005, 'June 5, 2019', '10:30AM', 0, 8, 3, 4, 5, 6, 1, 2, 6),
	(60000, TRUE, 00006, 'June 6, 2019', '11:30AM', 1, 2, 3, 4, 5, 6, 7, 8, 9),
	(70000, FALSE, 00007, 'June 7, 2019', '12:30PM', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

insert into thsSurvey values
	(10000, 00001, 'June 1, 2019', '6:30AM', 0, 4, 3, 'example'),
	(20000, 00002, 'June 2, 2019', '7:30AM', 1, 5, 8, 'example'),
	(30000, 00003, 'June 3, 2019', '8:30AM', 0, 1, 2, 'example'),
	(40000, 00004, 'June 4, 2019', '9:30AM', 8, 7, 3, 'example'),
	(50000, 00005, 'June 5, 2019', '10:30AM', 4, 1, 2, 'example'),
	(60000, 00006, 'June 6, 2019', '11:30AM', 7, 7, 6, 'example'),
	(70000, 00007, 'June 7, 2019', '12:30AM', 8, 3, 1, 'example');

insert into tsSurvey values
        (10000, 00001, 'June 1, 2019', '6:30AM', 'TYPE A'),
	(20000, 00002, 'June 2, 2019', '7:30AM', 'TYPE B'),
	(30000, 00003, 'June 3, 2019', '8:30AM', 'TYPE A'),
	(40000, 00004, 'June 4, 2019', '9:30AM', 'TYPE B'),
	(50000, 00005, 'June 5, 2019', '10:30AM', 'TYPE C'),
	(60000, 00006, 'June 6, 2019', '11:30AM', 'TYPE A'),
	(70000, 00007, 'June 7, 2019', '12:30AM', 'TYPE C');

insert into Patient values
        (00001, FALSE, 'Bar'),
	(00002, FALSE, 'Elijah'),
	(00003, FALSE, 'Dominic'),
	(00004, TRUE, 'Liam'),
	(00005, FALSE, 'Griffin'),
	(00006, FALSE, 'Mishal'),
	(00007, TRUE, 'Dante');

insert into Authority values
        (111, 'Audio1', 'password1', 'John', 'Audiologist'),
	(222, 'Audio2', 'password2', 'Jim', 'Audiologist'),
	(333, 'Audio3', 'password3', 'Jimmy', 'Audiologist'),
	(444, 'Stat', 'qwertyuiop', 'Emily', 'Statitician'),
	(555, 'Audio4', 'password4', 'Jill', 'Audiologist'),
	(666, 'Admin', 'Master', 'Satan', 'Administrator'),
	(777, 'Audio5', 'password5', 'Janet', 'Audiologist');

insert into Notes values
        (1, 111, 'Were no strangers to love You know the rules and so do I A full commitment what Im thinking of You wouldnt get this from any other guy'),
	(2, 222, 'Sweet dreams are made of this Who am I to disagree? I travel the world And the seven seas, Everybodys looking for something.'),
	(3, 333, 'Its early morning, the sun comes out Last night was shaking and pretty loud My cat is purring, it scratches my skin So what is wrong with another sin?'),
	(4, 444, 'Sometimes I feel Ive got to Run away Ive got to Get away from the pain that you drive into the heart of me The love we share Seems to go nowhere And Ive lost my light For I toss and turn I cant sleep at night'),
	(5, 555, 'Woah, were half way there Woah, livin on a prayer Take my hand, well make it I swear Woah, livin on a prayer'),
	(6, 666, 'Layla, youve got me on my knees. Layla, Im begging, darling please. Layla, darling wont you ease my worried mind.'),
	(7, 777, 'Oh, Momma, Im in fear for my life from the long arm of the law. Lawman has put an end to my runnin, and Im so far from my home. Oh, Momma, I can hear you a cryin; youre so scared and all alone. Hangman is comin down from the gallows, and I dont have very long.');

insert into AudiologistExams values
        (1, 'Conductive Hearing Loss, Bilateral', 'Normal', 'Moderate', 'Normal', 'Normal', 'Moderate', 'Symmetric', 'Symmetric', 'Rising', 'Symmetric', 'Sensorineural'),
	(2, 'Conductive Hearing Loss, Unilateral Right', 'Normal', 'Severe', 'Moderate', 'Normal', 'Moderate/Severe', 'Flat', 'Flat', 'Flat', 'Asymmetric', 'Sensorineural'),
	(3, 'Conductive Hearing Loss, Unilateral Left', 'Normal', 'Normal', 'Severe', 'Normal', 'Normal', 'Corner', 'Rising', 'Flat', 'Symmetric', 'Mixed'),
	(4, 'Conductive Hearing Loss, Bilateral', 'Normal', 'Profound', 'Profound', 'Moderate', 'Profound', 'Cookie Bite', 'Rising', 'Symmetric', 'Progressive', 'Conductive'), 
	(5, 'Conductive Hearing Loss, Unilateral Left', 'Not Normal', 'Moderate', 'Moderate', 'Moderate', 'Moderate', 'Noise-Notch', 'Cookie Bite', 'Corner', 'Sudden', 'Sensorineural'), 
	(6, 'Conductive Hearing Loss, Unilateral Right', 'Normal', 'Moderate/Severe', 'Severe', 'Normal', 'Normal', 'Percipitous', 'Sudden', 'Sudden', 'Sudden', 'Condcutive'), 
	(7, 'Conductive Hearing Loss, Bilateral', 'Normal', 'Normal', 'Normal', 'Moderate', 'Severe', 'Progressive', 'Progressive', 'Asymmetrical', 'Asymmetrical', 'Mixed');

insert into Appointments values
        (001, 111, 00001, 10000, 10000, 10000, 1, 'June 1, 2019', '6:30AM', 1),
	(002, 222, 00002, 20000, 20000, 20000, 2, 'June 2, 2019', '7:30AM', 2),
	(003, 333, 00003, 30000, 30000, 30000, 3, 'June 3, 2019', '8:30AM', 3),
	(004, 444, 00004, 40000, 40000, 40000, 4, 'June 4, 2019', '9:30AM', 4),
	(005, 555, 00005, 50000, 50000, 50000, 5, 'June 5, 2019', '10:30AM', 5),
	(006, 666, 00006, 60000, 60000, 60000, 6, 'June 6, 2019', '11:30AM', 6),
	(007, 777, 00007, 70000, 70000, 70000, 7, 'June 7, 2019', '12:30AM', 7);

