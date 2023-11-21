import express from "express";
import loaihangController from "../controller/loaihangcontroller.js"
const routerLoaihang = express.Router()

routerLoaihang.get('/',loaihangController.getAll)

export default routerLoaihang

