import './Search.css'
import React, { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import SearchBreadcrumbElement from '../components/Breadcrumb/SearchBreadcrumbElement';
import TrafficLightElement from '../components/TrafficLight/TrafficLightElement';
import BeachCardElement from '../components/BeachCard/BeachCardElement';
import axios from 'axios';
import { API_ENDPOINTS } from '../components/api/apiEndpoints';
import MapComponent from '../components/map/MapComponent';
import ChatbotElement from '../components/Chatbot/ChatbotElement';

function Search(){
  const [BeachData, setBeachData] = useState([]);
  const [region, setRegion] = useState(null);
  const regionName = ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "상구", "해운대구", "북구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"];


  const handleClickRegion = async (regionId) => {
    try{
      setRegion(regionName[regionId])
      const response = await axios.get( API_ENDPOINTS.allBeachInfoSearchFromDB(regionName[regionId]));
      console.log(response.data);
      setBeachData(response.data);
    } catch{
      console.log("error!!");
    }
  }

  return (
    <div className='Search'>
      <Container>
        <Col xs={12}>
          <SearchBreadcrumbElement />
          
          <div className='searchContents'>
            
            <div className='mapSection'>
              <div>해수욕장 신호등</div>
              <MapComponent onEvent = {handleClickRegion}/>
            </div>
            <div className='beachCardSection'>
              <div className='regionName'>{region != null ? region + '의 해수욕장':""}</div>
              <div></div>
              <div className='trafficLightInfo'>
                <TrafficLightElement 
                  color1={1}
                  color2={2}
                  color3={3}
                  color4={4} 
                />
                <div className='lightInfo'>혼잡도 / 이안류 / 파고 / 해파리</div>
              </div>
              { BeachData.map((beach) => {
                  const {wave_height, air_temp, congestion_score, water_temp, renewal_date, ripCurrent_score, beach_name, wind_speed, wind_direct, wave_period, jellyfish, day1_am, day1_pm, day2_am, day2_pm, day3_am, day3_pm} = beach;    
                  const wave_heightDouble = parseFloat(wave_height);
                  const air_tempDouble = parseFloat(air_temp);
                  const congestion_scoreDouble = parseFloat(congestion_score);
                  const water_tempDouble = parseFloat(water_temp);
                  const ripCurrent_scoreDouble = parseFloat(ripCurrent_score);
                  const wind_speedDouble = parseFloat(wind_speed);
                  const wave_periodDouble = parseFloat(wave_period);
                  
                  const beachInfo = {
                    "beachName" : beach_name,
                    "populationDensity" : congestion_scoreDouble,
                    "ripCurrent" : ripCurrent_scoreDouble,
                    "waveHeight" : wave_heightDouble,
                    "jellyfish" : jellyfish,
                    "airTemp" : air_tempDouble,
                    "waterTemp" : water_tempDouble,
                    "windSpeed" : wind_speedDouble,
                    "windDirect" : wind_direct,
                    "wavePeriod" : wave_periodDouble,
                    "day1_am" : day1_am,
                    "day1_pm" : day1_pm,
                    "day2_am" : day2_am,
                    "day2_pm" : day2_pm,
                    "day3_am" : day3_am,
                    "day3_pm" : day3_pm,
                    "renewalDate" : renewal_date,
                  };

                  const populationDensityLight = congestion_score === "" ? 4 : 0 <= congestion_scoreDouble && 0.72 > congestion_scoreDouble ? 1 : 0.72 <= congestion_scoreDouble && 1.44 > congestion_scoreDouble ? 2 : 3;
                  const ripCurrentLight = ripCurrent_score === "" ? 4 : 0 <= ripCurrent_scoreDouble && 30 > ripCurrent_scoreDouble ? 1 : 30 <= ripCurrent_scoreDouble && 55 > ripCurrent_scoreDouble ? 2 : 3;
                  const waveHeightLight = wave_height === "" ? 4 : 0 <= wave_heightDouble && 0.89 > wave_heightDouble ? 1 : 0.89 <= wave_heightDouble && 2.67 > wave_heightDouble ? 2 : 3;
                  
                  const trafficLightInfo = {
                    "beachName" : beach_name,
                    "populationDensity" : populationDensityLight,
                    "ripCurrent" : ripCurrentLight,
                    "waveHeight" : waveHeightLight,
                    "jellyfish" : !jellyfish ? 4 : jellyfish === '초록' ? 1 : jellyfish === '주황' ? 2 : 3,
                  };
                  

                  return(
                    <BeachCardElement
                      beachInfo = {beachInfo}
                      trafficLightInfo = {trafficLightInfo}
                    />
                  );
              })}
            </div>
        </div>
        </Col>
      </Container>
      <ChatbotElement />
    </div>
  )
}

export default Search