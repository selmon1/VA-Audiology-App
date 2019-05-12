import handler from './handler';
import db from './db';
import { QueryResult } from 'pg';

export default handler(async (request: any) => {
  return await db(async (connection) => {
    let results: QueryResult = await connection.query("SELECT authorityid, username, authorityname, authoritytype FROM authority");
    return results.rows;
  });
});
