"use client";

import React from "react";
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
  const {data: posts, isLoading} = trpc.postList.useQuery();
  const { status } = useSession();
  
  if(isLoading){
    return <div>Loading...</div>
  }
  
  if (status === "unauthenticated") {
    return redirect('/')
  }
  
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
                <Card key={item?.id} className='bg-lime-400'>
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
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none">
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

