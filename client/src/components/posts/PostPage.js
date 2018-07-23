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

          <iframe
            src={post.imageURL}
            scrolling="no"
            frameborder="0"
            allowfullscreen
            width="700"
            height="400"
          />
        </div>
        <div style={{ marginTop: "60px", marginLeft: "20px" }}>
          <p>Description: {post.description}</p>
          <p>Price: {post.price} </p>
          <p>
            Poster: {post.name}, {post.email}
          </p>
          <button
            type="button"
            className="btn btn-info"
            style={{ width: "150px" }}
          >
            Contact Poster
          </button>
          <p>Posted at: {post.date} </p>
        </div>
      </div>
    );
  }
}

export default PostPage;
