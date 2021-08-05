import { Pool } from 'pg';

const pool = new Pool({
  host:'localhost',
  user: 'admin',
  password: 'Fr34kb00x$',
  database:'api',
  port: '5432'
});

export default pool;