import express from 'express'
import routerLoaihang from './routes/loaihang.route.js'
import cors from 'cors'
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/loaihang",routerLoaihang)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});