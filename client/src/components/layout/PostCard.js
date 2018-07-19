import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBookmark, removeBookmark } from "../../actions/bookmarkActions";
import PropTypes from 'prop-types';

class PostCard extends Component {
  bookmark = () => {
    this.props.addBookmark({ post: this.props.model });
  };

  removeBookmark = () => {
    this.props.removeBookmark(this.props.model._id);
  };

  render() {
    const { model, bookmarks, profile, post, auth, user } = this.props;
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
      <div
        className="card bg-light mb-3"
      >
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
              <div className={"col-md-4"}>
                <Link
                  to={{
                    pathname: "/post",
                    state: { post: model }
                  }}
                >
                  <img src={model.imageURL} />
                </Link>
              </div>
              <div className={"col-md-8"}>
                  <p><span className={"lead text-muted"}>Price: </span>${model.price}</p>
                  <p><span className={"lead text-muted"}>Description: </span>{model.description}</p>
              </div>
              <div className={"col-md-12"}>
                {inBookmarks === false ? (
                  <button className="btn btn-info float-right" onClick={this.bookmark}>
                    Bookmark
                  </button>
                ) : (
                  <button className="btn btn-info float-right" onClick={this.removeBookmark}>
                    UnBookmark
                  </button>
                )}
                <p className="lead text-muted">Post by: <Link to={`/profile/${model.handle}`}>{model.name}</Link></p>
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
}

const mapStateToProps = state => ({
    auth: state.auth,
  bookmarks: state.bookmarks.bookmarks,
});

export default connect(
  mapStateToProps,
  { addBookmark, removeBookmark, }
)(PostCard);
