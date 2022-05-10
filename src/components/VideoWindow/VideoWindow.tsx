import React, { useEffect, useRef } from "react";


export const VideoWindow = () => {
  const localVideo = useRef<HTMLVideoElement | null>(null);

  
  const getUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: {width: 280, height: 240}, audio: true});
     
      if(localVideo.current !== null) {
        localVideo.current.srcObject = stream;
      }

    } catch (err) {
      alert('Камера не подключена');
    }
  };

  useEffect(() =>{
    getUserMedia();
  },[])

  return(
    <div className="video-window">
      <video ref={localVideo} autoPlay></video>
    </div>
  );
}