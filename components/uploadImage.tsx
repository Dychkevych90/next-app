"use client";

import {Dispatch, SetStateAction, useState} from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "@/app/firebase";

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
      <input
        type="file"
        name="file"
        onChange={handleImageUpload}
      />
      <div>{`Upload is ${progress} % done`}</div>
    </>
  )
}

export default UploadImage