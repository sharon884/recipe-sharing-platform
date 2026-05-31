import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (user) {
            navigate("/");
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await registerUser(formData);

            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );

            navigate("/");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center flex-grow-1 py-5" style={{ minHeight: "80vh" }}>
            <div className="row justify-content-center w-100">
                <div className="col-md-5 col-lg-4">
                    <div className="card border-0 shadow-md p-3" style={{ borderRadius: "var(--radius-md)" }}>
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <div 
                                   className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-3"
                                   style={{ width: "60px", height: "60px", fontSize: "2rem", border: "1px solid var(--border)" }}
                                >
                                   🍳
                                </div>
                                <h3 className="mb-1">Create Account</h3>
                                <p className="text-muted small">Join GourmetShare to explore new culinary skills</p>
                            </div>

                            {error && (
                                <div className="alert alert-danger py-2 px-3 small rounded">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Your Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Chef Sharon"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-recipe-primary w-100 py-2 shadow-sm"
                                >
                                    Register
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <p className="small text-muted mb-0">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-decoration-none font-weight-bold" style={{ color: "var(--primary)", fontWeight: "600" }}>
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;