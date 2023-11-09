import React, { useState, useEffect } from "react";
import { Grid, Container, TextField, Button } from "@mui/material";
import "../assets/css/Chat.css";
import socketIO from "socket.io-client";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const socket = socketIO.connect("http://localhost:3000");

  const [nom, setNom] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nomParam = searchParams.get("nom");
    console.log(nomParam);

    if (nomParam) {
      setNom(nomParam);
    }
  }, []);

  const BtnDeco = () => {
    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });
    alert("Deconnected");
    navigate("/");
  };
  const [messages, setMessages] = useState([
    { text: "test", sender: "other" },
    { text: "test deux", sender: "user" },
    { text: "test 3", sender: "user" },
    { text: "test 4", sender: "other" },
  ]);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message) {
      setMessages([...messages, { text: message, sender: { nom } }]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Container className="chat-container">
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

export default Chat;

/*
 <Container style={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Container style={{width:'20%',backgroundColor:'white '}}>
<h1>Raler</h1>
      </Container>
    </Container>*/
