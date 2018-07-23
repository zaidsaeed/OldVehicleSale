import React, { Component } from "react";

class PostPage extends Component {
  render() {
    const { post } = this.props.location.state;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "spaceEvenly"
        }}
      >
        <div>
          <h1>{post.model}</h1>
          <img
            src={post.imageURL}
            style={{ width: "600px", height: "400px" }}
          />
        </div>
        <div style={{ marginTop: "60px", marginLeft: "20px" }}>
          <p>Description: {post.description}</p>
          <p>Price: {post.price} </p>
          <p>Poster: {post.name} </p>
          <button
            type="button"
            className="btn btn-info"
            style={{ width: "150px" }}
          >
            Contact Poster
          </button>
        </div>
      </div>
    );
  }
}

export default PostPage;
