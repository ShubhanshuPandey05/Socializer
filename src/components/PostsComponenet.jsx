import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db, firebaseAuth, useFirebase } from '../context/FireBaseContext';

export default function PostsComponenet({ val, index }) {
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [postedUser, setPostedUser] = useState('');
    const [name, setName] = useState();
    const { signOutUser, getUserData } = useFirebase();
    const currentUser = firebaseAuth.currentUser;

    useEffect(() => {
        const getLikes = async () => {
            try {
                const username = await getUserData();
                setName(username.data().name);
                const docRef = doc(db, "Posts", val.name);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setLikes(docSnap.data().Like || []);
                    setComments(docSnap.data().Comments || []);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };

        const getPostDetails = async () => {
            try {
                const postUser = await getDoc(doc(db, "User", val.user));
                setPostedUser(postUser.data().name);
            } catch (error) {
                console.log(error);
            }
        };

        getPostDetails();
        getLikes();
    }, [val.name]);

    const like = async () => {
        const user = firebaseAuth.currentUser;
        const docRef = doc(db, "Posts", val.name);

        if (likes.includes(user.uid)) {
            try {
                await updateDoc(docRef, {
                    Like: arrayRemove(user.uid)
                });
                setLikes(likes.filter(uid => uid !== user.uid));
            } catch (error) {
                console.error("Error updating document:", error);
            }
        } else {
            try {
                await updateDoc(docRef, {
                    Like: arrayUnion(user.uid)
                });
                setLikes([...likes, user.uid]);
            } catch (error) {
                console.error("Error updating document:", error);
            }
        }
    };

    const addComment = async () => {
        const user = firebaseAuth.currentUser;
        const newComments = [...comments, { user: name, text: newComment }];
        const docRef = doc(db, "Posts", val.name);
        const docRef2 = doc(db, 'User', val.user,'Posts', val.name);

        try {
            await updateDoc(docRef, {
                Comments: newComments
            });
            setComments(newComments);
            setNewComment('');
        } catch (error) {
            console.error("Error updating document:", error);
        }
        try {
            await updateDoc(docRef2, {
                Comments: newComments
            });
            setComments(newComments);
            setNewComment('');
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md max-w-md mx-auto my-5 text-black">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <img src="./src/assets/Icons/profile.png" alt="User" className="w-10 h-10 rounded-full mr-3"/> {/*  https://via.placeholder.com/40     for the images*/}
                    <p className="text-lg font-semibold">{postedUser}</p>
                </div>
                <div className="flex items-center">
                    <div className="three-dots w-1 h-1 bg-gray-800 rounded-full mx-1"></div>
                    <div className="three-dots w-1 h-1 bg-gray-800 rounded-full mx-1"></div>
                    <div className="three-dots w-1 h-1 bg-gray-800 rounded-full mx-1"></div>
                </div>
            </div>
            <input type="hidden" value={val.name} />
            <div className="w-full bg-slate-200 rounded-lg overflow-hidden mb-5">
                <img key={index} src={val.link} className="w-full object-cover" alt="Uploaded post" onDoubleClick={like}/>
            </div>
            <div className="flex items-center space-x-3 mb-3">
                <img 
                    src="./src/assets/Icons/like.png" 
                    alt="Like" 
                    className="w-6 h-6 cursor-pointer" 
                    onClick={like} 
                />
                <p id='likeCount' className="text-gray-600">{likes.length}</p>
                <img 
                    src="./src/assets/Icons/comment.png" 
                    alt="Comment" 
                    className="w-6 h-6 cursor-pointer" 
                />
                <p className="text-gray-600">{comments.length}</p>
            </div>
            <div>
                {comments.filter((_, i) => i < 3).map((comment, index) => (
                    <p key={index} className="text-sm text-gray-700 mb-2">
                        <span className="font-bold">{comment.user}: </span>{comment.text}
                    </p>
                ))}
            </div>
            <div className="flex items-center space-x-2 mt-3">
                <input 
                    type="text" 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} 
                    placeholder="Add a comment..." 
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                />
                <button 
                    onClick={addComment} 
                    className="bg-blue-500 text-white rounded-lg px-3 py-1"
                >
                    Post
                </button>
            </div>
        </div>
    );
}
