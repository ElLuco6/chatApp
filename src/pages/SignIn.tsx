
import React,{useState} from "react";
import '../assets/css/Login.css';
import {Link} from 'react-router-dom';
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
        <Link to={`/chat?nom=${nom}`}><button type="submit">Se connecter</button></Link>
      </form>
    </div>
  );
};

export default Login;
