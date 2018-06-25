import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import PostForm from "./PostForm";
//import Spinner from '../common/Spinner'; need this

class Posts extends Component {
  render() {
    return (
      <div classNAme="feed">
        <div className="container">
          <div classNAme="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
