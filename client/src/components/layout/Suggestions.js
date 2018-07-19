import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Suggestions extends Component {
  render() {
    const options = this.props.results.map(r => (
      <a
        style={{
          display: "block",
          padding: "10px",
          border: "1px #e9eaeb solid",
          boxShadow: "0 2px 1px 0 rgba(0,0,0,.2)",

          backgroundColor: "#ffffff"
        }}
        onClick={() => {
          this.props.clearSuggestions();
        }}
      >
        {r.model}
      </a>
    ));
    return options.length === 0 ? (
      <div />
    ) : (
      <Link
        to={{
          pathname: "/searchResults",
          state: { searchResults: this.props.results }
        }}
      >
        <div
          xPlacement="bottom-start"
          style={{
            position: "absolute",
              zIndex: "1"
          }}
        >
          {options}
        </div>
      </Link>
    );
  }
}
