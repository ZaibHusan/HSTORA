import express from "express";
import cors from "cors";
import TiktokRouter from "./Routes/tiktok.Routes.js";

const app = express();

app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
    res.send("hello");
});

app.use("/Tikok", TiktokRouter);

export default app;