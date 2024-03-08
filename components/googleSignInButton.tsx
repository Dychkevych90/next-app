"use client";

import {signIn} from "next-auth/react";

export async function GoogleSignInButton() {
  const handleClick = () => {
    signIn('google')
  }
  
  return(
    <button
      onClick={handleClick}
      className='bg-orange-400 p-2'
    >
      Continue with Google
    </button>
  )
}