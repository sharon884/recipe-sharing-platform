import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";

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
                        <RecipeCard
                            recipe={recipe}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;