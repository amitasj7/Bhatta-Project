import React, { useEffect, useState } from "react";
import "./DashboardHomePage.css";
import Header from "./Header";
import "@fontsource/judson";
import PortfolioCard from "./PortfolioCard";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const DashboardHomePage = () => {
  const [portfolioDataArray, setPortfolioDataArray] = useState([]); // Initial state as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state for error messages
  const [searchQuery, setSearchQuery] = useState(""); // State for storing search input
  const [filteredPortfolioData, setFilteredPortfolioData] = useState([]); // Separate state for filtered data

  useEffect(() => {
    // API call to '/brick'
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/bricks/getallbricks`);


        console.log("brick data is: ", response.data.data);
        setPortfolioDataArray(response.data.data); // Set portfolio data in state
        setLoading(false); // Stop loading after data is fetched
      } catch (err) {
        console.error("Error fetching brick data:", err);
        setError(err.message || "Something went wrong!");
        setLoading(false); // Stop loading after error
      }
    };

    fetchData();
  }, []); // Fetch data on component mount

  useEffect(() => {
    // Filter portfolio data based on the search query when data is fetched or searchQuery changes
    if (portfolioDataArray.length > 0) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filteredData = portfolioDataArray.filter((portfolio) => {
        return (
          (portfolio?.userId?.name &&
            portfolio?.userId?.name.toLowerCase().includes(lowerCaseQuery)) ||
          (portfolio?.userId?.location &&
            portfolio?.userId?.location.toLowerCase().includes(lowerCaseQuery))
        );
      });
      setFilteredPortfolioData(filteredData); // Update filtered data state
    }
  }, [portfolioDataArray, searchQuery]); // Runs whenever portfolioDataArray or searchQuery changes

  return (
    <div className="DashboardHomePage-main">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="DashboardHomePage-content">
        {loading && <div className="loading-spinner">Loading...</div>}{" "}
        {/* Loading indicator */}
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Display error message */}
        {filteredPortfolioData.length === 0 && !loading && !error && (
          <div className="no-results">No results found</div> // Message when no data is found
        )}
        {filteredPortfolioData.map((portfolioData, index) => (
          <PortfolioCard
            key={index}
            userId={portfolioData.userId}
            price1={portfolioData.price1}
            price2={portfolioData.price2}
            availability={portfolioData.availability}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardHomePage;
