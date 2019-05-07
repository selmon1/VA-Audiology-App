/*
Purpose: Compare the first and last test taken by a patient. 

Changes: When implementing this code. Change '3' to be the
variable name or specific patient you are looking for.  

Tables: For this query we are using the comparetests view table
that should contain the appointmnetid, patientid and every tests 
results. This view excludes date since it is unnecessary.  
*/

(select * 
from comparetests
where patientid = 3
order by appointmentid ASC
limit 1)

union all

(select * 
from comparetests 
where patientid = 3 
order by appointmentid DESC 
limit 1)


