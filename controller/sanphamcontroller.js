import { getSanPham,filterSanPham } from "../database.js";

const data = await getSanPham()
const filter = await filterSanPham()
 const sanphamController = {
    getAll: (req,res) =>{
        try {
            res.json({ 
                message: "ok", 
                data : data    
            });
        } catch (error) {
            console.log(error);
        }
    },
    getDataFilter: async (req, res) => {
        try {
            const { loaihang } = req.params; // Assuming your route parameter is named 'id'
            const [rows, fields] = await filterSanPham(loaihang);
          res.json({
            message: "ok",
            data: rows
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            message: "Internal Server Error",
            error: error.message
          });
        }
      }
      
}

export default sanphamController
