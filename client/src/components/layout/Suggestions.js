import React, { Component } from "react";

export default class Suggestions extends Component {
  render() {
    const options = this.props.results.map(r => (
      <a style={{ display: "block" }}>{r.bookTitle}</a>
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
