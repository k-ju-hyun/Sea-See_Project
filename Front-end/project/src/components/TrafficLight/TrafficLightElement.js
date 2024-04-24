import './TrafficLightElement.css'
import React from 'react'

const TrafficLightElement = ({color1, color2, color3, color4}) => {
    const getCircleColor = (color) => {
    switch (color) {
        case 1:
            return 'green';
        case 2:
            return 'yellow';
        case 3:
            return 'red';
        default:
            return 'gray';
        }
    };
  
    return (
    <div className='trafficLight'>
        <div className={`circle ${getCircleColor(color1)}`}></div>
        <div className={`circle ${getCircleColor(color2)}`}></div>
        <div className={`circle ${getCircleColor(color3)}`}></div>
        <div className={`circle ${getCircleColor(color4)}`}></div>
    </div>
  )
}

export default TrafficLightElement