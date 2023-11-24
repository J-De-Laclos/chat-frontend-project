import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/CreateRoom.css";

const CreateRoom = ({ token }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3000/channel", { name });
      // Rediriger vers la liste des salons après la création réussie
      navigate("/chatrooms");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="create-room-container">
      <h1>Create a New Room</h1>
      <form className="create-room-form" onSubmit={handleSubmit}>
        <label>
          Room Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default CreateRoom;
