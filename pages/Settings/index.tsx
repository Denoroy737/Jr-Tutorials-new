import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import { auth } from '../../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Message } from 'react-iconly';

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser.displayName || '');
      setEmail(auth.currentUser.email || '');
      setPhone(auth.currentUser.phoneNumber || '');
      setProfilePic(auth.currentUser.photoURL || '');
    }
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('Logged out successfully!');
        toast.success('Logged out successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push('/');
      })
      .catch((error) => {
        console.log('Error logging out:', error);
        toast.error('Error logging out!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  // Check if user is logged in
  if (!auth.currentUser) {
    return <div>Please login first</div>
  }
  return (
    <div className='my-5'>
      <h1 className='text-2xl font-bold my-5 hover:text-[#e4e4e4]'>My Profile</h1>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='my-7'>
        <div className='flex space-x-10'>
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image src={profilePic} alt="Avatar" height={100} width={100} />
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input type="text" value={name} placeholder="Type here" className="input input-bordered w-full max-w-xs bg-[#1a1a1a]" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input type="email" value={email} placeholder="Type here" className="input input-bordered w-full max-w-xs bg-[#1a1a1a]" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <input type="text" value={phone} placeholder="Type here" className="input input-bordered w-full max-w-xs bg-[#1a1a1a]" onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <button className='btn btn-accent mt-5' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Page;
