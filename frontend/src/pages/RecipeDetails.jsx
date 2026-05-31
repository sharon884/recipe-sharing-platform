import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { getRecipeImage } from "../services/mealDbService";



const RecipeDetails = () => {
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const isOwner =
        user?._id === recipe?.user?._id;



    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data =
                    await getRecipeById(id);

                setRecipe(data);

            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to fetch recipe"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);


    useEffect(() => {
        const fetchRecipeImage = async () => {

            if (!recipe?.title) return;

            const image =
                await getRecipeImage(
                    recipe.title
                );

            setImageUrl(image);
        };

        fetchRecipeImage();
    }, [recipe]);


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

    if (!recipe) {
        return (
            <div className="container mt-5">
                <h3>Recipe Not Found</h3>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">

                    <img
                        src={imageUrl}
                        alt={recipe.title}
                        className="img-fluid rounded mb-4 w-100"
                        style={{
                            maxHeight: "400px",
                            objectFit: "cover",
                        }}
                    />

                    <h2 className="mb-4">
                        {recipe.title}
                    </h2>

                    <h4>Ingredients</h4>

                    <ul>
                        {recipe.ingredients.map(
                            (ingredient, index) => (
                                <li key={index}>
                                    {ingredient}
                                </li>
                            )
                        )}
                    </ul>

                    <h4 className="mt-4">
                        Instructions
                    </h4>

                    <p>
                        {recipe.instructions}
                    </p>

                    <h5 className="mt-4">
                        Created By:
                        {" "}
                        {recipe.user?.name}
                    </h5>

                    {isOwner && (
                        <Link
                            to={`/edit/${recipe._id}`}
                            className="btn btn-warning mt-3"
                        >
                            Edit Recipe
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;