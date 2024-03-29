import express from "express";
import cors from "cors";
import router from "./api/routes.js"
import dotenv from "dotenv"
import * as path from 'path'

dotenv.config();
const __dirname = path.resolve();
const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
  }
app.use("/api/v1/restaurants",router);
app.use("*",(req,res) => res.status(404).json({error: "not found"}));

export default app