import api from "../api/api";
import getAuthConfig from "../utils/getAuthConfig";



export const getRecipes = async () => {
   const response = await api.get("/recipes");

   return response.data;
};


export const getRecipeById = async (id) => {
   const response = await api.get(
      `/recipes/${id}`
   );

   return response.data;
};


export const createRecipe = async (
   recipeData
) => {
   const response = await api.post(
      "/recipes",
      recipeData,
      getAuthConfig()
   );

   return response.data;
};


export const updateRecipe = async (
   id,
   recipeData
) => {
   const response = await api.put(
      `/recipes/${id}`,
      recipeData,
      getAuthConfig()
   );

   return response.data;
};