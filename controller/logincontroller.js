import { loginUser,registerUser } from '../database.js';
import bcrypt from 'bcrypt';
import pool from '../database.js';

const loginController = {
  login: {
    async handleLogin(req, res) {
      try {
        const { gmail, password } = req.body;
        const sql = "SELECT * FROM khachhang WHERE gmail = ?";
        const [rows, fields] = await pool.query(sql, [gmail]);
  
        if (rows.length === 0) {
          // User with the provided email not found
          return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
  
        const storedHashedPassword = rows[0].password;
  
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
        
        if (!passwordMatch) {
          // Passwords do not match
          return res.status(401).json({ success: false, message: "Invalid email or password" , data: storedHashedPassword });
        }
  
        // Passwords match, login successful
        res.json({ success: true, message: "Login successful", user: rows[0] });
  
      } catch (error) {
        console.error('Error handling login:', error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    },
  },

  register: {
    async handleRegister(req, res) {
      try {
        const { gmail, ten, tendem, password, diachi, gioitinh, sdt, matrangthai, maphanquyen } = req.body;
        const sql = "INSERT INTO khachhang (gmail, ten, tendem, password, diachi, gioitinh, sdt, matrangthai, maphanquyen) VALUES (?, ?, ?,?,?,?,?,?,?)";
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);
        const [rows, fields] = await pool.query(sql, [gmail, ten, tendem, hashedPassword, diachi, gioitinh, sdt, matrangthai, maphanquyen]);
        res.json({
          data: rows
        });
      } catch (error) {
        console.error('Error handling registration:', error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    },
  },
};

export default loginController;