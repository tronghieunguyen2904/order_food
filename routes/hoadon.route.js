import express from "express";
import hoadonController from "../controller/hoadoncontroller.js"
const routerHoadon = express.Router()

routerHoadon.post('/create',hoadonController.createOrderController.handleCreateOrder)

export default routerHoadon

