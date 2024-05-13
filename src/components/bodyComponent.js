import React, { Component } from "react";
import "./styles.css";
import JsonTextArea from "./jsonTextAreaComponent";
import DataTable from "./dataTableComponent";
import Slider from "./sliderComponent";

class Body extends Component {
  state = {
    jsonData: []
  };

  handleJsonDataChange = (jsonData) => {
    this.setState({ jsonData });
  };

  render() {
    const { activeMenu } = this.props;
    const { jsonData } = this.state;

    let content;
    switch (activeMenu) {
      case "Home":
        content = <div>This is the home content</div>;
        break;
      case "About":
        content = <div>This is the about content</div>;
        break;
      case "Contact":
        content = <div>This is the contact content</div>;
        break;
      default:
        content = null;
    }

    return (
      <div>
        <div className="body-title">
          {content}
        </div>
        <div className="body-container">
          <div className="json-text-area-container">
            <JsonTextArea onJsonDataChange={this.handleJsonDataChange} />
          </div>
          <Slider />
          <div className="data-table-container">
            <DataTable data={jsonData} />
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
