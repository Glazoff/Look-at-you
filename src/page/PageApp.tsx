import React from "react";
import { MeterMicrophone } from "../components/MeterMicrophone/MeterMicrophone";
import { VideoWindow } from "../components/VideoWindow/VideoWindow";

export const PageApp = () => {

  return(
    <div className="wrapper-page">
      <VideoWindow />
      <MeterMicrophone />
    </div>
  )
}