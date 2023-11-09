// Import des bibliothèques nécessaires
import React, { useState, useEffect } from "react";
import { Grid, Container, TextField, Button } from "@mui/material";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import socketIO from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



const ChatContent2 = ({ messages, handleSendMessage, message, handleKeyPress, BtnDeco, nom }) => {
    return (
      <Container className="chat-container" style={{ width: '70%' }}>
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

  export default ChatContent2;