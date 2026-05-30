import express from "express";
import { createRecipe, getRecipes, getRecipeById, updateRecipe } from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .post(protect, createRecipe)
    .get(getRecipes);

router
    .route("/:id")
    .get(getRecipeById)
    .put(protect, updateRecipe);


export default router;