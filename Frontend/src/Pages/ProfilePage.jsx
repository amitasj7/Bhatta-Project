import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoSearchSharp } from "react-icons/io5";
import "./ProfilePage.css"; // Ensure to create this CSS file or adjust as needed

import { ChatPage } from "./ChatPage";

export const ProfilePage = () => {
  const baseUrl = "http://localhost:5000/api/v1";
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/bricks/getallbricks`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleSearchBar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChatClick = (userId) => {
    setActiveChatId(userId);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term
  };

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    const nameMatch = item.userId.name.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = item.userId.location.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || locationMatch; // Include if name or location matches
  });

  return (
    <div className="container">
      <div className="sidebar">
        <div className="profilePhoto"></div>
        <p>Name: Amit Sisodiya</p>
        <p>Phone: 123-456-7890</p>
        <p>Email: amitasj7570@example.com</p>
        <p>Location: City, Country</p>
      </div>

      <div className="mainContent">
        <div className="navbar">
          {isOpen && (
            <div className={`searchBar ${isOpen ? "open" : "close"}`}>
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm} // Bind the search term
                onChange={handleSearchChange} // Update search term on change
              />
            </div>
          )}
          <IoSearchSharp
            className="search-icon"
            size="1.5rem"
            color="gray"
            onClick={toggleSearchBar}
          />
        </div>

        <div className="contentArea">
          {activeChatId ? (
            <ChatPage userId={activeChatId} setActiveChatId={setActiveChatId} />
          ) : (
            <div className="cardContainer">
              {filteredData.length === 0 ? (
                <div className="">No results found.</div>
              ) : (
                filteredData.map((item) => (
                  <Link
                    to={`/profile/chat/${item.userId._id}`}
                    onClick={() => handleChatClick(item.userId._id)}
                    key={item._id}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="card">
                      <div className="profileSection">
                        <div>
                          <img src="link of database" alt="databaselink" />
                        </div>
                        <div className="profileDetails">
                          <div className="nameEmailPair">
                            <p>
                              <strong>Name : &nbsp;</strong> {item.userId.name}
                            </p>
                            <p>
                              <strong>Email : &nbsp;</strong> {item.userId.email}
                            </p>
                          </div>
                          <div className="location">
                            <p>
                              <strong>Location : &nbsp;</strong>{" "}
                              {item.userId.location}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>Chatting</div>
                      <div className="detailsSection">
                        <p className="priceInfo">
                          Price 1 : &nbsp;&nbsp;{item.price1} ₹
                        </p>
                        <h5 className="priceInfo">
                          Price 2 : &nbsp;&nbsp;{item.price2} ₹
                        </h5>
                        <p className="availabilityInfo">
                          Availability : &nbsp;{item.availability ? "YES" : "NO"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
