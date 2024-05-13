import React, { Component } from "react";
import "./styles.css";
import { generateJsonSchema } from "../functions/jsonSchemaGenerator";

class JsonTextArea extends Component {
  state = {
    value: ``,
    isValid: true,
    selectedLine: null,
    jsonSchema: []
  };

  handleChange = (event) => {
    const value = event.target.value;
    try {
      const jsonData = JSON.parse(value);
      const jsonSchema = generateJsonSchema(jsonData);
      this.setState({ value, isValid: true, jsonSchema }); // Обновляем состояние с JSON-схемой
      this.props.onJsonDataChange(jsonSchema); // Передаем валидные данные в родительский компонент
    } catch (error) {
      this.setState({ value, isValid: false, jsonSchema: [] });
      this.props.onJsonDataChange([]);
    }
  };

  handleLineReset = () => {
    this.setState({ selectedLine: null });
  };

  handleFormat = () => {
    try {
      const formattedJson = JSON.stringify(
        JSON.parse(this.state.value),
        null,
        4
      );
      this.setState({ value: formattedJson, isValid: true });
    } catch (error) {
      // Ignore errors, as the JSON is already validated in handleChange
    }
  };

  handleLineClick = (lineNumber) => {
    this.setState({ selectedLine: lineNumber });
    this.focusOnLine(lineNumber);
  };

  focusOnLine = (lineNumber) => {
    const textarea = this.textareaRef.current;
    const lines = this.state.value.split("\n");
    let start = 0;
    for (let i = 0; i < lineNumber - 1; i++) {
      start += lines[i].length + 1; // Add 1 for the newline character
    }
    const end = start + lines[lineNumber - 1].length;
    textarea.setSelectionRange(start, end);
    textarea.focus();
  };

  textareaRef = React.createRef();

  render() {
    const { value, isValid, selectedLine } = this.state;
    const lines = value.split("\n");

    return (
      <div>
        <button
          className="format-button"
          disabled={!isValid}
          onClick={this.handleFormat}
        >
          <span className="material-symbols-outlined">wrap_text</span>
        </button>
        <div className="json-text-area">
          <div className="line-numbers">
            {lines.map((_, i) => (
              <div
                key={i}
                className={`line-number ${
                  selectedLine === i + 1 ? "selected" : ""
                }`}
                onClick={() => this.handleLineClick(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <textarea
            ref={this.textareaRef}
            className={`json-textarea ${isValid ? "" : "invalid"}`}
            value={value}
            onChange={this.handleChange}
            onClick={this.handleLineReset}
            style={{
              height: `${lines.length * 22}px`,
            }}
          />
        </div>
          {!isValid && (
            <div className="error-message">JSON невалиден</div>
          )}
      </div>
    );
  }
}

export default JsonTextArea;
