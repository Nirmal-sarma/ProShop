import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./Routes/productRoutes.js";
import { notFound, ErrorHandler } from "./Middleware/errorMiddleaware.js";
import UserRoutes from "./Routes/UserRoutes.js";
import OrderRoute from "./Routes/OrderRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import morgan from "morgan";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());



app.use("/api/products", productRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRoute);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use("/api/upload", UploadRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(ErrorHandler);

app.listen(
  process.env.PORT,
  console.log(`Server running on port ${process.env.NODE_ENV}`.blue.bold)
);
