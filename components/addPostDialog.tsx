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

const formSchema = z.object({
  title: z.string().min(5, {
    message: "title must be at least 5 characters.",
  }),
  desc: z.string().min(5, {
    message: "description must be at least 5 characters.",
  }),
  //image: z.string()
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
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          ADD POST
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
                  return <FormItem>
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
                      <Input
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                }}
              />
              
              <Button
                type="submit"
                className='w-full mt-5'
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