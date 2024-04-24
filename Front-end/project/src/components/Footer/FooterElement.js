import './FooterElement.css'
import React from 'react'

import twitterImage from '../../image/twitter_icon.png'
import facebookImage from '../../image/facebook_icon.png'
import instagramImage from '../../image/instagram_icon.png'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FooterElement = () => {
  return (
    <div className='Footer'>
      <Container>
        <Col xs={12}>
          <div className='footerArea1'>
            <a href='/' className='footerVisit'>이용약관</a>
            <a href='/' className='footerVisit'>개인정보 처리방침</a>
            <a href='https://map.naver.com/v5/entry/place/31063836?c=15,0,0,0,dh' className='footerVisit'>찾아오시는 길</a>
            <a href='/' className='footerVisit'>인재채용</a>
          </div>
          <div>
            <Container>
              <Row>
                <Col xs={8} className='footerArea2'>
                  대구 수성구 신매동 566 대구 수성구 달구벌대로 3176<br />
                  TEL : 053-616-8123<br />
                  E-MAIL : user@seansee.co.kr<br />
                  FAX : 053-686-6586<br />
                  <br />
                  Copyright © Sea & See  All  right reserved.<br />
                  <br />
                </Col>
                <Col className='footerArea3'>
                  <a href='https://twitter.com/'>
                    <img src={twitterImage} alt="twitter" className='twitter'/>
                  </a>
                  <a href='https://ko-kr.facebook.com/'>
                    <img src={facebookImage} alt="facebook" className='facebook'/>
                  </a>
                  <a href='https://www.instagram.com/'>
                    <img src={instagramImage} alt="instagram" className='instagram'/>
                  </a>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Container>
    </div>
  )
}

export default FooterElement