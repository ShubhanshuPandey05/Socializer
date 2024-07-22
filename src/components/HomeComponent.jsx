import React, { useEffect, useState } from 'react';
import { db, imageDb, useFirebase } from '../context/FireBaseContext';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseAuth } from '../context/FireBaseContext';
import PostsComponenet from './PostsComponenet';
import { usePostContext } from '../context/PostContext';

export default function HomeComponent() {
  const { signOutUser, getUserData } = useFirebase();
  const {posts, name} = usePostContext();

  

console.log(posts);

  return (
<div className="bg-white h-screen flex flex-col items-center text-gray-900 overflow-auto w-[50%] border border-gray-100">
  <div className="bg-white p-8 mx-auto">
    <div className="mt-5 space-y-3">
      {posts.map((val, index) => (
        <PostsComponenet val={val} index={index} key={index} />
      ))}
    </div>
  </div>
</div>

  );
}
