import React, { createContext, useContext } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth"
import { doc, getDoc, getFirestore, query, setDoc } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const FireBaseContext = createContext();


const firebaseConfig = {
  apiKey: "AIzaSyA2HSfpEaYUoEc7vZo4VNnBfE_6uSGHgok",
  authDomain: "socializer-7e286.firebaseapp.com",
  projectId: "socializer-7e286",
  storageBucket: "socializer-7e286.appspot.com",
  messagingSenderId: "164707038430",
  appId: "1:164707038430:web:e907789e94a5335c60fe4f"
};



const app = initializeApp(firebaseConfig);
        
export const firebaseAuth = getAuth(app);

export const db = getFirestore(app);

export const imageDb = getStorage(app);

export const useFirebase = ()=>{
    return useContext(FireBaseContext)
};

export const FirebaseProvidor = (props) => {


    const createWithEmailAndPassword = async(data) => {
        await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);
        let user = firebaseAuth.currentUser;
        await setDoc(doc(db,"User",user.uid),data).then(console.log("confirm"));
    }

    const signInUserWithEmailAndPassword = (email,password) => {
        return signInWithEmailAndPassword(firebaseAuth,email,password);
    }

    const signOutUser = () => {
        return signOut(firebaseAuth);
    }

    const getUserData = async() => {
        let user = firebaseAuth.currentUser;
        let snap = await getDoc(doc(db,"User",user.uid));
        return snap;
    }

    

    return <FireBaseContext.Provider value={{createWithEmailAndPassword, signInUserWithEmailAndPassword, signOutUser,getUserData}}>{props.children}</FireBaseContext.Provider>
}