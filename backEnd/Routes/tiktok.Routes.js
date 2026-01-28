import express from "express";
import { videoDownload, videoRequest } from "../Controller/Tiktok.controller.js";

const TiktokRouter = express.Router();


TiktokRouter.post("/videoRequest", videoRequest );
TiktokRouter.get("/videoDownload", videoDownload);

export default TiktokRouter;