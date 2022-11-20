import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = (e) => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Notes</h1>
        </Link>
        <nav>
          {user && (
            <div>
            <span>{user.email}</span> &nbsp; &nbsp;
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
