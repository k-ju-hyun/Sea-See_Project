import React, { useEffect, useState } from "react";
import "./MapComponent.css";
import Busan from "../../Busan.json";

function MapComponent(props) {
  const [regionData, setRegionData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);


  useEffect(() => {
    setRegionData(Busan);
  }, []);

  const handleClick = (regionId) => {
    setSelectedRegion(regionId);
    props.onEvent(regionId);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="700"
      height="auto"
      strokeLinecap="round"
      strokeLinejoin="round"
      baseProfile="tiny"
      version="1.2"
      viewBox="0 0 800 800"
    >
      {regionData.map((region) => {
        const { id, path, name, color } = region;
        const isSelected = id === selectedRegion;
        // const colorSet = ["#2b90d9", 
        //                   "#d9e1e8", 
        //                   "#9baec8", 
        //                   "#282c37"
        //                 ]
        const regionStyle = {
          fill: isSelected ? "#007BFC" : "#9baec8",
          transitionDuration: "1s" // 애니메이션 시간 설정
        };

        return (
          <g key={id}>
            <path
              className="region"
              d={path}
              id={`region-${id}`}
              style={regionStyle}
              onClick={() => handleClick(id)}
            />
            
          </g>
        );
      })}
      
    </svg>
  );
}

export default MapComponent;
