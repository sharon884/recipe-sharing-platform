import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";


const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        message: "API Running"
    });
});


app.use("/api/auth", authRoutes);


app.get("/api/test", protect, (req, res) => {
   res.json({
      message: "Protected Route",
      user: req.user,
   });
});


export default app;