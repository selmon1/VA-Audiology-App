import handler from './handler';
import db from './db';


export default handler(async (request: any) => {
  return await db(async (connection) => {
    // Define variables
    let accounts_datapoints: string[] = [
        "username"
    ]
    let accounts_sql = "SELECT username, authorityname FROM authority"

    Promise.all([
      connection.query(accounts_sql)
    ]).then(values => {
      return values
    }).catch(err => console.log(err))
  });
});
