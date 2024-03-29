import React, { useEffect, useState } from 'react'
import Form from './Form';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import Spinner from './Spinner';
import Post from './Post';

const Main = ({ user }) => {

  const tweetsCol = collection(db, 'tweets');
  const [tweets, setTweets] = useState(null);
  const options = query(tweetsCol, orderBy('createdAt', 'desc'))


  useEffect(() => {

    const unsub = onSnapshot(options, (snapshot) => {

      const tempTweets = [];
      snapshot.forEach((doc) =>
        //console.log(doc)
        tempTweets.push({ id: doc.id, ...doc.data() })
      );
      //console.log(tempTweets)
      setTweets(tempTweets);

    });
    return () => unsub();




  }, [])

  return (
    <main
      className='border border-gray-700 overflow-y-auto'>
      <header
        className='font-bold p-4 border-b-[1px] border-gray-700'>
        Anasayfa
      </header>
      <Form user={user} />
      {!tweets ? (
      
      <div className="flex justify-center my-10" >

        <Spinner style={'w-6 h-6 text-blue-600'}/>

      </div>)

        : (tweets.map((tweet) => <Post tweet={tweet} key={tweet.id} />))}


    </main>

  )
}

export default Main