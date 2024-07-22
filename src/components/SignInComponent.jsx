import React, { useState } from 'react';
import { useFirebase } from '../context/FireBaseContext';
import { Link } from 'react-router-dom';

export default function SignInComponent() {
  const { signInUserWithEmailAndPassword } = useFirebase();

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const signIn = (e) => {
    e.preventDefault();
    const res = signInUserWithEmailAndPassword(data.email, data.password);
    console.log(res);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="glass p-16 max-w-md mx-auto">
        <div className='space-y-8'>
          <div className='text-3xl text-white'>Sign In</div>
          <form className="min-w-fit w-64 max-w-72 space-y-8">
            <div>
              <input
                type="email"
                name="Email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                className="w-full p-3 bg-transparent border-b-2 border-gray-300 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-300"
              />
            </div>
            <div>
              <input
                type="password"
                name="Password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                className="w-full p-3 bg-transparent border-b-2 border-gray-300 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-300"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={signIn}
                className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Sign In
              </button>
            </div>
            <div className="text-center">
              <p className='text-white'>Not a User? <Link to="/signup" className="text-blue-500 hover:underline "> Sign Up</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
