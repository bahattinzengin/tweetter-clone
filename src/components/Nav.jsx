import React from 'react'
import { navSections } from '../constant'
import { auth } from './../firebase/config';
import { BiDoorOpen } from 'react-icons/bi';
import { signOut } from 'firebase/auth';

const Nav = ({ user }) => {
 //console.log(user) // kullanıcının bilgilerine bakılır
  return (
    <div 
   
    className='flex flex-col justify-between items-start px-12 py-4'>
      <div
      >

        <img
          className='w-14 mb-4 '
          src="/x-logo.webp" alt="" />




        {navSections.map((i) =>
          <div
            className='flex justify-center md:justify-start items-center gap-3 text-base md:text-base p-3 cursor-pointer transition rounded-lg hover:bg-[#505050b7]'
          >
            {i.icon}
            <span
              className='max-md:hidden whitespace-nowrap'
            >{i.title}</span>

          </div>
        )}
      </div>
      <div>
        {!user ? (<div className='w-12 h-12 bg-gray-300 rounded-full animate-bounce'>
          .
        </div>) : (<div>
          <div>
            <img
              className='w-11 h-11 rounded-full'
              src={user.photoURL}  />
            <p
              className='max-md:hidden text-green-500'>
              {user.displayName}
            </p>

          </div>
          <button
          onClick={()=>signOut(auth)}
            className='flex justify-center gap-2 items-start p-1 bg-gray-800 rounded text-2xl md:text-[15px]'>
            <BiDoorOpen className='text-3xl'/>
            <span className='max-md:hidden'>
              Çıkış Yap

            </span>

          </button>


        </div>)}

      </div>
    </div>
  )
}

export default Nav