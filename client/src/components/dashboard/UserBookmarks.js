import React, { Component } from "react";
import { getUserFromDB } from "../../actions/authActions";
import { connect } from "react-redux";
class UserBookmarks extends Component {
  componentDidMount() {
    this.props.getUserFromDB();
  }

  render() {
    return (
      <div>
        <h1>User Bookmarks </h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserFromDB }
)(UserBookmarks);
