import { Category, Notification, Search, ChevronDown } from 'react-iconly';
import Notifications from './Notifications';
import react, { useEffect, useState } from "react";
import Login from "./login";
import Signup from "./signup";
import { auth } from '../config/firebase';

const Navbar = () => {
  const [clientRendered, setClientRendered] = useState(false);

  useEffect(() => {
    setClientRendered(true);
  }, []);
  
  const currentUser = auth.currentUser;
  // if (currentUser) {
  //   console.log('Current user name:', currentUser.email);
  // } else {
  //   console.log('No user is signed in.');
  // }
  return (
    <div className='flex justify-between items-center'>
      <div>
        {currentUser ? (
          <>
            <h3 className="text-gray-200 md:text-lg ">Hello,</h3>
            <h1 className="md:text-3xl text-2xl font-bold">{currentUser.displayName} &#128075;</h1>
          </>
        ) : (
          <>
            <h3 className="text-gray-200 md:text-lg ">Hello,</h3>
            <h1 className="md:text-3xl text-2xl font-bold">Ron Smith &#128075;</h1>
          </>
        )}
      </div>
      <div className='flex space-x-2 items-center'>
          <div className="dropdown dropdown-end items-center">
            <div tabIndex={0} className="bg-[rgb(15,15,15)] hover:bg-[#131313] rounded-lg px-4 h-10 space-x-1 flex items-center"><span className='text-[#c7c7c7] text-base md:text-lg'>Class 9</span><ChevronDown set="light" size={18} /></div>
            <ul tabIndex={0} className="dropdown-content menu p-2 m-3 shadow bg-[#131313] rounded-box w-40">
              <li><a>Class 5</a></li>
              <li><a>Class 6</a></li>
              <li><a>Class 7</a></li>
              <li><a>Class 8</a></li>
              <li><a>Class 9</a></li>
              <li><a>Class 10</a></li>
              <li><a>Class 11</a></li>
              <li><a>Class 12</a></li>
            </ul>
          </div>
        <div className='flex space-x-2 items-center'>
          <div className='hidden md:block p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
            <Search set="broken" size={24} />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0}>
              <label htmlFor="my-modal-0" className='hidden md:block p-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
                <Notification set="broken" size={25} />
              </label>
            </div>
            <div tabIndex={0} className="dropdown-content menu p-6 shadow bg-[#111111] rounded-box w-96">
              <Notifications />
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default Navbar;
