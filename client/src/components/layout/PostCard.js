import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBookmark, removeBookmark } from "../../actions/bookmarkActions";
import { getUserFromDB } from "../../actions/authActions";
import PropTypes from "prop-types";

class PostCard extends Component {
  bookmark = () => {
    this.props.addBookmark({ post: this.props.model });
    this.props.getUserFromDB();
  };

  removeBookmark = () => {
    this.props.removeBookmark(this.props.model._id);
    this.props.getUserFromDB();
  };

  getBookmarkFromBookmarkId(bookmarkId) {
    const { userBookmarks } = this.props;
    return userBookmarks.find(bookmark => bookmark === bookmarkId);
  }

  render() {
    const { model, userBookmarks, bookmarks } = this.props;
    const actualBookmarks = bookmarks.filter(bookmark =>
      this.getBookmarkFromBookmarkId(bookmark._id)
    );
    const bookmarked = actualBookmarks.filter(bookmark => {
      if (bookmark.post === model._id) {
        return true;
      }
    });
    let inBookmarks;
    if (bookmarked.length === 0) {
      inBookmarks = false;
    } else {
      inBookmarks = true;
    }
    return (
      <div className="card bg-light mb-3">
        <Link
          to={{
            pathname: "/post",
            state: { post: model }
          }}
        >
          <div className="card-header">{model.model}</div>{" "}
        </Link>

        <div className="card-body">
          <div className={"row"}>
            <div className={"col-md-6"}>
              <Link
                to={{
                  pathname: "/post",
                  state: { post: model }
                }}
              >
                <iframe
                  src={model.imageURL}
                  scrolling="no"
                  frameborder="0"
                  width="100%"
                />
              </Link>
            </div>
            <div className={"col-md-4"}>
              <p>
                <span className={"lead text-muted"}>Price: </span>${model.price}
              </p>
              <p>
                <span className={"lead text-muted"}>Description: </span>
                {model.description}
              </p>
            </div>
            <div className={"col-md-12"}>
              {inBookmarks === false ? (
                <button
                  className="btn btn-info float-right"
                  onClick={this.bookmark}
                >
                  Bookmark
                </button>
              ) : (
                <button
                  className="btn btn-info float-right"
                  onClick={this.removeBookmark}
                >
                  UnBookmark
                </button>
              )}
              <p className="lead text-muted">
                Post by:{" "}
                <Link to={`/profile/${model.handle}`}>{model.name}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  userBookmarks: state.auth.user.bookmarks,
  bookmarks: state.bookmarks.bookmarks
});

export default connect(
  mapStateToProps,
  { addBookmark, removeBookmark, getUserFromDB }
)(PostCard);
