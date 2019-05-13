/*
Purpose: Delete a single patient or a group of patients 
either by (patientID, Date, or Month).

Changes: 

Delete one patient - When implementing this code. Change '2' to be the
variable name or specific patient you are looking to delete.  

Tables: For this query we are going to be using the appointments 
table with a "CASCADE" delete that should delete all foreign key 
references to other tables as well. 
*/


/* DELETE ONE PATIENT: */
delete from patient
where patientid = 2



