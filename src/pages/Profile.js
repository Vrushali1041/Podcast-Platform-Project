import React from "react";
import { useSelector } from "react-redux";
import Header from "../Components/common/Header";
import Button from "../Components/common/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../Components/common/Loader";
import ProfileImage from "../Components/common/ProfileImage";

function Profile() {
    const user = useSelector((state) => state.user.user);
    console.log("My User", user);
    if (!user) {
        //return <p>Loding...</p>
        return <Loader />
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign - out successful.
            toast.success("User Logged Out!")
        }).catch((error) => {
            //An error happened.
            toast.error(error.message)
        });

    }


    return (
        <div>
            <Header />
            <div className="profile" style={{margin:'25px', justifyContent:"center" ,alignItems:"center"}}>
            <ProfileImage profileImage={user.profilePic} />
            <h2>User Name:  {user.name}</h2>
            <h2>Email:  {user.email}</h2>
            <h2>User Id:  {user.uid}</h2>
            </div>
            <Button text={"Logout"} onClick={handleLogout} />
        </div>
    )
}

export default Profile;

