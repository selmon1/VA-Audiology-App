import { Pool } from 'pg';
// config.ts is not included in git and you must write it yourself; see config.example
import config from './config';

const pool = new Pool(config.database);
// temporary way of preventing lockup until we have withConnection
pool.connect();

// function Structure initially inspired by https://node-postgres.com/features/transactions
export default async function withConnection(action) {
    // note: we don't try/catch this because if connecting throws an exception
    // we don't need to dispose of the client (it will be undefined)
    const client = await pool.connect();
    try {
        let res = null;
        await client.query('BEGIN');
        // This executes ACTION that is defined by the calling function
        let results = action(client);
        await client.query('COMMIT');
        return results;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}
