import TrafficLightElement from '../TrafficLight/TrafficLightElement'
import './BeachCardElement.css'
import React  from 'react'
import { useNavigate } from 'react-router-dom';

import haeundae from '../../image/haeundae.jpg';
import imrang from '../../image/imrang.jpg';
import ilgwang from '../../image/ilgwang.jpg';
import songjung from '../../image/songjung.jpg';
import songdo from '../../image/songdo.jpg';
import dadaepo from '../../image/dadaepo.jpg';
import gwanganri from '../../image/gwanganri.jpg';

const BeachCardElement = ({beachInfo, trafficLightInfo}) => {
    const navigate = useNavigate();
    const handleMoreInfoClick = () => {
        navigate('/BeachDetail', { state: { beachInfo, trafficLightInfo } });
    };

    const imageSet = {
        "해운대해수욕장": haeundae,
        "임랑해수욕장": imrang,
        "일광해수욕장": ilgwang,
        "송정해수욕장": songjung,
        "송도해수욕장": songdo,
        "다대포해수욕장": dadaepo,
        "광안리해수욕장": gwanganri,
    }

    return (
        <div className='beachCard'>
            <img src={imageSet[beachInfo['beachName']]}/>
            <div className='beachCardContent'>
                <div className='beachCardContentTitle'>
                    <div>
                        <span className='beachName'>{beachInfo['beachName']}</span>
                    </div>
                </div>
                <div className='beachCardContentBottom'>
                    <div>
                        <TrafficLightElement 
                            color1={trafficLightInfo['populationDensity']}
                            color2={trafficLightInfo['ripCurrent']}
                            color3={trafficLightInfo['waveHeight']}
                            color4={trafficLightInfo['jellyfish']}
                        />
                    </div>
                    <div>
                    <div className='beachMore' onClick={handleMoreInfoClick}>
                        더 알아보기 ➜
                    </div>
                    </div>
                </div>
            </div>
        </div>
      ) 
}

export default BeachCardElement 