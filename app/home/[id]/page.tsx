import React from "react";
import {prisma} from "@/lib/prisma";

export default async function SinglePost({params}: {
  params: {id: string, title: string}
}){
  
  const postById: any =  await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  })
  
  return(
    <div className='container text-center'>
      <img
        className={'max-h-52 w-full object-cover mb-5'}
        src={postById?.image}
        alt="image"
      />
      
      <h1
        className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential'>
        {postById?.title}
      </h1>
      
      <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>
        {postById?.desc}
      </p>
    </div>
  )
}