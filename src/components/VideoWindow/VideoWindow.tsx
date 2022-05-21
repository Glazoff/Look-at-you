import React, { useEffect, useRef } from "react";


export const VideoWindow = () => {
  const localVideo = useRef<HTMLVideoElement | null>(null);

  
  const getUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true}); 
      if(localVideo.current !== null) {
        localVideo.current.srcObject = stream;
      }
    } catch (err) {
      alert('камера отключена');
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