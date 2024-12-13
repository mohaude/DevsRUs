import React, { useState, useEffect } from 'react';
import '../styles/Chat.css';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Mock conversations data - would be replaced with API call
    const mockConversations = [
      {
        id: 1,
        user: {
          name: "Jane Smith",
          avatar: "/avatars/jane.jpg",
          title: "Senior Developer"
        },
        lastMessage: "Thanks for connecting!",
        timestamp: "2 hours ago"
      },
      {
        id: 2,
        user: {
          name: "John Doe",
          avatar: "/avatars/john.jpg",
          title: "Tech Lead"
        },
        lastMessage: "Would you be interested in...",
        timestamp: "1 day ago"
      }
    ];
    setConversations(mockConversations);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      content: message,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="conversations-list">
        <div className="chat-header">
          <h2>Messages</h2>
          <button className="new-message-btn">New Message</button>
        </div>
        {conversations.map(conv => (
          <div 
            key={conv.id} 
            className={`conversation-item ${currentChat?.id === conv.id ? 'active' : ''}`}
            onClick={() => setCurrentChat(conv)}
          >
            <img src={conv.user.avatar} alt={conv.user.name} className="avatar" />
            <div className="conversation-info">
              <h3>{conv.user.name}</h3>
              <p className="title">{conv.user.title}</p>
              <p className="last-message">{conv.lastMessage}</p>
            </div>
            <span className="timestamp">{conv.timestamp}</span>
          </div>
        ))}
      </div>

      <div className="chat-messages">
        {currentChat ? (
          <>
            <div className="chat-header">
              <img src={currentChat.user.avatar} alt={currentChat.user.name} className="avatar" />
              <div>
                <h3>{currentChat.user.name}</h3>
                <p>{currentChat.user.title}</p>
              </div>
            </div>
            <div className="messages-container">
              {messages.map(msg => (
                <div key={msg.id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                  <p>{msg.content}</p>
                  <span className="timestamp">{msg.timestamp}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="message-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
