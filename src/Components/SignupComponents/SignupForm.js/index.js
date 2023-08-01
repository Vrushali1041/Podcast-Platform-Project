import React, { useState } from "react";
import InputComponent from "../../common/input"
import Button from "../../common/Button"
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileInput from "../../common/input/FileInput";

function SignupForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSignup = async () => {
        console.log("Hangling Signup...");
        setLoading(true);
        if (
            password === confirmPass &&
            password.length >= 6 &&
            fullName && email && profileImage
        ) {
            try {
                 // Creating user's account.
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredential.user;
                console.log("user", user)

                //Saving user's details.
                await setDoc(doc(db, "users", user.uid), {
                    name: fullName,
                    email: user.email,
                    uid: user.uid,
                });
                 // Save data in the redux, call the redux action
                dispatch(
                    setUser({
                      name: fullName,
                      email: user.email,
                      uid: user.uid,
                    })
                );
                toast.success("User has been created!");
                setLoading(false);
                navigate("/profile");
            } catch (e) {
                console.log("error", e);
                toast.error(e.message);
                setLoading(false);
            }
        } else {
            //throw an error
            if(password !== confirmPass){
                toast.error(
                    "Please Make Sure your Password and Confirm Password matches!"
                );
            }
            else if(password.length < 6){
                toast.error(
                    "Please Make Sure your password is more than 6 digit long"
                );
            }
            setLoading(false);
        }

    };
    const profileImageHandle = (file) => {
        setProfileImage(file)
    }

    return (
        <>
            <InputComponent state={fullName} setState={setFullName}
                placeholder="Full Name"
                type="text"
                required={true} />

            <InputComponent state={email} setState={setEmail}
                placeholder="Email"
                type="text"
                required={true} />

            <InputComponent state={password} setState={setPassword}
                placeholder="Password"
                type="password"
                required={true} />

            <InputComponent state={confirmPass} setState={setConfirmPass}
                placeholder="Confirm Password"
                type="password"
                required={true} />

            <FileInput
                accept={"image/*"}
                id="profile-image-input"
                fileHandleFuc={profileImageHandle}
                text={"profile Image Upload"}
            />

            <Button text={loading? "Loading" : "Signup"} 
            disabled = {loading} onClick={handleSignup} />
        </>
    )
}

export default SignupForm
