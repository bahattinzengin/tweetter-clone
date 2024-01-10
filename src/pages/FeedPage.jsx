import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import Nav from './../components/Nav';
import Main from './../components/Main';
import Aside from './../components/Aside';
import { useEffect, useState } from 'react';

const FeedPage = () => {
  const[user ,setUser]=useState(null);


  useEffect(()=>{
    const unsub = onAuthStateChanged(auth ,(currUser)=>setUser(currUser))
    return ()=>unsub();
  },[])


  return (
   <div className='feed h-screen bg-black overflow-hidden'>
<Nav user={user}/>
<Main user={user}/>
<Aside />


   </div>
  )
}

export default FeedPage