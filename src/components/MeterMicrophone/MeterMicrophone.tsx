import React, { useEffect, useState } from "react";

import { MeterIcon } from "../MeterIcon/MeterIcon";

export const MeterMicrophone = () => {
  const [volueMic, setVolueMic] = useState<number>(0);


  const getUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;
      microphone.connect(analyser);

      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      scriptProcessor.onaudioprocess = function() {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        setVolueMic(Math.round(average));
      };

    } catch (err) {
      alert('Микрофон не подключен');
    }
  };


  useEffect(() => {
    getUserMedia();
  },[])

  return(
    <div className="meter-mic">
      <MeterIcon volue={volueMic}/>
      <h3 className="meter-mic__title">Микрофон</h3>
      
    </div>
  )
}