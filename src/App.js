import React, { Component } from "react";
import Header from "./components/headerComponent";
import Body from "./components/bodyComponent";

class App extends Component {
  state = {
    activeMenu: "home",
  };

  handleMenuChange = (menu) => {
    this.setState({ activeMenu: menu });
  };

  render() {
    return (
      <div className="App">
        <Header onMenuChange={this.handleMenuChange} />
        <Body activeMenu={this.state.activeMenu}/>
      </div>
    );
  }
}

export default App;