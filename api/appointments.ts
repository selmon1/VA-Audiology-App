import handler from './handler';
import db from './db';
import { QueryResult } from 'pg';

export default handler(async (request: any) => {
    return await db(async (connection) => {
        let results: QueryResult;
        if (request.query.id === undefined) {
            results = await connection.query('SELECT * FROM selectall');
        } else {
            results = await connection.query('SELECT * FROM selectall WHERE selectall.appointmentid = $1', [request.query.id]);
        }
        return results.rows;
    });
});
