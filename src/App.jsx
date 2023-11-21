import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
//import components
import ChannelList from "./components/ChannelList";

//import pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import ChatRooms from "./pages/ChatRooms";
import CreateRoom from "./pages/CreateRoom";
import ChatRoom from "./pages/ChatRoom";
function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home handleToken={handleToken} />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route path="/chatrooms" element={<ChatRooms token={token} />} />
        <Route path="/create-room" element={<CreateRoom token={token} />} />
        <Route path="/chat/:channelId" element={<ChatRoom token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
