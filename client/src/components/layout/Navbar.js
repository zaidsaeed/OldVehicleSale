import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const addButton = (
      <Link to="/createPost">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              href="a"
              style={{ color: "white", textDecoration: "none" }}
              className="nav-link"
            >
              <img
                className="rounded-circle test-add-post-button"
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: "white",
                }}
                src="https://i.pinimg.com/originals/5e/f4/c9/5ef4c9420ffc1d618658fd1bec7db821.gif"
                alt={user.name}
                title="Add a post"
              />
            </a>
          </li>
        </ul>
      </Link>
    );

    const userBookmarksButton = (
      <Link to="/bookmarks">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              href="a"
              style={{ color: "white", textDecoration: "none" }}
              className="nav-link"
            >
              <img
                className="rounded-circle"
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: "white",
                  padding: "3px",
                }}
                src="https://www.freeiconspng.com/uploads/bookmarks-icon-16.png"
                alt={user.name}
                title="View user bookmarks"
              />
            </a>
          </li>
        </ul>
      </Link>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">{userBookmarksButton}</li>
        <li className="nav-item">{addButton}</li>
        <li className="nav-item">
          <a
            href="a"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            <img
              className="rounded-circle"
              style={{ width: "25px", marginRight: "5px" }}
              src={user.avatar}
              alt={user.name}
              title="You must have a gravatar connected to your email to display an image"
            />
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            style={{ color: "white", textDecoration: "none" }}
            className="nav-link"
            to="/register"
          >
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={{ color: "white", textDecoration: "none" }}
            className="nav-link"
            to="/login"
          >
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            OldVehicleSale
          </Link>

          <div className="collapse navbar-collapse" id="navbarColor01">
            {isAuthenticated ? authLinks : guestLinks};
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
