import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";

const Dashboard = () => {
   const [recipes, setRecipes] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetchRecipes = async () => {
         try {
            const data = await getRecipes();

            setRecipes(data);
         } catch (error) {
            setError(
               error.response?.data?.message ||
               "Failed to fetch recipes"
            );
         } finally {
            setLoading(false);
         }
      };

      fetchRecipes();
   }, []);

   if (loading) {
      return (
         <div className="container mt-5">
            <h3>Loading...</h3>
         </div>
      );
   }

   if (error) {
      return (
         <div className="container mt-5">
            <div className="alert alert-danger">
               {error}
            </div>
         </div>
      );
   }

   return (
      <div className="container mt-5">
         <h2 className="mb-4">
            Recipe Dashboard
         </h2>

         <div className="row">
            {recipes.map((recipe) => (
               <div
                  key={recipe._id}
                  className="col-md-4 mb-4"
               >
                  <div className="card h-100">
                     <div className="card-body">
                        <h5 className="card-title">
                           {recipe.title}
                        </h5>

                        <p className="card-text">
                           Ingredients:
                           {" "}
                           {
                              recipe.ingredients
                                 .length
                           }
                        </p>

                        <p className="card-text">
                           Created By:
                           {" "}
                           {recipe.user?.name}
                        </p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Dashboard;