import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreateRecipe from "../pages/CreateRecipe";
import RecipeDetails from "../pages/RecipeDetails";
import EditRecipe from "../pages/EditRecipe";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/create"
                    element={
                        <ProtectedRoute>
                            <CreateRecipe />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recipes/:id"
                    element={<RecipeDetails />}
                />

                <Route
                    path="/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditRecipe />
                        </ProtectedRoute>
                    }
                />
                
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;