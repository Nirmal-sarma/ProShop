import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./Routes/productRoutes.js";
import {notFound,ErrorHandler} from './Middleware/errorMiddleaware.js';
import UserRoutes from './Routes/UserRoutes.js';
import OrderRoute from './Routes/OrderRoute.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("It is running");
});



app.use("/api/products", productRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRoute);
app.get('/api/config/paypal',(req,res)=>{
res.send(process.env.PAYPAL_CLIENT_ID)
}
)

app.use(notFound);
app.use(ErrorHandler);

app.listen(
  process.env.PORT,
  console.log(`Server running on port ${process.env.NODE_ENV}`.blue.bold)
);
