import { Pool } from 'pg';
// TODO: get credentials from a file not included in git

let connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'va_trial',
  password: 'postgres',
  port: 5432,
});

export default function makeConnection()
{
  connection.connect();
  return connection;
}