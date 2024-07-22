import React, { useState } from 'react'
import { db, imageDb, useFirebase } from '../context/FireBaseContext';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseAuth } from '../context/FireBaseContext';
import { usePostContext } from '../context/PostContext';

export default function CreatePost() {
    const { setPosts } = usePostContext();
    const [img, setImg] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();
        if (!img) return;

        const file = img[0];
        const imgRef = ref(imageDb, `posts/${v4()}`);
        const metadata = {
            contentType: file.type,
        };

        uploadBytes(imgRef, file, metadata)
            .then(async (val) => {
                let user = firebaseAuth.currentUser;
                await setDoc(doc(db, "User", user.uid, "Posts", val.metadata.name), { fileName: val.metadata.name, Like: [], user: user.uid });
                await setDoc(doc(db, "Posts", val.metadata.name), { fileName: val.metadata.name, Like: [], user: user.uid });
                const url = await getDownloadURL(val.ref);
                setPosts((prevPosts) => [...prevPosts, { link: url, name: val.metadata.name, user: user.uid }]);
                setImg(null);
                document.getElementById("filess").value = null;
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
            });
    };
    return (
        <form className="flex justify-center items-center w-full p-5 flex-col space-y-5">
            <input
                type="file"
                className="w-52 cursor-pointer"
                onChange={(e) => {
                    setImg(e.target.files);
                }}
                id="filess"
            />
            <button
                className="bg-green-600 py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 text-white"
                onClick={handleClick}
            >
                Upload
            </button>
        </form>
    )
}
