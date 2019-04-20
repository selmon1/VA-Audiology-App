import handler from './handler';
import db from './db';
import { QueryResult } from 'pg';

export default handler(async (request: any) => {
    let connection = db();
    let results: QueryResult;
    if (request.query.id === undefined) {
      results = await connection.query('SELECT * FROM appointmentsummary'); 
    } else {
      results = await connection.query('SELECT * FROM appointmentsummary app WHERE app.appointmentid = $1', [request.query.id]); 
    }
    return results.rows;
});
