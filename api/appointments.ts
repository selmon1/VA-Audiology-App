import handler from './handler';
import db from './db';


export default handler(async (request: any) => {
    var client = db.client;
    //TODO: This is a bug, client should be disconnected after the query has been resolved!
    client.connect();
    var results = client.query('SELECT * FROM patient')
      .then((res: { rows: any[]; }) => results = res.rows)
      .catch((e: { stack: any; }) => console.error(e.stack));
    
    return results;
});
