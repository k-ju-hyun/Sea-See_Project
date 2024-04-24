import './Introduce.css'
import React from 'react'
import busanMap from '../image/busan_map.png';
import introduce1 from '../image/introduce1.png';
import lsh from '../image/lsh.jpeg';
import lhj from '../image/lhj.jpeg';
import kjh2 from '../image/kjh2.jpeg';
import kjh from '../image/kjh.jpeg';
import kgy from '../image/kgy.jpeg';
import kes from '../image/kes.jpeg';
import hjw from '../image/hjw.jpeg';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import IntroduceBreadcrumbElement from '../components/Breadcrumb/IntroduceBreadcrumbElement';
import ChatbotElement from '../components/Chatbot/ChatbotElement';
import { useNavigate } from 'react-router-dom';

const Introduce = () => {
  const navigate = useNavigate();

  return (
    <div className='Introduce'>
      <Container>
        <Col xs={12}>
            <IntroduceBreadcrumbElement />

            <div className='introduceContents'>
              <p className='introduceTitle'>소개</p>
              <div>
                <img src={busanMap} alt="busan_map" className='busan_map'/>
              </div>
              <div className='Contents'>
                <div className='MainTitle'>해수욕장 정보 한 눈에 비교하고 선택하세요 !</div>
                <div className='TitleContent'>우리의 서비스는 사용자가 복잡한 과정을 통해서 수집해야하는<br/>해수욕장의 정보를 한번에 보여주고, 여러 해수욕장의 정보를 비교하여<br/>나에게 맞는 해수욕장을 찾을 수 있게 도와주는 서비스입니다.</div>
                <button onClick={() => navigate('/Search')} className='servicebutton'>서비스 시작하기 →</button>
              </div>
            </div>

            <div className='info'>
              <div className='infoTitle'>해수욕장 신호등은 어떤 정보를 제공하나요?</div>
              <img src={introduce1} alt="introduce1"/>

                <div className='inner_info1'>
                  <div className='infoleft1'>
                    <div className='category'>혼잡도</div>
                    <div className='content'>밀집도 주변 기지국의 무선신호를 실시간으로 수집하여
                                      10분이상 신호가 잡힌 회선에 대해 체류로 추정,
                                      단위 면적(m**2)당 추정<br/> 방문자수를 이용해 혼잡도를 생성</div>
                  </div>
                  <div className='inforight1'>
                    <div className='category'>이안류</div>
                    <div className='content'>이안류 실시간 파고, 파향 파주기 등의 수치를 수집하고
                                      해수욕장 지형에 따라 이안류 지수를 계산하여 제공</div>
                  </div>
                </div>
              

                <div className='inner_info2'>
                  <div className='infoleft2'> 
                    <div className='category'>파고</div>
                    <div className='content'>파고 해안에 설치된 센서로서 해수면으로부터
                                      파도의 높이와 파도의 주기를 측정</div>
                  </div>
                  <div className='inforight2'>
                    <div className='category'>해파리</div>
                    <div className='content'>해파리 실시간 기온, 기압, 수온, 풍속, 파고, 염분, 조위와 같은
                                      수치들을 수집하여 인근 해역의 해파리 출현 확률을 예측</div>
                  </div>
                </div>

            </div>
            
            <div className='team'>
              <br></br>
              <br></br>
              <br></br>

            <div className='line'>
              <div className='team1'>
                <div className='kes'>
                  <img src={kes} alt="kes"/>
                  <p>                   고은송</p>
                  <p>              Front-end 개발<br></br>     kes110113@gmail.com</p>
                </div>
                <div className='lhj'>
                  <img src={lhj} alt="lhj"/>
                  <p>                   이현지</p>
                  <p>              Front-end 개발<br></br>   hyeonji7557@gmail.com</p>
                </div>
                <div className='hjw'>
                  <img src={hjw} alt="hjw"/>
                  <p>                   허진우</p>
                  <p>              Front-end 개발<br></br>        hjw1325@naver.com</p>
                </div>
              </div>
            </div>

              <br></br>
              <br></br>

            <div className='teamdown'>
              <div className='line'>
                <div className='team2'>
                  <div className='kjh2'>
                    <img src={kjh2} alt="kjh2"/>
                    <p>                   고재훈</p>
                    <p>                Back-end 개발<br></br>         ko4190@gmail.com</p>
                  </div>
                  <div className='lsh'>
                    <img src={lsh} alt="lsh"/>
                    <p>                   이승헌</p>
                    <p>                Back-end 개발<br></br>      eleron5603@gmail.com</p>
                  </div>
                </div>
              </div>
            
              <div className='line'>
                <div className='team3'>
                  <div className='kgy'>
                    <img src={kgy} alt="kgy"/>
                    <p>                   김근영</p>
                    <p>                    AI 개발<br></br>       rmsdud47@gmail.com</p>
                  </div>
                  <div className='kjh'>
                    <img src={kjh} alt="kjh"/>
                    <p>                   김주현</p>
                    <p>                    AI 개발<br></br>     wngus322@gmail.com</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </Col>
      </Container>
      <ChatbotElement />
    </div>
  )
}

export default Introduce