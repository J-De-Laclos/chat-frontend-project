import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../style/ChatRoom.css";

const ChatRoom = ({ username }) => {
  const { channelId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const fetchMessages = async () => {
    try {
      //   console.log("channelId:", channelId);
      //   console.log("username:", username);
      //   console.log("newMessage:", newMessage);
      const response = await axios.get(
        `http://localhost:3000/message/${channelId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [channelId]);

  const handleSendMessage = async () => {
    try {
      await axios.post("http://localhost:3000/message", {
        channelId,
        sender: username,
        content: newMessage,
      });

      // Actualiser la liste des messages après l'envoi du message
      fetchMessages();
      setNewMessage("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="chat-room-container">
      <div className="chatroom-head">
        <h1 className="chat-room-header">Chat Room</h1>
        <button
          onClick={() => {
            navigate("/chatrooms");
          }}
        >
          Back to RoomList
        </button>
      </div>

      <div className="chat-messages-container">
        {messages.map((message) => (
          <div key={message._id}>
            <strong>{message.sender}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="send-message-button" onClick={handleSendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
