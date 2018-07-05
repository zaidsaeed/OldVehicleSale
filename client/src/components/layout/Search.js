import React, { Component } from "react";
import Suggestions from "./Suggestions";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: []
    };
  }

  handleInputChange = () => {
    this.setState({ query: this.search.value }, () => this.getModels());
  };

  getModels = () => {
    const temp = axios
      .get("api/posts")
      .then(res => this.setState({ results: res }))
      .catch(err => console.log(err));
    console.log(temp);
  };

  render() {
    return (
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search based on genre, category, author.."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}
