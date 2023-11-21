import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { channelId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    try {
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
        sender: "User",
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
    <div>
      <h1>Chat Room</h1>
      <div>
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
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default ChatRoom;
