import React, { useState } from "react";
import "./DashboardHomePage.css";
import Header from "./Header";
import "@fontsource/judson";
import PortfolioCard from "./PortfolioCard";

const DashboardHomePage = () => {
  // Create an array of portfolio data
  const portfolioDataArray = [
    {
      backgroundImage:
        "https://pngmagic.com/product_images/nature-background-for-desktop_93b.jpeg",
      profileImage:
        "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
      name: "Vijay Sisodiya",
      mobile: "+91-7023136872",
      price1: 5,
      price2: 5000,
      stockAvailability: "Yes",
      location: "New Delhi, India",
    },
    {
      backgroundImage:
        "https://img.pikbest.com/wp/202345/desktop-wallpapers-landscape-background-wallpaper_9578952.jpg!bw700",
      profileImage:
        "https://www.profilebakery.com/wp-content/uploads/2023/04/women-AI-Profile-Picture.jpg",
      name: "Prince jain",
      mobile: "+91-9988776655",
      price1: 10,
      price2: 10000,
      stockAvailability: "No",
      location: "Mumbai, India",
    },
    // Add more items here as needed
    {
      backgroundImage:
        "https://t4.ftcdn.net/jpg/07/87/16/69/360_F_787166948_1YEZeLZl8XTsp6OXXK78rovNTNPC6PoC.jpg",

      name: "Anish kumar roy",
      mobile: "+91-9988776655",
      price1: 10,
      price2: 10000,
      stockAvailability: "No",
      location: "Mumbai, India",
    },
    {
      backgroundImage:
        "https://png.pngtree.com/thumb_back/fw800/background/20240520/pngtree-new-hd-beautiful-photo-editing-image_15804437.jpg",
      profileImage:
        "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
      name: "Garvit singh",
      mobile: "+91-9988776655",
      price1: 10,
      price2: 10000,
      stockAvailability: "No",
      location: "Mumbai, India",
    },
    {
      backgroundImage:
        "https://png.pngtree.com/thumb_back/fw800/background/20240520/pngtree-new-hd-beautiful-photo-editing-image_15804437.jpg",
      profileImage:
        "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
      name: "Aditya jain",
      mobile: "+91-9988776655",
      price1: 10,
      price2: 10000,
      stockAvailability: "No",
      location: "Mumbai, India",
    },
  ];

  const [searchQuery, setSearchQuery] = useState(""); // State for storing search input

  // Filter portfolio data based on the search query
  const filteredPortfolioData = portfolioDataArray.filter((portfolio) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      portfolio.name.toLowerCase().includes(lowerCaseQuery) ||
      portfolio.location.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="DashboardHomePage-main">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="DashboardHomePage-content">
        {filteredPortfolioData.map((portfolioData, index) => (
          <PortfolioCard key={index} {...portfolioData} />
        ))}
      </div>
    </div>
  );
};

export default DashboardHomePage;
