import React, { Component } from "react";
import "./styles.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: "Home",
    };
  }

  handleMenuClick = (menu) => {
    this.setState({ activeMenu: menu });
    this.props.onMenuChange(menu);
  };

  render() {
    return (
      <div className="header">
        <div className="logo">SA инструменты</div>
        <div className="menu">
          <div
            className={`menu-item ${this.state.activeMenu === "Home" ? "active" : ""}`}
            onClick={() => this.handleMenuClick("Home")}
          >
            JSON2Schema
          </div>
        </div>
      </div>
    );
  }
}

export default Header;