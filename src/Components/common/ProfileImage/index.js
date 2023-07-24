import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function ProfileImage(profileImage) {

    return (
        <div>
            <Link to={`/profile/`}>
                <div className="profile-img">
                    <img className="image" style={{justifyContent:"center"}} src={profileImage} />
                </div>
            </Link>
        </div>
    )
}

export default ProfileImage


