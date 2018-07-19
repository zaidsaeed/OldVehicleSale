import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



class ProfileActions extends Component {
    render () {
        const {user} = this.props.auth;
        const {profile} = this.props.profile;

        if (user.id === profile.user._id) {
            return (
                <div className={"btn-group float-right"} role={'group'}>
                    <Link to={'/edit-profile'} className={'btn btn-light'}>
                        <i className={"fas fa-user-circle text-info mr-1"}/> Edit Profile
                    </Link>

                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

ProfileActions.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStatetoProps)(ProfileActions);