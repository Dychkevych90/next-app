"use client";

import React, {useEffect} from "react";
import Link from "next/link";

import AddPostDialog from "@/components/addPostDialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {trpc} from "@/client/client";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

const Home = () => {
  const {data: posts, isLoading, refetch} = trpc.postList.useQuery();
  const { status } = useSession();
  
  const mutation = trpc.deletePost.useMutation();
  const { status: deleteStatus } = mutation;
  
  useEffect(() => {
    if(deleteStatus === 'success'){
      refetch();
    }
  }, [deleteStatus])
  
  if(isLoading){
    return <div>Loading...</div>
  }
  
  if (status === "unauthenticated") {
    return redirect('/')
  }
  
  const onDeletePost = (id: string) =>
    mutation.mutate({id})
  
  return (
    <>
      <div className="flex flex-col items-center justify-between p-24">
        <div className="container mb-5">
          <AddPostDialog/>
        </div>
        
        <div className='container mx-auto grid grid-cols-3 gap-4'>
          {
            posts?.map((item: any) => {
              return (
                <Card key={item?.id} className='bg-lime-400 relative'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none absolute right-3 top-3'
                    onClick={() => onDeletePost(item?.id)}
                  >
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <CardHeader>
                    {/*<Image*/}
                    {/*  src={item.image }*/}
                    {/*  alt='image'*/}
                    {/*  width={500}*/}
                    {/*  height={500}*/}
                    {/*/>*/}
                    
                    {/*<img src={item.image } alt="image"/>*/}
                  </CardHeader>
                  
                  <CardContent className='max-h-52 min-h-52'>
                    <CardTitle className='mb-4 truncate'>{item.title}</CardTitle>
                    <CardDescription
                      className='line-clamp-5'
                    >
                      {item?.desc}
                    </CardDescription>
                  </CardContent>
                  
                  <CardFooter>
                    <Link
                      href={`/home/${item.id}`}
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none text-center">
                      more
                    </Link>
                  </CardFooter>
                </Card>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default Home;

