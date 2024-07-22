import React from 'react'
import SideBarComponent from '../components/SideBarComponent'
import { useFirebase } from '../context/FireBaseContext';

export default function SideBarPage() {
  const { signOutUser, getUserData } = useFirebase();

  return (
    <>
      <div className='w-[20%] pl-3'>
        <div className='mb-10 mt-5 ml-3'>
          <img src='./src/assets/Socializer2.png' className="w-40" />
        </div>

        <SideBarComponent name="Home" img="./src/assets/Icons/home.png" nav="/" />
        <SideBarComponent name="Search" img="./src/assets/Icons/magnifier.png" nav="/Profile" />
        <SideBarComponent name="Create Post" img="./src/assets/Icons/Create Post.png" nav="/create-post" />
        <SideBarComponent name="Notification" img="./src/assets/Icons/notification.png" nav="/Profile" />
        <SideBarComponent name="Profile" img="./src/assets/Icons/profile.png" nav="/Profile" />
        <div onClick={signOutUser}>
        <SideBarComponent name="LogOut" img="./src/assets/Icons/LogOut.png"/>
        </div>
      </div>
    </>
  )
}
