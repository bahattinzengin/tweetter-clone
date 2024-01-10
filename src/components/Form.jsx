import {
    addDoc,
    collection,
    serverTimestamp
} from 'firebase/firestore'

import { db, storage } from '../firebase/config'

import React, { useState } from 'react'
import { BsCardImage } from 'react-icons/bs'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid' // id ekleme
import { toast } from 'react-toastify'
import Spinner from './Spinner';

const Form = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false)

    const tweetsCol = collection(db, 'tweets') // dökümandan bakıldı(firebase)

    const uploadImage = async (file) => {

        // console.log(file);

        if (!file || !file.type.startsWith('image')) return null;

        const fileRef = ref(storage, file.name.concat(v4()));
        await uploadBytes(fileRef, file)
        return await getDownloadURL(fileRef)


    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const textContent = e.target[0].value;
        const imageContent = e.target[1].files[0];

        if (!textContent && !imageContent) return toast.info('Lütfen İçerik Ekleyiniz')

        setIsLoading(true);

        //console.dir( textContent,imageContent)

        const url = await uploadImage(imageContent);
        // firebase dökümanından döküman eklemeye bakıldı
        await addDoc(tweetsCol, {
            textContent,
            imageContent: url,
            createdAt: serverTimestamp(),
            user: {
                id: user.uid,
                name: user.displayName,
                photo: user.photoURL,
            },
            likes: [],
            isEdited: false
        });
        setIsLoading(false);
        e.target.reset() ;
    
    };


    return (
        <form
            onSubmit={handleSubmit}
            className='flex gap-3 p-4 border-b-[1px] border-gray-700'>
            <img
                className='rounded-full h-[35px] md:h-[45px] mt-1'
                src={user?.photoURL} alt="" />
            <div className='w-full'>
                <input
                    className='w-full bg-transparent my-2 outline-none md:text-lg'
                    placeholder='Neler Oluyor ?'
                    type="text" />


                <div
                    className='flex justify-between items-center'>
                    <input className='hidden' id='image' type="file" />

                    <label
                        className='hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full'
                        htmlFor="image">
                        <BsCardImage />
                    </label>

                    <button
                        className='bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800'
                    >


                        {isLoading ? <Spinner /> : 'Tweetle'}
                    </button>

                </div>
            </div>


        </form>
    )
}

export default Form