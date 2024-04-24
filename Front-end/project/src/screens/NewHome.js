import './NewHome.css';
import React from 'react';
import ChatbotElement from '../components/Chatbot/ChatbotElement';
import Background from '../components/background/Background';
import { useNavigate } from 'react-router-dom';


const NewHome = () => {
  const navigate = useNavigate();

  return (
    <div className='newHome'>
          <div className='newHomeContents'>
            <Background/>
            <p>어느 해수욕장으로<br></br>떠나고 싶나요?</p>
            <button onClick={()=>navigate('/Search')}>시작하기 →</button>
          </div>
          <ChatbotElement />
    </div>
  )
};



export default NewHome;
