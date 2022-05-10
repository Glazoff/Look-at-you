import React from "react";

type TypeProps = {
  volue: number,
}

export const MeterIcon = ({volue} : TypeProps) => {
  const lvlVolue = {
    width: volue * 3,
    height: volue * 3,
  }
  return(
    <div className="meter-icon" >
      <div className="meter-icon_circle-1"></div>
      <div className="meter-icon_circle-2"></div>
      <div className="meter-icon_circle-3"></div>
      <div className="meter-icon_circle-4"></div>
      <div className="meter-icon_circle-5"></div>
      <div className="meter-icon_meter" style={lvlVolue}></div>
    </div>
  );
}
