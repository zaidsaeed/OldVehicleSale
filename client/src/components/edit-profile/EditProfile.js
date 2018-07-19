import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile, getCurrentProfile} from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';


class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            location: '',
            email: '',
            phone: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            profile.location = !isEmpty(profile.location) ? profile.location : '';

            this.setState({
                handle: profile.handle,
                location: profile.location,
                email: profile.email,
                phone: profile.phone
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            location: this.state.location,
            email: this.state.email,
            phone: this.state.phone
        }

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    render() {
        const {errors} = this.state;
        return (
            <div className={"create-profile"}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-md-2"}></div>
                        <div className={"col-md-8"}>
                            <h1 className={"display-4 text-center"}>Edit Profile</h1>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder={"*Profile Handle"}
                                    name={"handle"}
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info={"A unique handle for your profile URL."}
                                />
                                <TextFieldGroup
                                    placeholder={"Location"}
                                    name={"location"}
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info={"Your location."}
                                />
                                <TextFieldGroup
                                    placeholder={"Email Address"}
                                    name={"email"}
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                    info={"Your email address."}
                                />
                                <TextFieldGroup
                                    placeholder={"Phone Number"}
                                    name={"phone"}
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                    error={errors.phone}
                                    info={"Your phone number."}
                                />
                                <input type={"submit"} value={"Submit"} className={"btn btn-info btn-block mt-4"}/>


                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStatetoProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStatetoProps, {createProfile, getCurrentProfile})(
    withRouter(CreateProfile)
);