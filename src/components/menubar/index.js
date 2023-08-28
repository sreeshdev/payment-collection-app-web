import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";

const MenuBar = () => {
  const location = useLocation();
  return (
    <div>
      <Menu pointing secondary style={{ paddingLeft: "10px" }}>
        <Link to="/home">
          <Menu.Item name="Home" active={location.pathname === "/home"} />
        </Link>
        <Link to="/customer">
          <Menu.Item
            name="Customer"
            active={location.pathname === "/customer"}
          />
        </Link>
      </Menu>
    </div>
  );
};

export default MenuBar;
