import React, { Component } from "react";

class PostPage extends Component {
  render() {
    const { post } = this.props.location.state;

    return (
      <div>
        <p>{post.model}</p>
        <img src={post.imageURL} />
        <p>{post.description}</p>
      </div>
    );
  }
}

export default PostPage;
