import { useEffect, useState } from 'react';
import './App.css';
import { firebaseAuth, useFirebase } from './context/FireBaseContext';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import HomePage from './page/HomePage';
import SignInPage from './page/SignInPage';
import SignUpPage from './page/SignUpPage';
import { Toaster } from 'react-hot-toast'
import ProfilePage from './page/ProfilePage';
import SideBarPage from './page/SideBarPage';
import CreatePost from './page/CreatePost';

function App() {
  const [auth, setAuth] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUid(user.uid);
        setAuth(true);

      } else {
        setAuth(false);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Toaster />
      <div className='flex'>
      <SideBarPage />
      <Routes>
        <Route path="/" element={auth ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={auth ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/create-post" element={auth ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/login" element={!auth ? <SignInPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!auth ? <SignUpPage /> : <Navigate to="/" />} />
      </Routes>

    </div>
    </>
  );
}

export default App;
