
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authslice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); 

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px", backgroundColor: "#f0f0f0" }}>
      {!user ? ( 
        <Link to="/">Login</Link>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/products">Products</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
