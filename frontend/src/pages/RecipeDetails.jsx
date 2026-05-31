import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { getRecipeImage } from "../services/mealDbService";

const RecipeDetails = () => {
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(true);


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

            setImageLoading(true);

            const image =
                await getRecipeImage(
                    recipe.title
                );

            setImageUrl(image);

            setImageLoading(false);
        };

        fetchRecipeImage();
    }, [recipe]);

    if (loading) {
        return (
            <div className="container mt-5 py-5 text-center">
                <div className="spinner-border text-orange" style={{ color: "var(--primary)" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h5 className="mt-3 text-muted">Preparing Recipe Details...</h5>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger shadow-sm rounded">
                    {error}
                </div>
                <Link to="/" className="btn btn-recipe-outline mt-3">Back to Dashboard</Link>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="container mt-5 text-center">
                <h3>Recipe Not Found</h3>
                <Link to="/" className="btn btn-recipe-outline mt-3">Back to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="container mt-4 pb-5">
            <div className="d-flex align-items-center mb-4">
                <Link to="/" className="btn btn-recipe-outline shadow-sm d-flex align-items-center gap-1">
                    <span>←</span> Back to Dashboard
                </Link>
            </div>

            <div className="card border-0 shadow-md overflow-hidden" style={{ borderRadius: "var(--radius-lg)" }}>
                <div className="row g-0">
                    <div className="col-lg-5">
                        <div className="h-100 position-relative" style={{ minHeight: "350px", backgroundColor: "#f1f5f9" }}>
                            {imageLoading ? (
                                <div
                                    className="d-flex justify-content-center align-items-center h-100"
                                    style={{ minHeight: "350px" }}
                                >
                                    <div
                                        className="spinner-border"
                                        style={{ color: "var(--primary)" }}
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={imageUrl}
                                    alt={recipe.title}
                                    className="w-100 h-100 position-absolute"
                                    style={{
                                        objectFit: "cover",
                                        top: 0,
                                        left: 0,
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="card-body p-4 p-md-5">
                            <span className="badge bg-light text-primary border px-3 py-2 rounded-pill mb-3" style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--primary)", borderColor: "var(--primary-border)" }}>
                                🍽️ Gourmet Share Signature
                            </span>

                            <h1 className="display-6 fw-extrabold text-dark mb-4" style={{ letterSpacing: "-0.03em" }}>
                                {recipe.title}
                            </h1>

                            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 mb-4 border">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center bg-white text-dark border"
                                    style={{ width: "45px", height: "45px", fontSize: "1.3rem" }}
                                >
                                    👨‍🍳
                                </div>
                                <div>
                                    <div className="small text-muted">Created By</div>
                                    <div className="fw-bold text-dark">{recipe.user?.name || "Unknown Chef"}</div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                                    <span>🛒</span> Ingredients
                                </h4>
                                <p className="small text-muted mb-3">Check off ingredients as you prepare them:</p>
                                <div className="row g-2">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <div key={index} className="col-md-6">
                                            <div className="p-2.5 bg-light rounded border d-flex align-items-center gap-2">
                                                <input
                                                    className="form-check-input mt-0"
                                                    type="checkbox"
                                                    id={`ing-${index}`}
                                                    style={{ cursor: "pointer", width: "18px", height: "18px" }}
                                                />
                                                <label
                                                    className="form-check-label text-dark small"
                                                    htmlFor={`ing-${index}`}
                                                    style={{ cursor: "pointer", userSelect: "none" }}
                                                >
                                                    {ingredient}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                                    <span>📝</span> Preparation Instructions
                                </h4>
                                <div className="p-4 bg-light rounded-3 border" style={{ whiteSpace: "pre-line", lineHeight: "1.8", color: "var(--text-main)" }}>
                                    {recipe.instructions}
                                </div>
                            </div>

                            {isOwner && (
                                <div className="mt-4 pt-3 border-top d-flex gap-2">
                                    <Link
                                        to={`/edit/${recipe._id}`}
                                        className="btn btn-recipe-primary px-4 py-2 shadow-sm d-flex align-items-center gap-2"
                                    >
                                        ✏️ Edit Recipe Details
                                    </Link>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;