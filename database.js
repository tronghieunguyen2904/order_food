import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'order_food',
  }).promise()

export async function getLoaiHang(){
    const result = await pool.query("select * from loaihang")
    return result;
}
const data = await getLoaiHang();

console.log(data)
