import {Client} from 'pg';
//TODO: get credentials from a file not included in git
export default {
    client : new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'va_trial',
        password: 'postgres',
        port: 5432,
      })
}
