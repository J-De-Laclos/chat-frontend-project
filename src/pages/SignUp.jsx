import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../style/SignUp.css";
const SignUp = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const response = await axios.post("http://localhost:3000/user/signup"
      const response = await axios.post(
        "https://site--backend-chatroom--f5vs5q45f4mj.code.run/user/signup",
        {
          email,
          username,
          password,
        }
      );
      //   console.log(response.data);
      handleToken(response.data.token, response.data.account.username);
      navigate("/chatrooms");
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          "Ce mail est déjà utilisé, veuillez en choisir un autre :)"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs :)");
      }
    }
  };

  return (
    <section className="section-signup">
      <form className="form-signup" onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Email"
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
        <input type="submit" value="S'inscrire" />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <Link className="link-signup" to="/">
        You have already an account? Click here
      </Link>
    </section>
  );
};

export default SignUp;
