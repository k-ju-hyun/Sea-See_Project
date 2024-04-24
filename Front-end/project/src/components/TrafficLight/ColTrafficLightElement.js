import './ColTrafficLightElement.css';
import React from 'react';

import congestion1 from '../../image/congestion1.png';
import congestion2 from '../../image/congestion2.png';
import congestion3 from '../../image/congestion3.png';
import congestion4 from '../../image/congestion4.png';

import ripCurrent1 from '../../image/ripCurrent1.png';
import ripCurrent2 from '../../image/ripCurrent2.png';
import ripCurrent3 from '../../image/ripCurrent3.png';
import ripCurrent4 from '../../image/ripCurrent4.png';

import waveHeight1 from '../../image/waveHeight1.png';
import waveHeight2 from '../../image/waveHeight2.png';
import waveHeight3 from '../../image/waveHeight3.png';
import waveHeight4 from '../../image/waveHeight4.png';

import jellyfish1 from '../../image/jellyfish1.png';
import jellyfish2 from '../../image/jellyfish2.png';
import jellyfish3 from '../../image/jellyfish3.png';
import jellyfish4 from '../../image/jellyfish4.png';

const ColTrafficLightElement = ({color1, color2, color3, color4, selectLightEvent}) => {
    
    const selectPopulationDensity = async () => { selectLightEvent('populationDensity'); }
    const selectRipCurrent = async () => { selectLightEvent('ripCurrent'); }
    const selectWaveHeight = async () => { selectLightEvent('waveHeight'); }
    const selectJellyfish = async () => { selectLightEvent('jellyfish'); }
    
    const congestionColor = [congestion1, congestion2, congestion3, congestion4]
    const ripCurrentColor = [ripCurrent1, ripCurrent2, ripCurrent3, ripCurrent4]
    const waveHeightColor = [waveHeight1, waveHeight2, waveHeight3, waveHeight4]
    const jellyfishColor = [jellyfish1, jellyfish2, jellyfish3, jellyfish4]

    return (
    <div className='colTrafficLight'>
        <div className='colCircle gray' onClick={selectPopulationDensity}><img className='trafficLightImg' src={congestionColor[color1-1]} alt=''/></div>
        <div className='colCircle gray' onClick={selectRipCurrent}><img className='trafficLightImg' src={ripCurrentColor[color2-1]} alt=''/></div>
        <div className='colCircle gray' onClick={selectWaveHeight}><img className='trafficLightImg' src={waveHeightColor[color3-1]} alt=''/></div>
        <div className='colCircle gray' onClick={selectJellyfish}><img className='trafficLightImg' src={jellyfishColor[color4-1]} alt=''/></div>
    </div>
  )
}

export default ColTrafficLightElement;