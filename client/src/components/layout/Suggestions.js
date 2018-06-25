import React, { Component } from "react";

export default class Suggestions extends Component {
  render() {
    const options = this.props.results.map(r => <a>{r.bookTitle}</a>);
    return options.length === 0 ? (
      <div />
    ) : (
      <div
        xPlacement="bottom-start"
        style={{
          position: "absolute",
          right: "5%",
          left: "72%"
        }}
      >
        {options}
      </div>
    );
  }
}
