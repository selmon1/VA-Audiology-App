/*
Purpose: Look at all information of a specific patient. 

Changes: When implementing this code. Change "mypatientID"
to match your variable name. 

Tables: For this query we are using the selectall view table
that should contain all information from every table. 
*/

SELECT *
FROM selectall
WHERE selectall.patientid = mypatientID; 

