create database VA_Trial;
\c va_trial

create table Patient (
PatientID int NOT NULL,
Deceased bool NOT NULL,
FirstName text NOT NULL, 
LastName text NOT NULL,
Email text NOT NULL,
PatientNotes text,
PRIMARY KEY (PatientID)
);

create table SessionKeys (
SessionKeyID text,
UserID int, 
CreatedTime bigint, LastUsedTime bigint, PRIMARY KEY (SessionKeyID)
);

create table tfiSurvey ( 
tfiSurveyID SERIAL, 
PatientID int REFERENCES Patient(PatientID) ON DELETE CASCADE,
TFI_I float,
TFI_Sc float, 
TFI_C float, 
TFI_SI float,
TFI_A float,
TFI_R float, 
TFI_Q float, 
TFI_E float, 
TFI_OverallScore float,
PRIMARY KEY (tfiSurveyID)
); 

create table thsSurvey ( 
thsSurveyID SERIAL, 
PatientID int REFERENCES Patient(PatientID) ON DELETE CASCADE, 
THS_SectionA int,
THS_SectionB int, 
THS_SectionC int,
THS_SectionC_Example text, 
PRIMARY KEY (thsSurveyID)
);

create table tsSurvey ( 
tsSurveyID SERIAL, 
PatientID int REFERENCES Patient(PatientID) ON DELETE CASCADE, 
TS_Type text,
PRIMARY KEY (tsSurveyID)
);


create table Authority ( 
AuthorityId int NOT NULL, 
Username text UNIQUE,
Password text,
AuthorityName text, 
AuthorityType int,
PRIMARY KEY (AuthorityID)
);

create table AudiologistExams (
AudiologistExamsID SERIAL, 
PatientID int REFERENCES Patient(PatientID) ON DELETE CASCADE,
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
AppointmentID SERIAL, 
AuthorityID int REFERENCES Authority(AuthorityID), 
PatientID int REFERENCES Patient(PatientID) ON DELETE CASCADE, 
tfiSurveyID int REFERENCES tfiSurvey(tfiSurveyID) ON DELETE CASCADE, 
thsSurveyID int REFERENCES thsSurvey(thsSurveyID) ON DELETE CASCADE, 
tsSurveyID int REFERENCES tsSurvey(tsSurveyID) ON DELETE CASCADE, 
AudiologistExamsID int REFERENCES AudiologistExams(AudiologistExamsID) ON DELETE CASCADE,
AppointmentDateTime timestamp with time zone, 
PRIMARY KEY (AppointmentID)
);

CREATE VIEW SelectAll AS
SELECT appointments.appointmentid,
appointments.authorityid, 
appointments.patientid,
patient.deceased,
patient.PatientNotes,
appointments.appointmentdatetime, 
audiologistexams.tympanometrytype,
audiologistexams.otoscopytype,
audiologistexams.rightear_lowf_severity,
audiologistexams.rightear_highf_severity, 
audiologistexams.leftear_lowf_severity,
audiologistexams.leftear_highf_severity,
audiologistexams.rightear_lowf_configuration,
audiologistexams.rightear_highf_configuration,
audiologistexams.leftear_lowf_configuration,
audiologistexams.leftear_highf_configuration,
audiologistexams.audiogramtype,
authority.AuthorityName,
authority.authorityType,
tfisurvey.tfi_i,
tfisurvey.tfi_sc,
tfisurvey.tfi_c,
tfisurvey.tfi_si,
tfisurvey.tfi_a,
tfisurvey.tfi_r,
tfisurvey.tfi_q,
tfisurvey.tfi_e,
tfisurvey.tfi_overallscore,
thssurvey.ths_sectiona,
thssurvey.ths_sectionb,
thssurvey.ths_sectionc,
thssurvey.ths_sectionc_example,
tssurvey.ts_type
FROM appointments
INNER JOIN patient ON appointments.patientid=patient.patientid
INNER JOIN audiologistexams ON appointments.audiologistexamsid=audiologistexams.audiologistexamsid
INNER JOIN authority ON appointments.authorityid=authority.authorityid
INNER JOIN tfisurvey ON appointments.tfisurveyid=tfisurvey.tfisurveyid
INNER JOIN thssurvey ON appointments.thssurveyid=thssurvey.thssurveyid
INNER JOIN tssurvey ON appointments.tssurveyid=tssurvey.tssurveyid;


CREATE VIEW tfiAverages AS
SELECT appointments.appointmentdatetime,
patient.patientid,
patient.deceased,
patient.PatientNotes,
tfisurvey.tfi_i,
tfisurvey.tfi_sc,
tfisurvey.tfi_c,
tfisurvey.tfi_si,
tfisurvey.tfi_a,
tfisurvey.tfi_r,
tfisurvey.tfi_q,
tfisurvey.tfi_e,
tfisurvey.tfi_overallscore
FROM tfisurvey
INNER JOIN appointments on appointments.tfisurveyid=tfisurvey.tfisurveyid
INNER JOIN patient on patient.patientid=appointments.patientid;

CREATE VIEW selectallauthority AS
SELECT authority.username,
authority.authorityname,
authority.authoritytype
FROM authority;


CREATE VIEW comparetests AS
SELECT appointments.appointmentid,
appointments.patientid,
audiologistexams.tympanometrytype,
audiologistexams.otoscopytype,
audiologistexams.rightear_lowf_severity,
audiologistexams.rightear_highf_severity, 
audiologistexams.leftear_lowf_severity,
audiologistexams.leftear_highf_severity,
audiologistexams.rightear_lowf_configuration,
audiologistexams.rightear_highf_configuration,
audiologistexams.leftear_lowf_configuration,
audiologistexams.leftear_highf_configuration,
audiologistexams.audiogramtype,
tfisurvey.tfi_i,
tfisurvey.tfi_sc,
tfisurvey.tfi_c,
tfisurvey.tfi_si,
tfisurvey.tfi_a,
tfisurvey.tfi_r,
tfisurvey.tfi_q,
tfisurvey.tfi_e,
tfisurvey.tfi_overallscore,
thssurvey.ths_sectiona,
thssurvey.ths_sectionb,
thssurvey.ths_sectionc,
thssurvey.ths_sectionc_example,
tssurvey.ts_type
FROM appointments
INNER JOIN patient ON appointments.patientid=patient.patientid
INNER JOIN audiologistexams ON appointments.audiologistexamsid=audiologistexams.audiologistexamsid
INNER JOIN tfisurvey ON appointments.tfisurveyid=tfisurvey.tfisurveyid
INNER JOIN thssurvey ON appointments.thssurveyid=thssurvey.thssurveyid
INNER JOIN tssurvey ON appointments.tssurveyid=tssurvey.tssurveyid;

