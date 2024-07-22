import React, { useEffect, useState } from 'react';
import { db, firebaseAuth, imageDb, useFirebase } from '../context/FireBaseContext';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import PostsComponenet from './PostsComponenet';

export default function ProfileComponent() {
  const { currentUser } = firebaseAuth;
  const { signOutUser, getUserData } = useFirebase();
  const [name, setName] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const username = await getUserData();
      setName(username.data().name);

      const imgList = await listAll(ref(imageDb, 'posts'));
      const urls = await Promise.all(imgList.items.map(async (val) => {
        const url = await getDownloadURL(ref(val));
        const docRef = doc(db, 'User', currentUser.uid, 'Posts', val.name);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const postData = docSnap.data();
          return { link: url, name: val.name, user: postData.user };
        } else {
          console.log(`No such document: ${val.name}`);
          return null;
        }
      }));
      setPosts(urls.filter(post => post !== null));
    }
    getData();
  }, [currentUser, getUserData]);

  console.log(currentUser);

  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold text-center mb-5">{name}</h1>
        <div className="mt-5 space-y-3">
          {posts.map((val, index) => (
            <PostsComponenet key={index} val={val} />
          ))}
        </div>
      </div>
    </>
  );
}
