import handler from './handler';
let pgp = require('pg-promise')(/*options*/)
let db = pgp('postgres://postgres:postgres@localhost:5432/va_trial')

export default handler((request) => {
    // Placeholder for SQL code (Currently blocked)
    return db.each('SELECT * FROM appointments FULL JOIN audiologistexams ON appointments.appointmentid = audiologistexams.audiologistexamsid FULL JOIN tfisurvey ON appointments.appointmentid = tfisurvey.tfisurveyid', [], row => {
    });
});
