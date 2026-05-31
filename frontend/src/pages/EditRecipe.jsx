import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

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
         <div className="container mt-5 py-5 text-center">
            <div className="spinner-border text-orange" style={{ color: "var(--primary)" }} role="status">
               <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="mt-3 text-muted">Loading Recipe Details...</h5>
         </div>
      );
   }

   return (
      <div className="container mt-4 pb-5">
         <div className="d-flex align-items-center mb-4">
            <Link to={`/recipes/${id}`} className="btn btn-recipe-outline shadow-sm d-flex align-items-center gap-1">
               <span>←</span> Back to Recipe
            </Link>
         </div>

         <div className="row justify-content-center">
            <div className="col-md-8">
               <div className="card border-0 shadow-md p-3" style={{ borderRadius: "var(--radius-md)" }}>
                  <div className="card-body">

                     <h2 className="fw-bold mb-2">
                        Edit Recipe
                     </h2>
                     <p className="text-muted small mb-4">Modify the recipe title, ingredients, or cooking steps below.</p>

                     {error && (
                        <div className="alert alert-danger py-2 px-3 small rounded mb-4">
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
                              Recipe Title
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
                           <div className="form-text text-muted small mt-1">Please enter each ingredient on a new line.</div>
                        </div>

                        <div className="mb-4">
                           <label className="form-label">
                              Cooking Instructions
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

                        <div className="d-flex gap-2">
                           <button
                              type="submit"
                              className="btn btn-recipe-primary px-4 py-2 shadow-sm"
                           >
                              Update Recipe
                           </button>
                           <Link to={`/recipes/${id}`} className="btn btn-recipe-outline px-4 py-2">
                              Cancel
                           </Link>
                        </div>

                     </form>

                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default EditRecipe;