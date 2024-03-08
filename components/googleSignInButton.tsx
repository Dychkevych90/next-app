"use client";
import {signIn, useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export function GoogleSignInButton() {
  const { status } = useSession();
 
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  if (status === "authenticated") {
    return redirect('/home')
  }
  
  const handleClick = () => {
    signIn('google')
  }
  
  return(
    <button
      onClick={handleClick}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none flex items-center'
    >
      <span className='text-3xl mr-5'>G</span>
      Sign in with Google
    </button>
  )
}