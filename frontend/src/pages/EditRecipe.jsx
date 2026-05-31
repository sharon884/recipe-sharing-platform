import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
   getRecipeById,
   updateRecipe,
} from "../services/recipeService";

const EditRecipe = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   const [formData, setFormData] =
      useState({
         title: "",
         ingredients: "",
         instructions: "",
      });

   const [loading, setLoading] =
      useState(true);

   const [error, setError] =
      useState("");

   useEffect(() => {
      const fetchRecipe =
         async () => {
            try {
               const recipe =
                  await getRecipeById(id);

               setFormData({
                  title: recipe.title,
                  ingredients:
                     recipe.ingredients.join(
                        "\n"
                     ),
                  instructions:
                     recipe.instructions,
               });

            } catch (error) {
               setError(
                  error.response?.data
                     ?.message ||
                  "Failed to load recipe"
               );
            } finally {
               setLoading(false);
            }
         };

      fetchRecipe();
   }, [id]);

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]:
            e.target.value,
      });
   };

   const handleSubmit =
      async (e) => {
         e.preventDefault();

         try {
            const recipeData = {
               title:
                  formData.title,
               ingredients:
                  formData.ingredients
                     .split("\n")
                     .map((item) =>
                        item.trim()
                     )
                     .filter(
                        Boolean
                     ),
               instructions:
                  formData.instructions,
            };

            await updateRecipe(
               id,
               recipeData
            );

            navigate(
               `/recipes/${id}`
            );

         } catch (error) {
            setError(
               error.response?.data
                  ?.message ||
               "Failed to update recipe"
            );
         }
      };

   if (loading) {
      return (
         <div className="container mt-5">
            <h3>Loading...</h3>
         </div>
      );
   }

   return (
      <div className="container mt-5">
         <div className="row justify-content-center">
            <div className="col-md-8">
               <div className="card">
                  <div className="card-body">

                     <h2 className="mb-4">
                        Edit Recipe
                     </h2>

                     {error && (
                        <div className="alert alert-danger">
                           {error}
                        </div>
                     )}

                     <form
                        onSubmit={
                           handleSubmit
                        }
                     >
                        <div className="mb-3">
                           <label className="form-label">
                              Title
                           </label>

                           <input
                              type="text"
                              name="title"
                              className="form-control"
                              value={
                                 formData.title
                              }
                              onChange={
                                 handleChange
                              }
                              required
                           />
                        </div>

                        <div className="mb-3">
                           <label className="form-label">
                              Ingredients
                           </label>

                           <textarea
                              name="ingredients"
                              rows="5"
                              className="form-control"
                              value={
                                 formData.ingredients
                              }
                              onChange={
                                 handleChange
                              }
                              required
                           />
                        </div>

                        <div className="mb-3">
                           <label className="form-label">
                              Instructions
                           </label>

                           <textarea
                              name="instructions"
                              rows="6"
                              className="form-control"
                              value={
                                 formData.instructions
                              }
                              onChange={
                                 handleChange
                              }
                              required
                           />
                        </div>

                        <button
                           type="submit"
                           className="btn btn-warning"
                        >
                           Update Recipe
                        </button>

                     </form>

                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default EditRecipe;