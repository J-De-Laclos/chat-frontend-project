import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/ChatRooms.css";

const ChatRooms = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get("http://localhost:3000/channel");
        const response = await axios.get(
          "http://site--backend-chatroom--f5vs5q45f4mj.code.run/channel"
        );

        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section className="chatrooms-section">
      <div>
        <Link className="link-chatrooms-create" to={"/create-room"}>
          ➕ Create new Room
        </Link>
      </div>
      {data.map((room) => (
        <Link
          className="link-chatrooms"
          key={room._id}
          to={`/chat/${room._id}`}
        >
          <h2>{room.name}</h2>
        </Link>
      ))}
    </section>
  );
};

export default ChatRooms;
