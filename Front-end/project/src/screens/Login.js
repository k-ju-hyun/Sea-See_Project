import './Login.css'
import React, { useState, useContext } from 'react';
import { SessionContext } from '../components/Session/SessionContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../components/api/apiEndpoints';
import ChatbotElement from '../components/Chatbot/ChatbotElement';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(SessionContext);//비구조화 할당 : SessionContext에서 login 만 가져오겠다.

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( 
        API_ENDPOINTS.login, 
        { userId, password }, 
        { withCredentials: true } 
      );

      if (response.status === 200) {
        login(response.data['userId'], response.data)//로그인 후 세션 정보 저장
        navigate('/');//home으로 redirect
      }

    } catch (error) {//예외처리
      if (error.response && error.response.data){
        alert(error.response.data);
      } else {
        alert(error.message);
      }
    } 
  };
  return (
    <div className='Login'>
      <Container>
        <Col xs={12}>
          <div className='loginContents'>
            <form onSubmit={handleLogin}>
              <div>
                <h1 className='loginTitle'>로그인</h1>
              </div>
              <div className='loginLeftForm'>
                <input className='id' type="text" placeholder='아이디' value={userId} onChange={(e) => setUserId(e.target.value)} />
                <input className='pw' type="password" placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='loginButton' type="submit">로그인</button>
              </div>
              <div className='goTo'>
                아직 계정이 없으신가요?
                <a href='/join' className='goToJoin'>회원가입</a>
              </div>
            </form>
          </div>
        </Col>
      </Container>
      <ChatbotElement />
    </div>
  )
};

export default Login;
