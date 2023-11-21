import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ChatRooms = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/channel");
        console.log(response.data);
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
    <section>
      {data.map((room) => (
        <Link key={room._id} to={`/chat/${room._id}`}>
          <h2>{room.name}</h2>
        </Link>
      ))}
      <div>
        <Link to={"/create-room"}>Create new Room</Link>
      </div>
    </section>
  );
};

export default ChatRooms;
