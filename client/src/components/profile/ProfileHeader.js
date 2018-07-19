import React, {Component} from 'react';
import isEmpty from "../../validation/is-empty";
import ProfileActions from "../dashboard/ProfileActions";

class ProfileHeader extends Component {
    render() {
        const {profile} = this.props;


        return (
            <div className={"row"}>
                <div className={"col-md-12"}>
                    <div className={"card card-body bg-info text-white mb-3"}>
                        <div className={"row"}>
                            <div className={"col-4 col-md-3 m-auto"}>
                                <img className={"rounded-circle"} src={profile.user.avatar} alt={""} />
                            </div>
                        </div>
                        <div className={"text-center"}>
                            <h1 className={"display-4 text-center"}>{profile.user.name}</h1>
                            <p className={"lead text-center"}>{isEmpty(profile.company) ? null : (<span>{profile.company}</span>)}</p>
                            <p>{profile.location}</p>
                            <ProfileActions />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileHeader;