import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import { getUserFromDB } from "../../actions/authActions";
import { getBookmarks } from "../../actions/bookmarkActions";
import Search from "../layout/Search";
import PostCard from "../layout/PostCard";
import SearchMenu from "../layout/SearchMenu";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getUserFromDB();
    this.props.getBookmarks();
  }

  render() {
    const { post, loading } = this.props.post;

    let postContent;
    let searchMenu;

    if (post === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = this.props.post.map(result => {
        return <PostCard model={result} />;
      });
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Search />
              <br />
              <div className={"row"}>
                {/* <div className={"col-md-3"}>
                  <SearchMenu />
                </div> */}
                <div className={"col-md-12"}>{postContent}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.posts.posts
});

export default connect(
  mapStateToProps,
  { getPosts, getUserFromDB, getBookmarks }
)(Posts);
