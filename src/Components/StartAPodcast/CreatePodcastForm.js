import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../common/input"
import { toast } from "react-toastify";
import Button from "../common/Button";
import FileInput from "../common/input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
// import { addDoc, collection, doc, setDoc } from "firebase/firestore";



function CreatePodcastForm() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [displayImage, setDisplayImage] = useState();
    const [bannerImage, setBannerImage] = useState();

    const [loading, setLoading] = useState(false);
   // eslint-disable-next-line
    const navigate = useNavigate();
   // eslint-disable-next-line
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        toast.success("Handling Form");

        if (title && desc && displayImage && bannerImage) {
            setLoading(true)
             // 1. Upload files -> get downloadable links
            try{
                const bannerImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(bannerImageRef, bannerImage);
                const bannerImageUrl = await getDownloadURL(bannerImageRef);

               const displayImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
               await uploadBytes(displayImageRef, displayImage);
               const displayImageUrl = await getDownloadURL(displayImageRef);
             
               const podcastData ={
                title: title,
                description: desc,
                bannerImage: bannerImageUrl,
                displayImage:displayImageUrl,
                createdBy: auth.currentUser.uid,
               };
               // eslint-disable-next-line
               const docRef = await addDoc(collection(db, "podcasts"), podcastData);
               setTitle("");
               setDesc("");
               setBannerImage(null);
               setDisplayImage(null);
               toast.success("Podcast Created");
               setLoading(false)

            } catch(e){
                toast.error(e.message);
                console.log(e);
                setLoading(false)
            }
        }
        else {
            toast.error("Please Enter All Values");
            setLoading(false)
        }
    }

    const displayImageHandle = (file) => {
        setDisplayImage(file)
    }

    const bannerImageHandle = (file) => {
        setBannerImage(file)
    }

    return (
        <>
            <InputComponent
                state={title}
                setState={setTitle}
                placeholder="Title"
                type="text"
                required={true}
            />
            <InputComponent
                state={desc}
                setState={setDesc}
                placeholder="Description"
                type="text"
                required={true}
            />
            
            <FileInput
                accept={"image/*"}
                id="display-image-input"
                fileHandleFuc={displayImageHandle}
                text={"Display Image Upload"}
            />

            <FileInput
                accept={"image/*"}
                id="banner-image-input"
                fileHandleFuc={bannerImageHandle}
                text={"Banner Image Upload"}
            />


            <Button text={loading ? "Loading" : "Create  Podcast"}
                disabled={loading} onClick={handleSubmit} />
        </>
    )
}


export default CreatePodcastForm;

