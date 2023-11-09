import React, { useState } from "react";
import { Grid, Container, TextField, Button } from "@mui/material";

import "../assets/css/Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [nom, setNom] = useState("");
  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Bienvenue !</h1>
        <label htmlFor="email">Nom</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <Link to={`/chat?nom=${nom}`}>
          <button type="submit" style={{ width: "100%", backgroundColor:'#0F3C4F' }}>
            Se connecter
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
