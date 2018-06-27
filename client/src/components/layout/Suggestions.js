import React, { Component } from "react";

export default class Suggestions extends Component {
  render() {
    const options = this.props.results.map(r => (
      <a
        style={{
          display: "block",
          padding: "10px",
          border: "1px #e9eaeb solid",
          boxShadow: "0 2px 1px 0 rgba(0,0,0,.2)"
        }}
      >
        {r.bookTitle}
      </a>
    ));
    return options.length === 0 ? (
      <div />
    ) : (
      <div
        xPlacement="bottom-start"
        style={{
          position: "absolute"
        }}
      >
        {options}
      </div>
    );
  }
}
