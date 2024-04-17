import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import { withRouter } from "react-router-dom";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      carModel: "",
      imageURL: "",
      description: "",
      handle: "",
      name: "",
      price: "",
      priceRange: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const { profile } = this.props.profile;

    console.log(user);
    const {
      email,
      carModel,
      imageURL,
      description,
      price,
      transmission,
      mileage,
    } = this.state;

    if (price <= 2500) this.priceRange = 0;
    else if (price <= 5000) this.priceRange = 1;
    else this.priceRange = 2;

    const newPost = {
      handle: profile.handle,
      email: user.email,
      name: user.name,
      model: carModel,
      description: description,
      imageURL: imageURL,
      user: user,
      price: price,
      priceRange: this.priceRange,
    };

    this.props.addPost(newPost);
    window.location = "/dashboard";
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
          <form className="card-body" onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                class="form-control form-control-lg"
                placeholder="Car Model"
                name="carModel"
                onChange={(e) => this.onChange(e)}
              />
              <input
                class="form-control form-control-lg mt-3"
                placeholder="Albumizr Album Link"
                name="imageURL"
                onChange={(e) => this.onChange(e)}
              />
              <input
                className={"form-control form-control-lg mt-3"}
                type={"number"}
                placeholder={"Price ($)"}
                name={"price"}
                onChange={(e) => this.onChange(e)}
              />

              <textarea
                className="form-control form-control-lg mt-3"
                placeholder="Description"
                name="description"
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <input type={"submit"} className="btn btn-dark" value={"Submit"} />
          </form>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { addPost })(withRouter(PostForm));
