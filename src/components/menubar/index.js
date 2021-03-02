import React from "react";
import { Link } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";

const MenuBar = ({ activeItem }) => {
  return (
    <div>
      <Menu pointing secondary style={{ paddingLeft: "10px" }}>
        <Link to="/home">
          <Menu.Item name="Home" active={activeItem === "home"} />
        </Link>
        <Link to="/plan">
          <Menu.Item name="Customer" active={activeItem === "customer"} />
        </Link>
      </Menu>
    </div>
  );
};

export default MenuBar;
