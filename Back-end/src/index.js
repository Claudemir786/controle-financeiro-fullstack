import express from "express";
import cors from "cors";
import route from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(route);

app.listen(3000, ()=>console.log("server running at port 3000"));