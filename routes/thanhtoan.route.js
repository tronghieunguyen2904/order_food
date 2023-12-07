import express from "express";
import thanhtoanController from "../controller/thanhtoancontroller.js";
const routerThanhtoan = express.Router()

routerThanhtoan.post('/momo', thanhtoanController.getThahtoan)

export default routerThanhtoan

