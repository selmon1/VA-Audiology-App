import handler from './handler';
import db from './db';

let tfi_datapoints : string[]  = [
  'patientid',
  'tfi_i',
  'tfi_sc',
  'tfi_c',
  'tfi_si',
  'tfi_a',
  'tfi_r',
  'tfi_q',
  'tfi_e',
  'tfi_overallscore'
];
let ths_datapoints : string[] = [
  'patientid',
  'ths_sectiona',
  'ths_sectionb',
  'ths_sectionc',
  'ths_sectionc_example'  
];
let ts_datapoints : string[] = [
  'patientid',
  'ts_type'
]
let audiologistexams_datapoints : string[] = [
  'tympanometrytype', 
  'otoscopytype', 
  'rightear_lowf_severity', 
  'rightear_highf_severity', 
  'leftear_lowf_severity', 
  'leftear_highf_severity',
  'rightear_lowf_configuration',
  'rightear_highf_configuration',
  'leftear_lowf_configuration',
  'leftear_highf_configuration', 
  'audiogramtype'
]

let appointment_datapoints : string [] = [
  'authorityid',
  'patientid',
  'tfisurveyid',
  'thssurveyid',
  'tssurveyid',
  'audiologistexamsid',
  'appointmentdatetime'
]

export default handler(async (request: any) => {
  
  return await db(async (connection) => {
    // Take data from request and build sql call from i
  let tfisurvey_sql : string = "INSERT INTO tfisurvey (" + tfi_datapoints.join() + ") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"; 
  let tfisurvey_value : number[] = tfi_datapoints.map((value, index) => request.body[value])

  let thssurvey_sql : string = "INSERT INTO thssurvey (" + ths_datapoints.join() + ") VALUES ($1, $2, $3, $4, $5) RETURNING *";
  let thssurvey_values = ths_datapoints.map((value, index) => request.body[value])

  let tssurvey_sql : string = "INSERT INTO tssurvey (" + ts_datapoints.join() + ") VALUES ($1, $2) RETURNING *";
  let tssurvey_values = ts_datapoints.map((value, index) => request.body[value])

  let audiologistexam_sql : string = "INSERT INTO audiologistexams (" + audiologistexams_datapoints.join() + ") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
  let audiologistexam_values = audiologistexams_datapoints.map((value, index) => request.body[value])

  // Appointments inserted last because it needs info from the other tables
    await Promise.all([
      connection.query(tfisurvey_sql, tfisurvey_value),
      connection.query(thssurvey_sql, thssurvey_values),
      connection.query(tssurvey_sql, tssurvey_values),
      connection.query(audiologistexam_sql, audiologistexam_values)
    ]).then(values => {
      
      request.body['tfisurveyid'] = values[0].rows[0].tfisurveyid;
      request.body['thssurveyid'] = values[1].rows[0].thssurveyid;
      request.body['tssurveyid'] = values[2].rows[0].tssurveyid;
      request.body['audiologistexamsid'] = values[3].rows[0].audiologistexamsid;

      let appointment_sql = "INSERT INTO appointments (" + appointment_datapoints.join() + ") VALUES ($1, $2, $3, $4, $5, NOW())"
      let appointment_values = appointment_datapoints.map((value, index) => request.body[value])
      
      connection.query(appointment_sql, appointment_values)
    }).catch(err => console.log(err))
  });
});
