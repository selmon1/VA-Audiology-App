create database VA_Trial;
\c va_trial
create table SessionKeys (
	SessionKeyID int, 
	UserID int, 
	CreatedTime Time,
	LastUsedTime Time,
	PRIMARY KEY (SessionKeyID)
);

create table tfiSurvey ( 
	tfiSurveyID int NOT NULL, 
        Test_Taken bool, 
	PatientID int, 
	CompletionDate Date,
	CompletionTime Time,
	TFI_I int,
	TFI_Sc int, 
	TFI_C int, 
	TFI_SI int,
	TFI_A int,
	TFI_R int, 
	TFI_Q int, 
	TFI_E int, 
	TFI_OverallScore int,
	PRIMARY KEY (tfiSurveyID) 
);

create table thsSurvey ( 
	thsSurveyID int NOT NULL, 
	PatientID int, 
	CompletionDate Date,
	CompletionTime Time,
	THS_SectionA int,
	THS_SectionB int, 
	THS_SectionC int,
        THS_SectionC_Exmaple text, 
	PRIMARY KEY (thsSurveyID)
);

create table tsSurvey ( 
	tsSurveyID int NOT NULL, 
	PatientID int, 
	CompletionDate Date,
	CompletionTime Time,
	TS_Type text,
	PRIMARY KEY (tsSurveyID)
);

create table Patient (
	PatientID int NOT NULL,
        Deceased bool NOT NULL,
	Notes text,
	PRIMARY KEY (PatientID)
);

create table Authority ( 
	AuthorityId int NOT NULL, 
	Username text,
	Password text,
        Name text, 
	Authority_Type text,
	PRIMARY KEY (AuthorityID)
);

create table Notes (
        NotesID int, 
	AuthorityID int, 
	Notes text,
        PRIMARY KEY (NotesID)
);

create table AudiologistExams (
	AudiologistExamsID int NOT NULL, 
	TympanometryType text,
	OtoscopyType text,  
	RightEar_LowF_Severity text, 
	RightEar_HighF_Severity text,
	LeftEar_LowF_Severity text,
	LeftEar_HighF_Severity text,
	RightEar_LowF_Configuration text,
	RightEar_HighF_Configuration text,
	LeftEar_LowF_Configuration text,
	LeftEar_HighF_Configuration text,
	AudiogramType text,
	PRIMARY KEY (AudiologistExamsID)
);

create table Appointments (
	AppointmentID int NOT NULL, 
	AuthorityID int, 
	PatientID int, 
	tfiSurveyID int REFERENCES tfiSurvey(tfiSurveyID), 
	thsSurveyID int REFERENCES thsSurvey(thsSurveyID), 
	tsSurveyID int REFERENCES tsSurvey(tsSurveyID), 
	AudiologistExamsID int REFERENCES AudiologistExams(AudiologistExamsID),
	AppointmentDate Date, 
	AppointmentTime Time,
	NotesId int REFERENCES Notes(NotesID),
	PRIMARY KEY (AppointmentID)
);

