"use client";

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "@/app/firebase";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

type uploadImageTypes = {
  setChangePhoto: Dispatch<SetStateAction<string>>;
}

const UploadImage = ({setChangePhoto}: uploadImageTypes) => {
  const [progress, setProgress] = useState<number>(0)
  
  const handleImageUpload = ( event: any ) => {
    event.preventDefault();
    const file = event.target.files[ 0 ];
    
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage( app );
    const storageRef = ref( storage, fileName );
    const uploadTask = uploadBytesResumable( storageRef, file );
    
    uploadTask.on(
      'state_changed',
      ( snapshot ) => {
        const progress
          = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
        console.log( 'Upload is ' + progress + '% done' );
        setProgress(progress)
        switch ( snapshot.state ) {
          case 'paused':
            console.log( 'Upload is paused' );
            break;
          case 'running':
            console.log( 'Upload is running' );
            break;
          default:
        }
      },
      ( error ) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL( uploadTask.snapshot.ref ).then( ( downloadURL ) => {
          setChangePhoto( downloadURL );
        } );
      },
    );
  };
  
  return(
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5 cursor-pointer relative">
        <Label htmlFor="picture">Image</Label>
        <Input id="picture" type="file" onChange={handleImageUpload}/>
      </div>
      
      {
        progress !== 0 && <Progress value={progress} className="w-[100%]" />
      }
    </>
  )
}

export default UploadImage