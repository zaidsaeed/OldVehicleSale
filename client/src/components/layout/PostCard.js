import React, { Component } from "react";
import { connect } from "react-redux";
import { addBookmark } from "../../actions/bookmarkActions";

class PostCard extends Component {
  bookmark = () => {
    this.props.addBookmark({ post: this.props.model });
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
        <div className="card-header">{model.model}</div>
        <div className="card-body">
          <img src={model.imageURL} />
          {inBookmarks === false ? (
            <button className="btn btn-info" onClick={this.bookmark}>
              Bookmark
            </button>
          ) : (
            <button className="btn btn-info" onClick={this.bookmark}>
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
  { addBookmark }
)(PostCard);
