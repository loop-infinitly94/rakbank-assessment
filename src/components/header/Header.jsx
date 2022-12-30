import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <div className="headerContainer">
        <div className="headerDrawer">
          <span>User</span>
          <MenuIcon />
        </div>
      </div>
    </header>
  );
}
