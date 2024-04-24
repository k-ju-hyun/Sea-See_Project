import './Background.css'
import React, { useEffect } from 'react'

import twitterImage from '../../image/twitter_icon.png'
import facebookImage from '../../image/facebook_icon.png'
import instagramImage from '../../image/instagram_icon.png'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Background = () => {
    useEffect(() => {
        // 스크롤을 가장 아래로 내리기
        window.scrollTo(100, document.body.scrollHeight);

        // 스크롤 제거
        document.body.style.overflow = 'hidden';
    }, []);
    return (
        <div className='background'>
        <Container>
            <Col xs={12}>
            <div className='backgroundContainer'>
                <div class="waveCircle">
                    <div class="wave-one"></div>
                    <div class="wave-two"></div>
                    <div class="wave-three"></div>
                </div>
            </div>
            </Col>
        </Container>
        </div>
    )
}

export default Background