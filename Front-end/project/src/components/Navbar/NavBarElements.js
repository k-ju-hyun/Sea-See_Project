import './NavBarElements.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { SessionContext } from '../Session/SessionContext';
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../api/apiEndpoints';
import classNames from 'classnames'

function CollapsibleExample() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userID, logout } = useContext(SessionContext);

  //로그아웃
  const handleLogout = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.logout, null, { withCredentials: true });
      if (response.status === 200) {
        logout();//세션 정보 삭제
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  // 현재 경로에서 특정 단어가 포함되는지 여부를 확인하는 함수
  const isPathIncludes = (keywords) => {
    return keywords.some(keyword => location.pathname.includes(keyword));
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="light" fixed='top' className='NavbarAll'>
      <Container>
        <Navbar.Brand onClick={()=>navigate('/')} className='seanseeTitle'>Sea & See</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/Introduce')} className={classNames('navbarMenu', { active: isPathIncludes(['Introduce']) })}>소개</Nav.Link>
            <Nav.Link onClick={()=>navigate('/Search')} className={classNames('navbarMenu', { active: isPathIncludes(['Search']) })}>해수욕장 신호등</Nav.Link>
            <NavDropdown title="커뮤니티" id="collasible-nav-dropdown" className={classNames('navbarCommunity', { active: isPathIncludes(['Community', 'Store', 'Photo']) })}>
              <NavDropdown.Item onClick={()=>navigate('/CommunityStore')}>해수욕장 주변 맛집</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate('/CommunityPhoto')}>해수욕장 포토스팟</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className='me-right'>
            {sessionStorage.getItem('userID') !== null ? (
              <Nav onClick={handleLogout} className='navbarLogout'>로그아웃</Nav>
              ) : (
                <Nav>
                  <Nav.Link onClick={()=>navigate('/Join')} className={classNames('navbarJoin', { active: isPathIncludes(['Join']) })}>회원가입</Nav.Link>
                  <Nav.Link onClick={()=>navigate('/Login')} className='navbarLogin'><span>로그인</span></Nav.Link>
                </Nav>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
