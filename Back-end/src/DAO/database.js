
import mysql from "mysql2"
const mySql = mysql;

const pool = mySql.createPool({
    host: 'localhost',
    port:'3306',
    user:'root',
    password:'',
    database: 'myfinance'

}).promise();

export default pool;