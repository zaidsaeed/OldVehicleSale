import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import PostCard from '../layout/PostCard';
import Spinner from '../common/Spinner';
import {getProfileByHandle} from '../../actions/profileActions';
import {getPostsByHandle, getPosts} from "../../actions/postActions";
import ProfileActions from "../dashboard/ProfileActions";

class Profile extends Component {
    componentDidMount() {
        if(this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);

        }
        //this.props.getPosts();
        this.props.getPostsByHandle(this.props.match.params.handle);
    }
    render() {
        const {profile, loading, post} = this.props.profile;

        const {user} = this.props.auth;

        let profileContent;
        let profileFeed;
        let postContent;

        if(profile === null || loading) {
            profileContent = <Spinner/>
        } else {
            profileContent = (
                <div>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <Link to={"../dashboard"} className={"btn btn-light mb-3 float-left"}>
                                Back To Dashboard
                            </Link>

                        </div>
                        <div className={"col-md-6"} />
                    </div>
                    <ProfileHeader profile={profile}/>

                </div>
            )

            if (post === null || loading) {
                postContent = <Spinner/>
            } else {
                postContent = this.props.post.map(result => {
                    return <PostCard model={result} /> });
            }

            if (user.id === profile.user._id) {
                profileFeed = <h3 className={"text-muted mt-3"}>Your Posts</h3> ;
            } else {
                profileFeed = <h3 className={"text-muted mt-3"}>{profile.user.name}'s Posts</h3> ;
            }
        }






        return (
            <div className={"profile"}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            {profileContent}
                            {profileFeed}
                            <hr/>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    getPostsByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    post: state.posts.posts,
    auth: state.auth
});

export default connect(mapStateToProps, {getProfileByHandle, getPostsByHandle, getPosts})(Profile);