import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Make sure this import exists and points to the correct file

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('docspotUser'));

  const handleLogout = () => {
    localStorage.removeItem('docspotUser');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="logo">DocSpot</div>
      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Header;
