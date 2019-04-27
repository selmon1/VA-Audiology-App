import { Pool } from 'pg';
// config.ts is not included in git and you must write it yourself; see config.example
import config from './config';

const connection = new Pool(config.database);

export default function makeConnection()
{
  connection.connect();
  return connection;
}
