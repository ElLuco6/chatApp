import React, { useState } from 'react';
import { Grid, Container, TextField, Button } from '@mui/material';
import '../assets/css/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  const fakeMessages = [
    { text: 'test', sender: 'other' },
    { text: 'test deux', sender: 'user' },
    { text: 'test 3', sender: 'user' },
    { text: 'test 4', sender: 'other' },
  ];

  return (
    <Container className="chat-container">
      <Grid container spacing={2} className="chat-grid">
        <Grid item xs={12} className="chat-messages" style={{ height: '90%', display:'flex', flexDirection:'column' }}>
          {fakeMessages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'user' ? 'user-message' : 'other-message'}`}
            >
              {msg.text}
            </div>
          ))}
        </Grid>
        <Grid item xs={12} className="chat-input">
          <div style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <TextField
              fullWidth
              type="text"
              id="sendMessage"
              placeholder="Saisissez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '80%' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              style={{ width: '10%', height: '5vh' }}
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
