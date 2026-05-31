import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createRecipe } from "../services/recipeService";

const CreateRecipe = () => {
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      title: "",
      ingredients: "",
      instructions: "",
   });

   const [error, setError] = useState("");

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const recipeData = {
            title: formData.title,
            ingredients:
               formData.ingredients
                  .split("\n")
                  .map(item => item.trim())
                  .filter(Boolean),
            instructions:
               formData.instructions,
         };

         await createRecipe(recipeData);

         navigate("/");

      } catch (error) {
         setError(
            error.response?.data?.message ||
            "Failed to create recipe"
         );
      }
   };

   return (
      <div className="container mt-4 pb-5">
         <div className="d-flex align-items-center mb-4">
            <Link to="/" className="btn btn-recipe-outline shadow-sm d-flex align-items-center gap-1">
               <span>←</span> Back to Dashboard
            </Link>
         </div>

         <div className="row justify-content-center">
            <div className="col-md-8">
               <div className="card border-0 shadow-md p-3" style={{ borderRadius: "var(--radius-md)" }}>
                  <div className="card-body">
                      <h2 className="fw-bold mb-2">
                         Create Recipe
                      </h2>
                      <p className="text-muted small mb-4">Share your culinary creations. Enter recipe details below.</p>

                      {error && (
                         <div className="alert alert-danger py-2 px-3 small rounded mb-4">
                            {error}
                         </div>
                      )}

                      <form
                         onSubmit={handleSubmit}
                      >
                         <div className="mb-3">
                            <label className="form-label">
                               Recipe Title
                            </label>

                            <input
                               type="text"
                               name="title"
                               className="form-control"
                               placeholder="e.g. Creamy Tuscan Garlic Chicken"
                               value={formData.title}
                               onChange={handleChange}
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
                               onChange={handleChange}
                               placeholder="Enter one ingredient per line&#10;e.g. 2 chicken breasts&#10;e.g. 1 cup heavy cream&#10;e.g. 2 tsp garlic powder"
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
                               placeholder="Step 1: Season chicken breasts.&#10;Step 2: Heat olive oil in a skillet...&#10;Step 3: Add heavy cream and garlic..."
                               value={
                                  formData.instructions
                                }
                               onChange={handleChange}
                               required
                            />
                         </div>

                         <div className="d-flex gap-2">
                            <button
                               type="submit"
                               className="btn btn-recipe-primary px-4 py-2 shadow-sm"
                            >
                               Publish Recipe
                            </button>
                            <Link to="/" className="btn btn-recipe-outline px-4 py-2">
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

export default CreateRecipe;