'use client'
import Message from "./components/Message";
import { useState } from "react";
import Loading from "./components/Loading";

export default function Home() {
  const [imagePc, setImage] = useState("")
  const [botName, setName] = useState("")
  const [loading, setLoading] = useState(true)


  const token = process.env.NEXT_PUBLIC_TOKEN;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({user_id: process.env.NEXT_PUBLIC_ID, offset: null, limit: null})
  };


 async function getPhotoId() {
  const response = await fetch(`https://api.telegram.org/bot${token}/getUserProfilePhotos`, options);
  const data = await response.json();
  getPhotoPath(data.result.photos[0][data.result.photos[0].length - 1].file_id)
  }

  getPhotoId();

 async function getPhotoPath(id) {
    const response = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${id}`);
    const data = await response.json();
  setImage(`https://api.telegram.org/file/bot${token}/${data.result.file_path}`)
  setLoading(false)
  }

async function getName() {
  const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
  const data = await response.json();
  setName(data.result.first_name)
  }
  getName();


  return (
    
    loading ? <Loading/>: <div>
  <Message image={imagePc} name={botName}/>
    </div>
  );
}
