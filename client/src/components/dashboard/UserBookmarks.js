import React, { Component } from "react";
import { getUserFromDB } from "../../actions/authActions";
import { connect } from "react-redux";
import PostCard from "../layout/PostCard";
class UserBookmarks extends Component {
  componentDidMount() {
    this.props.getUserFromDB();
  }

  getPostFromBookmark(postId) {
    const { posts } = this.props;
    return posts.find(post => post._id === postId);
  }

  render() {
    const { posts, bookmarks, userId } = this.props;
    const userBookmarks = bookmarks.filter(
      bookmark => bookmark.user === userId
    );
    const postsFromBookmarks = userBookmarks.map(bookmark =>
      this.getPostFromBookmark(bookmark.post)
    );
    const postCards = postsFromBookmarks.map(post => {
      return <PostCard model={post} />;
    });

    return (
      <div>
        <h1>User Bookmarks </h1>
        {postCards}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  bookmarks: state.bookmarks.bookmarks,
  userId: state.auth.user._id
});

export default connect(
  mapStateToProps,
  { getUserFromDB }
)(UserBookmarks);
