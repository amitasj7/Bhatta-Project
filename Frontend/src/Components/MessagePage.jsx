import React, { useState, useEffect } from "react";
import "./MessagePage.css";
import ChatComponent from "./ChatComponent";
import axios from "axios"; // Import axios for API requests
import { useLocation, useNavigate } from "react-router-dom"; // UseNavigate instead of useHistory
import { FaUserCircle } from "react-icons/fa"; // Fallback icon
const baseUrl = import.meta.env.VITE_BASE_URL;

const MessagePage = () => {
  // Retrieve user data from localStorage
  const loginUser = JSON.parse(localStorage.getItem("userData"));
  console.log("login user", loginUser);

  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const queryParams = new URLSearchParams(location.search);
  const chatUserId = queryParams.get("user"); // Extract chatUserId from URL

  const [contacts, setContacts] = useState([]); // Store all contacts (users with whom the logged-in user has chatted)
  const [messages, setMessages] = useState([]); // Store chat messages
  const [selectedContact, setSelectedContact] = useState(null); // Currently selected contact for chat

  // Fetch all chat users (contacts) that the logged-in user has interacted with
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Fetch previous chats of the logged-in user to find all users involved in conversations
        const messagesResponse = await axios.get(
          `${baseUrl}/messages/${loginUser._id}`
        );
        const allMessages = messagesResponse.data.loginUser.messages;
        console.log("all message", allMessages);

        // Assuming allMessages contains an array of objects with users, we can filter the users based on the messages they are involved in
        // Extracting the contacts from allMessages
        const contactsData = allMessages.map((message) => {
          return {
            _id: message._id,
            name: message.name,
            profile_photo: message.profile_photo,
          };
        });

        setContacts(contactsData); // Update the contacts state with the extracted data

        // Automatically select the contact if `chatUserId` is present in the URL
        if (chatUserId) {
          const response = await axios.get(`${baseUrl}/messages/${chatUserId}`);
          const chatUser = response.data.loginUser;

          // Create contact object
          const contactToAdd = {
            _id: chatUser._id,
            name: chatUser.name,
            profile_photo: chatUser.profile_photo,
          };

          // Check if contact already exists in the list
          const contactExists = contacts.some(
            (contact) => contact._id === contactToAdd._id
          );

          if (!contactExists) {
            setContacts((prevContacts) => [contactToAdd, ...prevContacts]); // Add new contact only if not present
          }

          // Set the selected contact
          setSelectedContact(contactToAdd);
        }
      } catch (error) {
        console.error("Error fetching contacts data:", error);
      }
    };

    fetchContacts();
  }, [loginUser._id, chatUserId]); // Adding `chatUserId` as a dependency to re-run effect when the URL changes

  // Fetch previous messages with the selected contact
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedContact) {
        try {
          const messagesResponse = await axios.get(
            `${baseUrl}/messages/${loginUser._id}/${selectedContact._id}`
          );
          setMessages(messagesResponse.data.messages); // Store chat messages
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [selectedContact, loginUser._id]);

  // Handle contact selection
  const onContactSelect = (contact) => {
    setSelectedContact(contact);
    // Update URL to reflect the selected contact
    navigate(`/dashboard/messages?user=${contact._id}`); // Use `navigate` instead of `history.push`
  };

  return (
    <div className="message-page">
      <div className="message-drawer">
        <h3>Contacts</h3>
        <ul>
          {contacts.map((contact) => (
            <li
              key={contact._id}
              className="contact-item"
              onClick={() => onContactSelect(contact)}
            >
              <div className="contact-photo">
                {contact.profile_photo ? (
                  <img src={contact.profile_photo} alt={contact.name} />
                ) : (
                  <FaUserCircle className="fallback-icon" />
                )}
              </div>
              <div className="contact-details">
                <h4>{contact.name}</h4>
                <p>Start a conversation</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="message-section2">
        <h2>Messages</h2>
        {selectedContact ? (
          <ChatComponent
            selectedContact={selectedContact}
            loginUser={loginUser}
          />
        ) : (
          <div className="select-contact">
            <p>Please select a contact to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
