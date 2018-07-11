import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PostCard extends Component {
  render() {
    const { model } = this.props;
    return (
      <Link
        to={{
          pathname: "/post",
          state: { post: model }
        }}
      >
        <div className="card bg-light mb-3" style={{ maxWidth: "20rem" }}>
          <div className="card-header">{model.model}</div>
          <div className="card-body">
            <img src={model.imageURL} />
            <p className="card-text">{model.description}</p>
          </div>
        </div>
      </Link>
    );
  }
}
