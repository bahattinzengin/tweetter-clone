import React, { useState } from 'react'
import { auth ,provider } from './../firebase/config';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail ,
    signInWithPopup,


} from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AuthPage = () => {

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isForgetPass ,setIsForgetPass]=useState(false)
    const navigate =useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // console.log(email, pass);

        if (isSignUp) {
            //yeni hesap açma
            createUserWithEmailAndPassword(auth, email, pass)
            .then(() => {toast.success('Hesabınız başarıyla oluşturuldu');
            navigate('/feed')
        
        })
            .catch((err) => toast.error(`Üzgünüz bir hata oluştu: ${err.code}`))
        }
        else 
        
        {signInWithEmailAndPassword(auth, email, pass)
            .then(() =>{
                toast.info('Hesabınıza Giriş Yapıldı');
                navigate('/feed');
            })
            .catch((err) => {
                console.dir(err);  // hatanın koduna ulaşmak için bakılır
if(err.code ==='auth/invalid-credential'){
    setIsForgetPass(true)

}

                toast.error('Üzgünüz bir hata oluştu...')});
         }
    }


const sendMail=() =>{
    sendPasswordResetEmail(auth, email)
    .then (()=>{ toast.info('Epostanıza şifre sfırlama bağlantısı gönderildi');
    
    })
    .catch(()=>{
        toast.error('Mail gönderilemedi')


    })
    
    
   };


   const loginWithGoogle =()=>{

signInWithPopup(auth ,provider)
.then(()=>{navigate('/feed');
toast('Hesabınıza Giriş Yapıldı')});

   };


    return (
        <section className='h-screen grid place-items-center'>
            <div className='bg-black flex flex-col gap-10 py-16 px-32 rounded-lg'>


                <div className='flex justify-center'>
                    <img className='h-[60px]' src="/x-logo.webp" />
                </div>

                <h1 className='text-center font-bold text-xl'>
                    Twitter'a giriş yap

                </h1>


                <button 
                onClick={loginWithGoogle}
                className='flex items-center bg-white py-2 px-10 rounded-full text-black cursor-pointer  gap-3 transition hover:bg-gray-300'>
                    <img className='h-[20px]' src="/google-logo.svg" />
                    <span className='whitespace-nowrap' >Google ile Giriş Yap</span>
                </button>


                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col'>


                    <label >Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        className='text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]'
                    />


                    <label className='mt-5'>Şifre</label>
                    <input
                    onChange={(e) => setPass(e.target.value)}
                        type="password"
                        required
                        className='text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]'
                    />

                    <button
                        className='bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300' >
                        {isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}


                    </button>

                    <p className='mt-5  flex gap-4'>


                        <span className='text-gray-500 ' >Hesabanız yoksa</span>


                        <span
                            onClick={() => setIsSignUp(!isSignUp)}
                            className='text-blue-500 cursor-pointer select-none' >


                            {isSignUp ? 'Giriş Yapın ' : 'Kaydolun'}

                        </span>
                    </p>



                </form>
              {isForgetPass && ( 
                 <p 
                 onClick={sendMail}
              
              className="text-center text-red-500">
                    Şifrenizi mi Unuttunuz?
                </p>
                )}





            </div>
        </section>
    )
}

export default AuthPage