import React, { createContext, useEffect, useState, useContext } from 'react';
import { db, imageDb, useFirebase } from './FireBaseContext'; // Adjusted import path
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';

const PostContext = createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostContextProvider = ({ children }) => {
  const { getUserData } = useFirebase();
  const [name, setName] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getName = async () => {
      try {
        const userData = await getUserData();
        setName(userData?.data().name || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const getPosts = async () => {
      try {
        const imgList = await listAll(ref(imageDb, 'posts'));
        const urls = await Promise.all(imgList.items.map(async (val) => {
          try {
            const url = await getDownloadURL(val);
            const docRef = doc(db, 'Posts', val.name);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const postData = docSnap.data();
              return { link: url, name: val.name, user: postData.user };
            } else {
              console.log(`No such document: ${val.name}`);
              return null;
            }
          } catch (error) {
            console.error(`Error fetching post data for ${val.name}:`, error);
            return null;
          }
        }));
        setPosts(urls.filter(post => post !== null));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getName();
    getPosts();
  }, []);

  return (
    <PostContext.Provider value={{ name, posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};
