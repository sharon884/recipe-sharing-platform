import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";

const Dashboard = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user?.name || "Chef";

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
                <div className="row">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="col-sm-6 col-md-4 mb-4">
                            <div className="card recipe-card-premium border-0 shadow-sm" style={{ height: "320px" }}>
                                <div className="skeleton-loader w-100" style={{ height: "180px" }}></div>
                                <div className="card-body">
                                    <div className="skeleton-loader mb-3" style={{ height: "24px", width: "70%", borderRadius: "var(--radius-sm)" }}></div>
                                    <div className="skeleton-loader mb-2" style={{ height: "16px", width: "40%", borderRadius: "var(--radius-sm)" }}></div>
                                    <div className="skeleton-loader" style={{ height: "16px", width: "55%", borderRadius: "var(--radius-sm)" }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger py-3 rounded shadow-sm">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="welcome-banner text-start mb-5">
                <h1 className="display-6 fw-bold text-white mb-2">Welcome Back, Chef {userName}! 👋</h1>
                <p className="text-white-50 mb-0">Discover amazing new recipes or share your culinary masterpieces with our global community.</p>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0 fw-bold">Explore Recipes</h3>
                <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm">
                    {recipes.length} {recipes.length === 1 ? 'Recipe' : 'Recipes'} Available
                </span>
            </div>

            {recipes.length === 0 ? (
                <div className="text-center py-5 px-4 my-5 bg-white border rounded shadow-sm" style={{ borderRadius: "var(--radius-md)" }}>
                    <div className="display-1 text-muted mb-3">🍽️</div>
                    <h4 className="fw-bold mb-2">No Recipes Shared Yet</h4>
                    <p className="text-muted mb-4 max-width-500 mx-auto">
                        Be the pioneer of good taste! Write and publish your favorite recipe now and inspire other home cooks.
                    </p>
                    <Link to="/create" className="btn btn-recipe-primary px-4 py-2 shadow-sm">
                        Add Your First Recipe
                    </Link>
                </div>
            ) : (
                <div className="row">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="col-sm-6 col-md-4 mb-4"
                        >
                            <RecipeCard
                                recipe={recipe}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;