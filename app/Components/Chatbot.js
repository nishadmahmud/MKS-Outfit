import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const API_KEY = "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"; // Replace with your OpenAI API key

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Change from "gpt-4" to "gpt-3.5-turbo"
          messages: updatedMessages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      
    
    
      const botMessage = { role: "assistant", content: response.data.choices[0].message.content };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
    
  };

  return (
    <div style={{ width: "300px", margin: "auto", padding: "10px", border: "1px solid gray" }}>
      <div style={{ height: "300px", overflowY: "auto", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
        style={{ width: "80%", padding: "5px" }}
      />
      <button onClick={sendMessage} style={{ width: "18%" }}>Send</button>
    </div>
  );
};

export default Chatbot;
