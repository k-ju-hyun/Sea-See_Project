import './Join.css'
import React, { useState, useContext } from 'react';
import { SessionContext } from '../components/Session/SessionContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../components/api/apiEndpoints';
import ChatbotElement from '../components/Chatbot/ChatbotElement';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const Join = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState(''); // 비밀번호 확인
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [checkDuplicate, setCheck] = useState(false);
  const [checkMessage, setCheckMessage] = useState(''); // 아이디가 중복인지 확인할 때 출력하는 메시지
  const [passwordMatch, setPasswordMatch] = useState(true); // 두 비밀번호가 일치하는지 확인
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(''); // 비밀번호가 유효한 형식인지 확인할 때 출력할 메시지
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  const { login } = useContext(SessionContext); //비구조화 할당 : SessionContext에서 login 만 가져오겠다.

  const handleJoin = async (e) => {
    e.preventDefault();
    if (checkDuplicate && password === passwordCheck && password.length >= 8 && agree1 && agree2 && agree3){
      try {
        const response = await axios.post( 
          API_ENDPOINTS.join, 
          { userId, password, name, phone, birth }, 
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
    } else if (!checkDuplicate) {
      alert("아이디 중복확인을 해주세요!");
    } else {
      alert('비밀번호가 일치하지 않거나 조건을 만족하지 않습니다.');
    }
  };

  const handleCheckDuplicate = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.checkDuplicate(userId));

      if (response.status === 200) {
        const { duplicate } = response.data;
        setCheck(!duplicate);
        if (!duplicate){
          setCheckMessage("사용가능한 아이디 입니다.");
        }
        else {
          setCheckMessage("중복된 아이디 입니다.");
        }
      }

    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert(error.message);
      }
    }
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8 || !/\d/.test(e.target.value) || !/[a-zA-Z]/.test(e.target.value)) {
      setPasswordErrorMessage('비밀번호는 영문과 숫자를 포함한 8글자 이상이어야 합니다.');
    } else {
      setPasswordErrorMessage('');
    }
  };

  return (
    <div className='Join'>
      <Container>
        <Col xs={12}>
          <div className='joinContents'>

            <form onSubmit={handleJoin}>
              <div>
                <h1 className='joinTitle'>회원가입</h1>
              </div>
              <div className='joinLeftForm'>
              
                <label>아이디</label>
                <div>
                  <input type="text" placeholder='아이디' className='joinId' value={userId} onChange={(e) => setUserId(e.target.value)} />
                  <button type="button" className='joinIdCheck' onClick={handleCheckDuplicate}>중복확인</button>
                </div>
                <div>
                {checkMessage && <span className={`errorMessage ${checkDuplicate ? 'available' : 'duplicate'}`}>{checkMessage}</span>}
                </div>

                <label>비밀번호</label>
                <span className='normalMessage'>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</span>
                <input type="password" placeholder='비밀번호' value={password} onChange={handlePasswordChange} />
                <div>
                {passwordErrorMessage && <span className='errorMessage'>{passwordErrorMessage}</span>}
                </div>

                <label>비밀번호 확인</label>
                <input type="password" placeholder='비밀번호 확인' value={passwordCheck} onChange={handlePasswordCheckChange}/>
                {!passwordMatch && <span className='errorMessage'>비밀번호가 일치하지 않습니다.</span>}
              
                <label>이름</label>
                <input type="text" placeholder='이름' value={name} onChange={(e) => setName(e.target.value)} />
              
                <label>전화번호</label>
                <input type="text" placeholder="전화번호 ('-' 제외하고 입력)" value={phone} onChange={(e) => setPhone(e.target.value)} />
              
                <label>생년월일</label>
                <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />

                <span className="spacing"></span>

                <div className="checkbox-container">
                  <input type="checkbox" id="check1" className="joinCheckbox" checked={agree1} onChange={() => setAgree1(!agree1)} />
                  <label htmlFor="check1" className="checkbox-custom">✓</label>
                  <span>만 14세 이상입니다.</span>
                </div>
                <div className="checkbox-container">
                  <input type="checkbox" id="check2" className="joinCheckbox" checked={agree2} onChange={() => setAgree2(!agree2)} />
                  <label htmlFor="check2" className="checkbox-custom">✓</label>
                  <span>이용약관에 동의합니다.</span>
                </div>
                <div className="checkbox-container">
                  <input type="checkbox" id="check3" className="joinCheckbox" checked={agree3} onChange={() => setAgree3(!agree3)} />
                  <label htmlFor="check3" className="checkbox-custom">✓</label>
                  <span>개인정보 수집 및 이용에 동의합니다.</span>
                </div>
                {(!agree1 || !agree2 || !agree3) && <span className='errorMessage'>항목에 동의해주세요.</span>}

                <button type="submit" className='joinButton'>회원가입</button>
              </div>
              <div className='goTo'>
                이미 아이디가 있으신가요?
                <a href='/login' className='goToLogin'>로그인</a>
              </div>
            </form>
          </div>
        </Col>
      </Container>
      <ChatbotElement />
    </div>
  )
}

export default Join