"use client";

import {useEffect, useState} from "react";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { trpc } from "@/client/client";

import UploadImage from "@/components/uploadImage";
import {Cog8ToothIcon, PencilSquareIcon} from '@heroicons/react/24/outline'

const formSchema = z.object({
  title: z.string().min(5, {
    message: "title must be at least 5 characters.",
  }),
  desc: z.string().min(5, {
    message: "description must be at least 5 characters.",
  })
})

export default function AddPostDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      desc: ''
    }
  });
  
  const [open, setOpen] = useState(false);
  const [ changePhoto, setChangePhoto ] = useState( '' );
  
  const { refetch } = trpc.postList.useQuery();
  const mutation = trpc.createPost.useMutation();
  
  const { status } = mutation;
  
  useEffect(() => {
    if(status === 'success'){
      refetch();
      setOpen(false)
    }
  }, [status])
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newPost = {...values, image:changePhoto}
    console.log('newPost', newPost, 'values', values)
    
    newPost && mutation.mutate(newPost)
  }
  
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className='w-32 bg-green-500 hover:bg-green-400 text-black py-2 px-4 rounded border-none text-center max-h-10 flex items-center justify-center'
        >
          New post
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
          </svg>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ADD POST</DialogTitle>
        </DialogHeader>
        
        <UploadImage setChangePhoto={setChangePhoto}/>
        
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name='title'
                render={({field}) => {
                  return <FormItem className='mb-5'>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                }}
              />
              
              <FormField
                control={form.control}
                name='desc'
                render={({field}) => {
                  return <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                }}
              />
              
              <Button
                type="submit"
                className='w-full mt-5 bg-green-500 hover:bg-green-300 text-black'
              >
                Save
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}