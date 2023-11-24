import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/Header.css";

const Header = ({ username, token, handleToken }) => {
  // console.log(username);

  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const darkMode = () => {
    const body = document.body;
    body.classList.toggle("dark-mode");
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="header-container">
      {username ? <p>Bienvenue, {username} !</p> : <p>Bienvenue !</p>}
      <button
        className="dark-mode-button"
        id="darkMode"
        onClick={() => {
          darkMode();
        }}
      >
        {isDarkMode ? "Light" : "Dark"}
      </button>
      {token ? (
        <button
          className="logout-button"
          onClick={() => {
            handleToken(null);
            navigate("/");
          }}
        >
          Déconnexion
        </button>
      ) : null}
    </div>
  );
};

export default Header;
