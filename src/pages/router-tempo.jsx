// Import des bibliothèques nécessaires
import React, { useState, useEffect } from "react";
import { Grid, Container, TextField, Button } from "@mui/material";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import socketIO from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Chat2 from "./chans/Chat2.jsx";
const socket = socketIO.connect("http://localhost:3000");

const onConnect = () => {
  console.log("Connected socket");
  console.log(socket.id);
};

socket.on("connect", onConnect);

socket.on("message", function (data) {
  console.log("message", data);
});

const Channel = () => {
  return (
    <Container
      style={{ width: "30%", height: "100vh", backgroundColor: "red" }}
    >
      <h1>Channel</h1>
    </Container>
  );
};

const ChatContent = ({
  messages,
  handleSendMessage,
  message,
  handleKeyPress,
  BtnDeco,
  nom,
}) => {
  return (
    <Container className="chat-container" style={{ width: "70%" }}>
      <div
        style={{
          width: "100%",
          height: "5%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          margin: 0,
          padding: "1vh",
        }}
      >
        <button
          type="submit"
          onClick={BtnDeco}
          style={{ width: "10%", marginRight: "1vh" }}
        >
          Se deco
        </button>

        <h2>User {nom}</h2>
      </div>
      <hr />
      <Grid container spacing={2} className="chat-grid">
        <Grid
          item
          xs={12}
          className="chat-messages"
          style={{ height: "75%", display: "flex", flexDirection: "column" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === "user" ? "user-message" : "other-message"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </Grid>
        <Grid item xs={12} className="chat-input">
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              type="text"
              id="sendMessage"
              placeholder="Saisissez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ width: "80%" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              style={{ width: "10%", height: "5vh" }}
            >
              Envoyer
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nom, setNom] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nomParam = searchParams.get("nom");

    if (nomParam) {
      setNom(nomParam);
    }
  }, []);

  const BtnDeco = () => {
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
    alert("Déconnecté");
    navigate("/");
  };

  const handleSendMessage = () => {
    if (message) {
      setMessages([...messages, { text: message, sender: { nom } }]);
      setMessage("");
      socket.emit("message", [nom, message]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Router>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: 0,
        }}
      >
        <Route path="/channel" component={Channel} />

        <Route
          path="/chat"
          render={() => (
            <ChatContent
              messages={messages}
              handleSendMessage={handleSendMessage}
              message={message}
              handleKeyPress={handleKeyPress}
              BtnDeco={BtnDeco}
              nom={nom}
            />
          )}
        />

        <Route
          path="/chat2"
          render={() => (
            <Chat2
              messages={messages}
              handleSendMessage={handleSendMessage}
              message={message}
              handleKeyPress={handleKeyPress}
              BtnDeco={BtnDeco}
              nom={nom}
            />
          )}
        />
      </Container>
    </Router>
  );
};

export default Chat;
