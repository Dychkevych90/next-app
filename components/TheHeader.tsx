"use client";

import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import React from "react";

const TheHeader = () => {
  const {data: session, status} = useSession();
  console.log('session', session)
  
  return (
    <header className='flex items-center justify-between p-4 gap-5 bg-zinc-600 w-full'>
      <div>
        <Link className='text-cyan-50' href='/home'>Home</Link>
        {/*<Link href='/blog'>Posts</Link>*/}
      </div>
      
      <div className="flex items-center justify-center">
        <h3 className='mr-4 text-cyan-50'>{session?.user?.name}</h3>
        
        {session?.user?.image &&
            <img
                src={session?.user?.image}
                alt="image"
                className='w-12 h-12 mr-5 object-cover'
            />
        }
        
        <button
          onClick={() => signOut()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-cyan-50">
          Logout
        </button>
      </div>
    </header>
  )
}

export {TheHeader};