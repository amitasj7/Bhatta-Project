import React, { useState } from "react";
import "./MessagePage.css";
import ChatComponent from "./ChatComponent";

// Sample message data
const messages = [
  {
    name: "John Doe",
    profilePhoto:
      "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
    lastMessage: "Hey, how are you?",
  },
  {
    name: "Jane Smith",
    profilePhoto:
      "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
    lastMessage: "Let's meet tomorrow.",
  },
  {
    name: "Alice Johnson",
    profilePhoto:
      "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
    lastMessage: "Looking forward to the project.",
  },
  // Add more messages as needed
];

const MessagePage = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const onContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="message-page">
      <div className="message-drawer">
        <h3>Contacts</h3>
        <ul>
          {messages.map((message, index) => (
            <li
              key={index}
              className="contact-item"
              onClick={() => onContactSelect(message)}
            >
              <img
                src={message.profilePhoto}
                alt={message.name}
                className="contact-photo"
              />
              <div>
                <h4>{message.name}</h4>
                <p>{message.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="message-section2">
        <h2>Messages</h2>
        <ChatComponent selectedContact={selectedContact} />
      </div>
    </div>
  );
};

export default MessagePage;
