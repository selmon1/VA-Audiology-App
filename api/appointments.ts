import handler from './handler';
import db from './db';
import { QueryResult } from 'pg';

export default handler(async (request: any) => {
  let connection = db();
  let results: QueryResult;
  // TODO: Revise Query String to utilize Bar's Query.
  if (request.query.id === undefined) {
    results = await connection.query('SELECT * FROM appointments');
  } else {
    results = await connection.query('SELECT * FROM appointments WHERE appointments.appointmentid = $1', [request.query.id]);
  }
  return results.rows;
});
