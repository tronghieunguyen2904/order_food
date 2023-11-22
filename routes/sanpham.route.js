import express from "express";
import sanphamController from "../controller/sanphamcontroller.js"
const routerSanpham = express.Router()

routerSanpham.get('/',sanphamController.getAll)
routerSanpham.get('/:loaihang',sanphamController.getDataFilter)

export default routerSanpham

