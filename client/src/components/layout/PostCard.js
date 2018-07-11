import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBookmark, removeBookmark } from "../../actions/bookmarkActions";

class PostCard extends Component {
  bookmark = () => {
    this.props.addBookmark({ post: this.props.model });
  };

  removeBookmark = () => {
    this.props.removeBookmark(this.props.model._id);
  };

  render() {
    const { model, bookmarks } = this.props;
    const bookmarked = bookmarks.filter(bookmark => {
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
      <div className="card bg-light mb-3" style={{ maxWidth: "20rem" }}>
        <Link
          to={{
            pathname: "/post",
            state: { post: model }
          }}
        >
          <div className="card-header">{model.model}</div>{" "}
        </Link>

        <div className="card-body">
          <Link
            to={{
              pathname: "/post",
              state: { post: model }
            }}
          >
            <img src={model.imageURL} />
          </Link>
          {inBookmarks === false ? (
            <button className="btn btn-info" onClick={this.bookmark}>
              Bookmark
            </button>
          ) : (
            <button className="btn btn-info" onClick={this.removeBookmark}>
              UnBookmark
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bookmarks: state.bookmarks.bookmarks
});

export default connect(
  mapStateToProps,
  { addBookmark, removeBookmark }
)(PostCard);
