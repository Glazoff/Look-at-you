import React, { useEffect, useRef } from "react";

export const MeterMicrophone = () => {
  const maxVolume = 100;
  const highVolume = 80;
  const lowVolume = 69;
  const refVolume = useRef<HTMLMeterElement | null >(null);


  async function listenToVolume(stream: MediaStream)  {
    const audioContext = new AudioContext()
    await audioContext.audioWorklet.addModule('vumeter-processor.js');
    const microphone = audioContext.createMediaStreamSource(stream);
    const node = new AudioWorkletNode(audioContext, 'vumeter')
    node.port.onmessage  = event => {
      const volue = event.data.volume * 3500;
      if (refVolume.current !== null) {
        refVolume.current.value = volue;
      }
    }
    microphone.connect(node).connect(audioContext.destination);
  }

  async function getVolume () {
    try {
     const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
     listenToVolume(stream);
    } catch(e) {
      alert('микрофон отключен');
    }
  }

  useEffect(() => {
    getVolume();
  })

  
  return(
    <div className="meter-mic">
      <h3 className="meter-mic__title">Микрофон</h3>
      <meter className="meter-mic__meter" ref={refVolume} max={maxVolume}  low={lowVolume} high={highVolume} />
    </div>
  )
}
