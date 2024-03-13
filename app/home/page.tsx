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
import {Preloader} from "@/components/preloader";
import Example from "@/components/TheHeader";
import {Disclosure} from "@headlessui/react";
import {Button} from "@/components/ui/button";
import Header from "@/components/TheHeader";

interface Post {
  title: string,
  desc: string,
  image: string | undefined,
  id: string,
  createdAt: string
}

const Home = () => {
  const {data: posts, isLoading, refetch} = trpc.postList.useQuery();
  const {status} = useSession();
  
  const mutation = trpc.deletePost.useMutation();
  const {status: deleteStatus} = mutation;
  
  useEffect(() => {
    if (deleteStatus === 'success') {
      refetch();
    }
  }, [deleteStatus])
  
  if (status === "unauthenticated") {
    return redirect('/')
  }
  
  const onDeletePost = (id: string) =>
    mutation.mutate({id})
  
  // @ts-ignore
  return (
    <>
      <Header/>
      
      <div className="min-h-full">
        <div className="bg-white shadow">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Articles</h1>
            
            <AddPostDialog/>
          </div>
        </div>
        {
          isLoading ? (
            <div
              className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-152px)]">
              <Preloader/>
            </div>
          ) : (
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <div className='mx-auto grid grid-cols-3 gap-4'>
                {
                  // @ts-ignore
                  posts?.map((item: Post) => {
                    return (
                      <Card key={item?.id} className='relative max-w-sm rounded overflow-hidden shadow-none h-fit'>
                        <img className="w-full object-cover max-h-52" src={item?.image} alt="image"/>
                        
                        <CardContent className='max-h-52 px-4 py-4 pb-0'>
                          <CardTitle className='mb-3 truncate font-bold text-2xl'>{item.title}</CardTitle>
                          
                          <CardDescription className='line-clamp-2 text-gray-700 text-sm mb-3'>
                            {item?.desc}
                          </CardDescription>
                          
                          <div>
                            <span
                              className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Badge</span>
                            <span
                              className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Badge</span>
                          </div>
                        </CardContent>
                        
                        <CardFooter className='p-4'>
                          <Link
                            href={`/home/${item.id}`}
                            className="w-full bg-green-500 hover:bg-green-400 text-black py-2 px-4 rounded border-none text-center  size-12 max-h-10 font-medium flex items-center justify-center">
                            Read more
                          </Link>
                        </CardFooter>
                      </Card>
                    )
                  })
                }
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}

export default Home;

