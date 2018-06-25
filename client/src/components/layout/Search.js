import React, { Component } from "react";
import protos from "./ProtosArray";
import Suggestions from "./Suggestions";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: []
    };
  }

  handleInputChange = () => {
    this.setState({ query: this.search.value }, () => this.getBooks());
  };

  filterBooks(keywords, book) {
    if (
      book.bookTitle.toLowerCase().indexOf(keywords.toLowerCase()) != -1 ||
      book.author.toLowerCase().indexOf(keywords.toLowerCase()) != -1 ||
      book.description.toLowerCase().indexOf(keywords.toLowerCase()) != -1
    ) {
      return book;
    }
  }

  getBooks = () => {
    const filteredBooks = protos.map(book =>
      this.filterBooks(this.state.query, book)
    );
    this.setState({
      results:
        filteredBooks.length === 0 || typeof filteredBooks[0] === "undefined"
          ? []
          : filteredBooks
    });
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
