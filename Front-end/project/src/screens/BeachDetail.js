import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import SearchBreadcrumbElement from '../components/Breadcrumb/SearchBreadcrumbElement';
import './BeachDetail.css'
import haeundae from '../image/haeundae.jpg';
import imrang from '../image/imrang.jpg';
import ilgwang from '../image/ilgwang.jpg';
import songjung from '../image/songjung.jpg';
import songdo from '../image/songdo.jpg';
import dadaepo from '../image/dadaepo.jpg';
import gwanganri from '../image/gwanganri.jpg';
import ScoreChart from '../components/Chart/ScoreChart';
import { useState, useEffect } from 'react';

import ColTrafficLightElement from '../components/TrafficLight/ColTrafficLightElement';
import temp from '../image/temp.png';
import waterTemp from '../image/waterTemp.png';
import windSpeed from '../image/windSpeed.png';
import windDirection from '../image/windDirection.png';
import moment from 'moment';

const BeachDetail = () => {
    const location = useLocation();
    const beachInfo = location.state.beachInfo;
    const trafficLightInfo = location.state.trafficLightInfo;
    const [selectedTrafficLight, setTrafficLight] = useState("populationDensity");
    const [value, setValue] = useState(0);

    useEffect(() => {
        // 값이 변경될 때마다 애니메이션 효과를 보여주기 위해 setTimeout을 사용합니다.
        const timer = setTimeout(() => {
          setValue(1);
        }, 1000);
    
        return () => {
          clearTimeout(timer);
        };
      }, []);
    

    const getFontColor = (color) => {
    switch (color) {
        case 1:
            return 'greenFont';
        case 2:
            return 'yellowFont';
        case 3:
            return 'redFont';
        default:
            return 'grayFont';
        }
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

    const selectLight = {
        "populationDensity": ["인구혼잡도", beachInfo['populationDensity'], trafficLightInfo['populationDensity'], "주변 기지국의 무선신호를 실시간으로 수집하여 10분이상 신호가 잡힌 회선에 대해 체류로 추정, 단위 면적(m**2)당 추정 방문자수를 이용해 혼잡도를 생성"],
        "ripCurrent": ["이안류지수", beachInfo['ripCurrent'], trafficLightInfo['ripCurrent'], "실시간 파고, 파향 파주기 등의 수치를 수집하고 해수욕장 지형에 따라 이안류 지수를 계산하여 제공"],
        "waveHeight": ["파고", beachInfo['waveHeight'], trafficLightInfo['waveHeight'], "해안에 설치된 센서로서 해수면으로부터 파도의 높이와 파도의 주기를 측정 "],
        "jellyfish": ["해파리지수", beachInfo['jellyfish'], trafficLightInfo['jellyfish'], "실시간 기온, 기압, 수온, 풍속, 파고, 염분, 조위와 같은 수치들을 수집하여 인근 해역의 해파리 출현 확률을 예측"]
    }

    return (
        <div className='BeachDetail'>
            <Container>
                <Col xs={12}>
                <SearchBreadcrumbElement />
                    <div className='BeachDetailColBox'>
                        <div className='BeachDetailTopContent'>
                            <div className='BeachIntroduce'>
                                <div className='BeachIntroduceTopContent'>
                                    <div className='BeachIntroduceTopImage'>
                                        <img src={imageSet[beachInfo['beachName']]}/>
                                    </div>
                                    <div className='BeachIntroduceTopText'>
                                        <div className='BeachIntroduceTitle'>
                                            {beachInfo['beachName']}
                                        </div>
                                        <div className='BeachIntroduceAddress'>
                                            부산광역시 해운대구 해운대해변로 264 (우동)
                                        </div>
                                    </div>
                                </div>
                                <div className='BeachIntroduceBottomContent'>
                                    백사장 길이가 1.5km, 폭 70~90m, 면적 120,000㎡로 수심이 얕고 조수의 변화가 심하지 않으며 주변에 오락시설과 부대시설이 많아 해마다 천만명이 넘는피서객이 찾아오고 있다. 또한 매년 해수욕장 개장과 어울러 각종행사와 축제가 개최되어 해운대를 찾는 관광객들에게 풍성한 볼거리를 제공하고 있다
                                    <br/>
                                    <br/>
                                    해운대 해수욕장의 백사장 모래는 까칠까칠하고 깨끗하여 몸에 묻으면잘 떨어지는 특징이 있으며, 이 모래는 춘천천 하천강변으로부터 유입된 모래와 조개껍질이 오랜세월의 풍화작용을 거쳐 다듬어진 양질의 모래이다.
                                </div>
                            </div>
                            <div className='space'></div>
                            <div className='BeachTrafficLight'>
                                <div className='BeachTrafficLightTitle'>
                                    해수욕장 안전 신호등
                                </div>
                                <div className='renewal_date'>갱신일자 : {moment(beachInfo['renewalDate']).format('YYYY/MM/DD HH:mm')}</div>
                                <div className='BeachTrafficLightContent'>
                                    <div className='TrafficLightArea'>
                                        <ColTrafficLightElement
                                            color1={trafficLightInfo['populationDensity']}
                                            color2={trafficLightInfo['ripCurrent']}
                                            color3={trafficLightInfo['waveHeight']}
                                            color4={trafficLightInfo['jellyfish']}
                                            selectLightEvent={setTrafficLight}
                                        />
                                    </div>
                                    <div className='TrafficLightExplain'>
                                        <div className='LightCategory'>
                                            {selectLight[selectedTrafficLight][0]}
                                        </div>
                                        <div className={getFontColor(selectLight[selectedTrafficLight][2])}>
                                            {selectLight[selectedTrafficLight][1]}
                                        </div>
                                        <div className='explain'>
                                            {selectLight[selectedTrafficLight][3]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='space'>
                        </div>
                        <div className='BeachDetailBottomContent'>
                            <div className='AdditionalBeachInfoList'>
                                <div className='BeachDetailBottomContentTitle'>해수욕장 추가 정보</div>
                                <div className='AdditionalBeachInfo'>
                                    <div className='BeachInfoIcon'><img src={temp}/></div>
                                    <div className='BeachInfoCategory'>기온</div>
                                    <div className='BeachInfoScore'>{beachInfo['airTemp']}</div>
                                </div>
                                <div className='AdditionalBeachInfo'>
                                    <div className='BeachInfoIcon'><img src={waterTemp}/></div>
                                    <div className='BeachInfoCategory'>수온</div>
                                    <div className='BeachInfoScore'>{beachInfo['waterTemp']}</div>
                                </div>
                                <div className='AdditionalBeachInfo'>
                                    <div className='BeachInfoIcon'><img src={windSpeed}/></div>
                                    <div className='BeachInfoCategory'>풍속</div>
                                    <div className='BeachInfoScore'>{beachInfo['windSpeed']}</div>
                                </div>
                                <div className='AdditionalBeachInfo'>
                                    <div className='BeachInfoIcon'><img src={windDirection}/></div>
                                    <div className='BeachInfoCategory'>풍향</div>
                                    <div className='BeachInfoScore'>{beachInfo['windDirect']}</div>
                                </div>
                            </div>
                            <div className='chart'>
                            <div className='BeachDetailBottomContentTitle'>해수욕지수</div>
                            <ScoreChart beachInfo = {beachInfo} style={{ width: '80%', height: '400px' }}/>
                            </div>
                        </div>
                    </div>
                </Col>
            </Container>
        </div>
    );
};

export default BeachDetail;
