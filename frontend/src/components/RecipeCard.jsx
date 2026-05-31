import { Link } from "react-router-dom";
import defaultRecipeImage from "../assets/default_food.jpeg";

const RecipeCard = ({ recipe }) => {
   return (
      <div className="recipe-card-premium border-0">
         <div className="recipe-card-img-wrapper">
            <img 
               src={defaultRecipeImage} 
               alt={recipe.title} 
               className="recipe-card-img" 
            />
         </div>
         
         <div className="recipe-card-content">
            <h5 className="fw-bold text-dark text-truncate mb-2" title={recipe.title}>
               {recipe.title}
            </h5>

            <div className="mb-3 d-flex flex-wrap gap-2">
               <span className="badge bg-light text-dark border px-2.5 py-1.5 rounded-pill small" style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                  🍳 {recipe.ingredients?.length || 0} Ingredients
               </span>
            </div>

            <p className="small text-muted mb-4 d-flex align-items-center gap-1">
               <span>👤 By Chef {recipe.user?.name || "Unknown"}</span>
            </p>

            <Link
               to={`/recipes/${recipe._id}`}
               className="btn btn-recipe-outline w-100 mt-auto shadow-sm"
            >
               View Full Recipe
            </Link>
         </div>
      </div>
   );
};

export default RecipeCard;