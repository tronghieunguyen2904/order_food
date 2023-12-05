import mysql from 'mysql2'
import bcrypt from 'bcrypt';


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'order_food',
  }).promise()
export default pool;
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

export async function loginUser(username, password) {
 
}

export async function registerUser(gmail, ten, tendem, password, diachi, gioitinh, sdt) {
  try {
    // Generate a salt for bcrypt
    // const salt = await bcrypt.genSalt(10);

    // // Hash the password using the generated salt
    // const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      "INSERT INTO khachhang (gmail, ten, tendem, password, diachi, gioitinh, sdt, matrangthai, maphanquyen) VALUES (?, ?, ?,?,?,?,?,?,?)",
      [gmail, ten, tendem, password, diachi, gioitinh, sdt, 1, 1]
    );

    return { success: true, userId: result[0].id };
  } catch (error) {
    console.error('Error registering user:', error.message);
    return { success: false, message: "Registration failed", error: error.message };
  }
}
export async function createOrderWithDetails(id, hoten, diachi, sdt, trangthai, ngaydathang, mathanhtoan, mavanchuyen, makhachhang,tongtien, details,ghichu,quan) {
  try {
    // Start a transaction to ensure data consistency


    // Insert into the orders table
    const orderResult = await pool.query(
      "INSERT INTO hoadon (id, hoten, diachi, sdt, trangthai, ngaydathang, mathanhtoan, mavanchuyen, makhachhang,tongtien,ghichu,quan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)",
      [id, hoten, diachi, sdt, trangthai, ngaydathang, mathanhtoan, mavanchuyen, makhachhang,tongtien,ghichu,quan]
    );

    // Get the inserted order ID
    const orderId = orderResult.id;

    // Insert into the detail_order table for each detail
    for (const detail of details) {
      await pool.query(
        "INSERT INTO chitiethoadon (soluong, gia, tong, ghichu, mahoadon, masanpham) VALUES (?, ?, ?, ?, ?, ?)",
        [detail.soluong, detail.gia, detail.tong, detail.ghichu, orderId, detail.masanpham]
      );
    }

    // Commit the transaction
 

    return true;
  } catch (error) {
    // Rollback the transaction in case of an error
    // await pool.rollback();

    console.error('Error creating order with details:', error.message);
    throw error;
  }
}

export async function getOrdersByCustomerId(customerId) {
  try {
    const result = await pool.query(`
      SELECT *
      FROM hoadon
      WHERE makhachhang = ?
    `, [customerId]);

    return result;
  } catch (error) {
    console.error('Error fetching orders for customer:', error.message);
    throw error;
  }
}




const data = await getLoaiHang();
const dataSanPham = await getSanPham();
const dataFiler = await filterSanPham(1);
// const dataInsert = registerUser("test@gmail.com",'Hieu 2',"Nguyen trong",'123456','quan 7','nam','09090909');

// console.log(dataInsert);
