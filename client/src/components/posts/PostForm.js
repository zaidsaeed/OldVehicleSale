import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import axios from "axios";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carModel: "",
      imageURL: "",
      description: "",
      erros: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit() {
    const { user } = this.props.auth;
    console.log(user);
    const { carModel, imageURL, description } = this.state;

    const newPost = {
      description: description,
      model: carModel,
      imageURL: imageURL,
      user: user
    };

    this.props.addPost(newPost);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Create a Car Post
          </div>
          <div className="card-body">
            <div className="form-group">
              <input
                class="form-control form-control-lg"
                placeholder="Car Model"
                name="carModel"
                onChange={e => this.onChange(e)}
              />
              <input
                class="form-control form-control-lg"
                placeholder="Car Image Url"
                name="imageURL"
                onChange={e => this.onChange(e)}
              />
              <textarea
                className="form-control form-control-lg"
                placeholder="Model Description"
                name="description"
                onChange={e => this.onChange(e)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={() => this.onSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  erros: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  erros: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
