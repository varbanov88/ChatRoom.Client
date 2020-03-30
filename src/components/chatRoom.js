import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

export default function ChatRoom({
  roomName,
  nickname,
  sendMessage,
  messages
}) {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (text.length > 0) {
      sendMessage(text);
      setText("");
    }
  };
  return (
    <div>
      <h4>{`${nickname}, you are in ${roomName} chat room`}</h4>
      {messages.length > 0 &&
        messages.map(message => (
          <div key={message.id}>
            {message.nickname}: {message.messageText}
          </div>
        ))}
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            value={text}
            onChange={event => setText(event.target.value)}
            label="message"
            fullWidth
          />
        </div>
        <br />
        <div>
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
