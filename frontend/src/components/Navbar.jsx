import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const user = JSON.parse(
      localStorage.getItem("user")
   );

   const handleLogout = () => {
      localStorage.removeItem("user");
      navigate("/login");
   };

   return (
      <nav className="navbar navbar-expand-lg custom-navbar py-3">
         <div className="container">

            <Link
               className="navbar-brand"
               to="/"
            >
               <span>Gourmet</span>Share 🍳
            </Link>

            <div className="d-flex align-items-center gap-3">

               {user && (
                  <div className="d-flex align-items-center gap-2 me-2">
                     <div 
                        className="rounded-circle d-flex align-items-center justify-content-center bg-light text-dark font-weight-bold border" 
                        style={{ width: "38px", height: "38px", fontSize: "1.1rem" }}
                     >
                        👨‍🍳
                     </div>
                     <span className="d-none d-md-inline text-dark font-weight-bold">
                        Chef {user.name}
                     </span>
                  </div>
               )}

               <Link
                  to="/create"
                  className="btn btn-recipe-primary shadow-sm"
               >
                  Create Recipe
               </Link>

               {user && (
                  <button
                     onClick={handleLogout}
                     className="btn btn-recipe-secondary shadow-sm"
                  >
                     Logout
                  </button>
               )}

            </div>

         </div>
      </nav>
   );
};

export default Navbar;