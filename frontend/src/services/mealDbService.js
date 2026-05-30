import axios from "axios";
import defaultRecipeImage from "../assets/default_food.jpeg";

export const getRecipeImage = async (
   recipeTitle
) => {
   try {
      const response = await axios.get(
         `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeTitle}`
      );

      const meal =
         response.data.meals?.[0];

      return (
         meal?.strMealThumb ||
         defaultRecipeImage
      );

   } catch (error) {
      console.error(
         "Failed to fetch recipe image:",
         error
      );

      return defaultRecipeImage;
   }
};