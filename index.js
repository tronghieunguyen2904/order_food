import express from 'express'
import bodyParser from "body-parser";
import routerLoaihang from './routes/loaihang.route.js'
import routerSanPham from './routes/sanpham.route.js'
import routerLogin from './routes/login.route.js';
import cors from 'cors'
import routerHoadon from './routes/hoadon.route.js';
import routerUser from './routes/user.route.js';
const app = express();
const port = 3001;
app.use(cors());
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/loaihang",routerLoaihang)
app.use("/api/sanpham",routerSanPham)
app.use('/api/user',routerLogin)
app.use('/api/order',routerHoadon)
app.use('/api/user',routerUser)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});