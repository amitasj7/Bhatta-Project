import React from "react";

import "./MainContent.css";

import home from "../assets/Images/home.png";
import family from "../assets/Images/family.png";
import truckLogo from "../assets/Images/noto_delivery-truck.png";
import Button from "./Button";

const MainContent = () => {
  return (
    <>
      <div className="main-content">
        {/* DetailsContent */}
        <div className="details-content">
          <h1>Brickflow</h1>
          <div className="del">
            <div className="delivery">Fastest Delivery & Easy Pickup</div>
            <img src={truckLogo} alt="trucklogo png" className="truck-logo" />
          </div>
          <hr className="custom-divider" />

          <p>Find the right bricks fast for your home-building journey.</p>

          <Button
            name="Make an Order"
            borderRadius="41px"
            route="/authentication"
          />
        </div>
        {/* ImageCotent */}
        <div className="image-content">
          <div>
            <img src={home} alt="home image" />
          </div>
          <div>
            <img src={family} alt="family image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
