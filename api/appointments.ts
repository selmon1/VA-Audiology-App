import handler from './handler';
import db from './db';
import { QueryResult } from 'pg';

export default handler(async (request: any) => {
    let connection = db();
    let results: QueryResult;
    if (request.query.id === undefined) {
      return [];
    } else {
      results = await connection.query(
        'SELECT * FROM AppointmentSummary WHERE appointments.appointmentid = $1', [request.query.id]); }
    return results.rows;
});
