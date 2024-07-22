import React, { useState } from 'react'
import { useFirebase } from '../context/FireBaseContext';
import { Link } from 'react-router-dom';

export default function SignUpComponent() {
    const { createWithEmailAndPassword, signInUserWithEmailAndPassword } = useFirebase();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        gender: ''
    });
    const signUp = (e) => {
        e.preventDefault();
        const res = createWithEmailAndPassword(data);
        console.log(res);
        // console.log(data.email, data.password);
    }

    return (
        <div className="bg-black h-screen flex items-center justify-center">
            <div className="glass p-16 mx-auto">
                <div className='space-y-8'>
                    <div className='text-3xl text-white'>Sign Up</div>
                    <form className='min-w-fit w-64 max-w-72'>
                        <input type="text" name='name' placeholder='Name' className="cursor-pointer w-full p-3 bg-transparent border-b-2 border-gray-300 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-300" value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} /> <br /><br />
                        <input type="email" name="Email" placeholder="Email" className="cursor-pointer w-full p-3 bg-transparent border-b-2 border-gray-300 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-300" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} /> <br /><br />
                        <input type="password" name="Email" placeholder="Password" className="cursor-pointer w-full p-3 bg-transparent border-b-2 border-gray-300 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-300" value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} /><br /><br />
                        <label htmlFor="gender" className='text-gray-500 m-3'>Gender</label>
                        <div className='flex text-white justify-center items-center space-x-5 mt-5'>
                            <input type="radio" name="gender" placeholder="Gender" className="cursor-pointer  focus:outline-none focus:border-purple-300" value="male" onChange={(e) => { setData({ ...data, gender: e.target.value }) }} /> <p>Male</p>
                            <input type="radio" name="gender" placeholder="Gender" className="cursor-pointer  ml-10 focus:outline-none focus:border-purple-300" value="female" onChange={(e) => { setData({ ...data, gender: e.target.value }) }} /> <p>Female</p>
                        </div> <br />
                        <button onClick={signUp} className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">SignUp</button><br /><br />
                        <div className='text-center'>
                            <p className='text-white'>Already User? <Link to="/login" className="text-blue-500 hover:underline ">SignIn</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
