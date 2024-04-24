import './Home.css';
import React from 'react';
import ChatbotElement from '../components/Chatbot/ChatbotElement';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='Home'>
      <div className='homeContents'>
        <p>어느 해수욕장으로<br></br>떠나고 싶나요?</p>

        <button onClick={() => navigate('/Search')}>시작하기 →</button>
      </div>
      <ChatbotElement />
    </div>
  )
};



export default Home;
