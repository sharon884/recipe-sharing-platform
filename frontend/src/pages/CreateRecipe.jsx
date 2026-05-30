import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="container mt-5">
         <div className="row justify-content-center">
            <div className="col-md-8">
               <div className="card">
                  <div className="card-body">
                      <h2 className="mb-4">
                         Create Recipe
                      </h2>

                      {error && (
                         <div className="alert alert-danger">
                            {error}
                         </div>
                      )}

                      <form
                         onSubmit={handleSubmit}
                      >
                         <div className="mb-3">
                            <label className="form-label">
                               Title
                            </label>

                            <input
                               type="text"
                               name="title"
                               className="form-control"
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
                               placeholder="One ingredient per line"
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
                               onChange={handleChange}
                               required
                            />
                         </div>

                         <button
                            type="submit"
                            className="btn btn-success"
                         >
                            Create Recipe
                         </button>
                      </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CreateRecipe;