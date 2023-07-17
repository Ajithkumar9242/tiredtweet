import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors"
const PORT = process.env.PORT || 4000
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then((suc) =>{
    console.log(`Connected`)
})
.catch((error) =>{
    console.log(error)
})

app.use(cors({
    origin: ["https://tiredtweet.vercel.app"], // allow to server to accept request
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

app.listen(PORT, () =>{
    console.log(`Server Started at ${PORT}`)
})
