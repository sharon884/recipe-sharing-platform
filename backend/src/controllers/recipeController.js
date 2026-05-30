import Recipe from "../models/Recipe.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import mongoose from "mongoose";

const createRecipe = async (req, res) => {
    try {
        const {
            title,
            ingredients,
            instructions,
        } = req.body;

        if (
            !title ||
            !ingredients ||
            !instructions
        ) {
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json({
                    message:
                        "Title, ingredients and instructions are required",
                });
        }

        const recipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            user: req.user._id,
        });

        return res
            .status(STATUS_CODES.CREATED)
            .json(recipe);

    } catch (error) {
        return res
            .status(
                STATUS_CODES.INTERNAL_SERVER_ERROR
            )
            .json({
                message: error.message,
            });
    }
};



const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        return res
            .status(STATUS_CODES.OK)
            .json(recipes);

    } catch (error) {
        return res
            .status(
                STATUS_CODES.INTERNAL_SERVER_ERROR
            )
            .json({
                message: error.message,
            });
    }
};



const getRecipeById = async (req, res) => {
    try {

        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

        if (!isValidId) return res.status(STATUS_CODES.BAD_REQUEST).json({
            message: "Invalid recipe ID",
        });

        const recipe = await Recipe.findById(
            req.params.id
        ).populate("user", "name email");

        if (!recipe) {
            return res
                .status(STATUS_CODES.NOT_FOUND)
                .json({
                    message: "Recipe not found",
                });
        }

        return res
            .status(STATUS_CODES.OK)
            .json(recipe);

    } catch (error) {
        return res
            .status(
                STATUS_CODES.INTERNAL_SERVER_ERROR
            )
            .json({
                message: error.message,
            });
    }
};



const updateRecipe = async (req, res) => {
    try {
        const isValidId = mongoose.Types.ObjectId.isValid(
            req.params.id
        );

        if (!isValidId) {
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json({
                    message: "Invalid recipe ID",
                });
        }

        const recipe = await Recipe.findById(
            req.params.id
        );

        if (!recipe) {
            return res
                .status(STATUS_CODES.NOT_FOUND)
                .json({
                    message: "Recipe not found",
                });
        }


        if (
            recipe.user.toString() !==
            req.user._id.toString()
        ) {
            return res
                .status(STATUS_CODES.FORBIDDEN)
                .json({
                    message:
                        "You are not authorized to update this recipe",
                });
        }

        const {
            title,
            ingredients,
            instructions,
        } = req.body;


        recipe.title =
            title || recipe.title;

        recipe.ingredients =
            ingredients || recipe.ingredients;

        recipe.instructions =
            instructions || recipe.instructions;

        const updatedRecipe =
            await recipe.save();

        return res
            .status(STATUS_CODES.OK)
            .json(updatedRecipe);

    } catch (error) {
        return res
            .status(
                STATUS_CODES.INTERNAL_SERVER_ERROR
            )
            .json({
                message: error.message,
            });
    }
};



export { createRecipe, getRecipes, getRecipeById, updateRecipe };