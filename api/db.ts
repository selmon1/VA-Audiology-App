import { Pool } from 'pg';
// creds.ts is not included in git and you must write it yourself; see creds.example
import dbLogin from './creds';

let connection = new Pool(dbLogin);

export default function makeConnection()
{
  connection.connect();
  return connection;
}
