import { Pool } from 'pg';
// config.ts is not included in git and you must write it yourself; see config.example
import config from './config';

const connection = new Pool(config.database);
//temporary way of preventing lockup until we have withConnection
connection.connect();

export default function makeConnection()
{
  return connection;
}
