import React, { useState, useEffect } from "react";
import { Grid, Container, TextField, Button } from "@mui/material";
import "../assets/css/Chat.css";
import socketIO from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = socketIO.connect("http://localhost:3000");

const Chat = () => {
  const [channelChoice, setChannelChoice] = useState("channel1");

  const [channels, setChannels] = useState([
    "channel1",
    "channel2",
    "channel3",
    "channel4",
  ]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nom, setNom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nomParam = searchParams.get("nom");
    const savedChannelChoice = localStorage.getItem("channelChoice");
    const savedMessages = JSON.parse(localStorage.getItem(savedChannelChoice));

    if (nomParam) {
      setNom(nomParam);
    }

    if (savedMessages) {
      setMessages(savedMessages);
    }

    console.log(channelChoice);
    socket.on("message." + channelChoice, function (data) {
      console.log("socket on");
      const [senderNom, receivedMessage] = data;
      console.log("data" + data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: receivedMessage, sender: { nom: senderNom } },
      ]);
      saveToLocalStorage();
    });

    return () => {
      socket.off("message." + channelChoice);
    };
  }, [channelChoice, channels]);

  const saveToLocalStorage = () => {
    localStorage.setItem(channelChoice, JSON.stringify(messages));
  };

  const getLocalStorage = () => {
    const recipe = localStorage.getItem(channelChoice);
    if (recipe) {
      setMessages(JSON.parse(recipe));
    }
  };

  const BtnDeco = () => {
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
    alert("Deconnected");
    localStorage.clear();
    navigate("/");
  };

  const handleSendMessage = () => {
    if (message) {
      setMessage("");
      socket.emit("message", [nom, message, channelChoice]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: 0,
      }}
    >
      <Container className="containerLeft">
        <div
          style={{
            width: "100%",
            height: "60%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2>{channelChoice}</h2>

          {channels.map((channel, index) => (
            <div
              key={index}
              className="ChannelView"
              onClick={() => {
                setChannelChoice(channel);
                setMessages([]);
                console.log("CHANNEL CHOICE" + channelChoice);
                saveToLocalStorage();
              }}
            >
              <h3> {channel}</h3>
            </div>
          ))}
        </div>
        <div style={{ alignSelf: "flex-end", margin: "1vh", width: "100%" }}>
          <button
            type="submit"
            onClick={BtnDeco}
            style={{ width: "100%", marginRight: "1vh" }}
          >
            Se deco
          </button>
        </div>
      </Container>
      <Container className="chat-container" style={{ widht: "75%" }}>
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
          <h2>Mon nom utilisateur : {nom}</h2>
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
                  msg.sender.nom === "user1" ? "user1" : "user2"
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
    </Container>
  );
};

export default Chat;
