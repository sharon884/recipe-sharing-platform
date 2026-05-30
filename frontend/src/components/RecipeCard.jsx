import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
   return (
      <div className="card h-100 shadow-sm">
         <div className="card-body">
            <h5 className="card-title">
               {recipe.title}
            </h5>

            <p className="card-text">
               Ingredients:
               {" "}
               {recipe.ingredients?.length}
            </p>

            <p className="card-text">
               Created By:
               {" "}
               {recipe.user?.name}
            </p>

            <Link
               to={`/recipes/${recipe._id}`}
               className="btn btn-primary"
            >
               View Recipe
            </Link>
         </div>
      </div>
   );
};

export default RecipeCard;