import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/Home.css";

const Home = ({ handleToken, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const response = await axios.post(
      //   "http://localhost:3000/user/login",
      const response = await axios.post(
        "https://site--backend-chatroom--f5vs5q45f4mj.code.run/user/login",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      handleToken(response.data.token, response.data.username);
      navigate("/chatrooms");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="form-home" onSubmit={handleSubmit}>
      <h1>Welcome to Chat Project Channel</h1>
      {!token ? (
        <div>
          <h2>Se connecter</h2>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input type="submit" value="Se connecter" />
        </div>
      ) : (
        <button
          onClick={() => {
            handleToken(null);
          }}
        >
          Déconnexion
        </button>
      )}

      <Link className="link-home" to="/signup">
        Pas encore de compte ? Inscris-toi !
      </Link>
    </form>
  );
};

export default Home;
