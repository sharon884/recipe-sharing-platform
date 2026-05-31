import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
   const navigate = useNavigate();

   const user = JSON.parse(
      localStorage.getItem("user")
   );

   const handleLogout = () => {
      localStorage.removeItem("user");

      navigate("/login");
   };

   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="container">

            <Link
               className="navbar-brand"
               to="/"
            >
               Recipe Sharing Platform
            </Link>

            <div className="d-flex align-items-center gap-2">

               <Link
                  to="/create"
                  className="btn btn-success"
               >
                  Create Recipe
               </Link>

               {user && (
                  <button
                     onClick={handleLogout}
                     className="btn btn-danger"
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