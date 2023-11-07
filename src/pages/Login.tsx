
import React from "react";
import '../assets/css/Login.css';
import {Link} from 'react-router-dom';
const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Bienvenue !</h1>
        <label htmlFor="email">Nom</label>
        <input type="text" id="nom" name="nom" required />
        <Link to="/chat"><button type="submit">Se connecter</button></Link>
      </form>
    </div>
  );
};

export default Login;
