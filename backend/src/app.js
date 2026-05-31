import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        message: "Recipe Sharing Platform API Running"
    });
});


app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);




export default app;