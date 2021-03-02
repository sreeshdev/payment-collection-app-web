import React from "react";
import "./index.scss";
import NavLogo from "../../assets/icon.png";
import { Button, Popup, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav-bar">
      <div className="logo">
        <img src={NavLogo} alt="Company Logo" width="40" />
      </div>
      <Popup
        on="click"
        pinned
        position="bottom right"
        trigger={
          <div className="nav-right">
            <h3 className="username">Hi, Dishhobby Admin</h3>
          </div>
        }
      >
        <div className="popup">
          <div className="name">
            <Icon size="big" name="user circle" />
            Dishhobby Admin
          </div>
          <Link to="/" onClick={() => localStorage.removeItem("token")}>
            <button className="pop-but">Sign Out</button>
          </Link>
        </div>
      </Popup>
    </div>
  );
};

export default Header;
