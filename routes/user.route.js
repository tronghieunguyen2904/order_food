import express from "express";
import userController from "../controller/usercontroller.js"
const routerUser = express.Router()

routerUser.get('/order/:id',userController.getOrdersByCustomerId)

export default routerUser

