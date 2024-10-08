import * as express from "express";
import authRoutes from "./routes/authRoutes";
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

export default app;
