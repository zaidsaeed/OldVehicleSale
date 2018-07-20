import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getPostsByPrice} from "../../actions/postActions";


class SearchMenu extends Component {

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
        filteredModels = posts.filter(post => this.filterModels(filteredModels, post)) ;
        this.setState({
            results: filteredModels
        });
    };

    handleInputChange = () => {
        this.setState({ query: this.search.value }, () => this.getModels());
    };

    render() {


        return (
            <div class="card">
                <div class="card-header">
                    <h4><i class="fa fa-search" aria-hidden="true"></i> Search</h4>
                </div>
                <div class="card-body">
                    <form>
                        <div>
                            <label>Car brand:</label>
                            <select class="form-control">
                                <option>All</option>
                                <option value={"Chevrolet"}>Chevrolet</option>
                                <option value={"Ford"}>Ford</option>
                                <option value={"Honda"}>Honda</option>
                                <option value={"Toyota"}>Toyota</option>
                            </select>
                        </div>

                        <div className={"mt-4"}>
                            <label>Model:</label>
                            <select class="form-control">
                                <option>All</option>
                            </select>
                        </div>

                        <div className={"mt-4"}>
                            <label>Price Range:</label>
                            <select class="form-control">
                                <option value={""}>All</option>
                                <option value={"0"}>2500 or less</option>
                                <option value={"1"}>2500 - 5000</option>
                                <option value={"2"}>5000 or more</option>
                            </select>
                        </div>

                        <div className={"mt-4"}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Keywords"
                                ref={input => (this.search = input)}
                                onChange={this.handleInputChange}
                            />
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

SearchMenu.PropTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    getPostsByPrice: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(
    mapStateToProps,
    {getPostsByPrice}
)(SearchMenu);
