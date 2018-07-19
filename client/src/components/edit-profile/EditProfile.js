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
            displaySocialInputs: false,
            handle: '',
            company: '',
            location: '',
            bio: '',
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

            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';

            this.setState({
                handle: profile.handle,
                company: profile.company,
                location: profile.location
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            location: this.state.location
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
                                    placeholder={"Company"}
                                    name={"company"}
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info={"Selling for a company (optional)"}
                                />
                                <TextFieldGroup
                                    placeholder={"Location"}
                                    name={"location"}
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info={"Your location."}
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