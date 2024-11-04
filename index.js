import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import queueRouter from "./routes/queueRoutes.js"

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"]}));

app.use('/api', userRouter);
app.use('/api', queueRouter);


mongoose.connect(process.env.MONGO_URL).then(() =>{ 
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => console.log("Server is running"));
}).catch((err) => console.log(err));