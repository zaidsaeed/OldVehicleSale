import React, { Component } from "react";
import Suggestions from "./Suggestions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: []
    };
  }

  filterModels(keywords, post) {
    if (
      post.model.toLowerCase().indexOf(keywords.toLowerCase()) != -1 ||
      post.description.toLowerCase().indexOf(keywords.toLowerCase()) != -1
    ) {
      return post;
    }
  }

  getModels = () => {
    let filteredModels;
    const { posts } = this.props;
    if (this.state.query == "") {
      filteredModels = [];
    } else {
      filteredModels = posts.filter(post =>
        this.filterModels(this.state.query, post)
      );
    }
    this.setState({
      results: filteredModels
    });
  };

  handleInputChange = () => {
    this.setState({ query: this.search.value }, () => this.getModels());
  };

  render() {
    return (
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search based on model, price or description ...."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}

Search.PropTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(
  mapStateToProps,
  null
)(Search);
