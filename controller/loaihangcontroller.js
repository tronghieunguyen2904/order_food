import { getLoaiHang } from "../database.js";

const data = await getLoaiHang()
 const loaihangController = {
    getAll: (req,res) =>{
        try {
            res.json({ 
                message: "ok", 
                data : data    
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default loaihangController
