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
export async function getSanPham(){
  try {
    // Thực hiện truy vấn để lấy thông tin từ cả hai bảng
    const result = await pool.query(`
      SELECT sanpham.*, loaihang.ten AS tenLoaiHang
      FROM sanpham
      LEFT JOIN loaihang ON sanpham.maloaihang = loaihang.id
    `);

    return result;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

export async function filterSanPham(id) {
  const result = await pool.query(`
    SELECT sanpham.*,loaihang.ten AS tenLoaiHang FROM sanpham JOIN loaihang ON sanpham.maloaihang = loaihang.id
    WHERE loaihang.id = ?
  `, [id]);
  return result;
}

export async function login(username,password){
  const [user] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  const passwordMatch = await bcrypt.compare(password, user[0].password);
}


const data = await getLoaiHang();
const dataSanPham = await getSanPham();
const dataFiler = await filterSanPham(1);
console.log(dataFiler);