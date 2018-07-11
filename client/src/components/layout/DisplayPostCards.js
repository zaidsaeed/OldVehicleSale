import React, { Component } from "react";
import PostCard from "./PostCard";
import Search from "./Search";

export default class DisplayPostCards extends Component {
  render() {
    const { searchResults } = this.props.location.state;
    const cards = searchResults.map(result => {
      return <PostCard model={result} />;
    });

    return (
      <div>
        <Search />
        <br />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto auto",
            marginLeft: "40px",
            marginRight: "40px"
          }}
        >
          {cards}
        </div>
      </div>
    );
  }
}
