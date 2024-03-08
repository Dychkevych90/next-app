import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {prisma} from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

const Home = async () => {
  const posts = await prisma.post.findMany();
  
  return (
    <>
      <div className="flex flex-col items-center justify-between p-24">
        <div className='container mx-auto items-center gap-10 columns-3 flex'>
          {
            posts.map((item: any) => {
              return (
                <Card key={item?.id}>
                  <CardHeader>
                    {/*<Image*/}
                    {/*  src={item.image }*/}
                    {/*  alt='image'*/}
                    {/*  width={500}*/}
                    {/*  height={500}*/}
                    {/*/>*/}
                    
                    <img src={item.image } alt="image"/>
                  </CardHeader>
                  
                  <CardContent>
                    <CardTitle className='mb-4'>{item.title}</CardTitle>
                    <CardDescription>{item?.desc}</CardDescription>
                  </CardContent>
                  
                  <CardFooter>
                    <Link
                      href={`/home/${item.id}`}
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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

