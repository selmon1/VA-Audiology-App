import handler from './handler';
import db from './db';

export default handler((request) => {
    // Placeholder for SQL code (Currently blocked)
    return db.each('SELECT * FROM appointments FULL JOIN audiologistexams ON appointments.appointmentid = audiologistexams.audiologistexamsid FULL JOIN tfisurvey ON appointments.appointmentid = tfisurvey.tfisurveyid', [], row => {
    });
});
