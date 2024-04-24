import './ChatWindow.css';
import axios from 'axios';
import { API_ENDPOINTS } from '../api/apiEndpoints';
import React, { useState, useRef, useEffect } from 'react';

import chatboticon from '../../image/chatbot_icon.PNG';
import xicon from '../../image/x.png';
import sendicon from '../../image/send.png';

const ChatWindow = () => {
  const [showChatWindow, setShowChatWindow] = useState(true);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('recommend');
  const [chatMessages, setChatMessages] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [instructionText, setInstructionText] = useState('');
  const [instructionText2, setInstructionText2] = useState('');
  const chatlistRef = useRef(null);
  const [messageToSend, setMessageToSend] = useState(null); 

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleXIconClick = () => {
    setShowChatWindow(false);
  };

  const handleChatBotIconClick = () => {
    setShowChatWindow(true);
    setShowInstructions(true);
  };

  const handleSendIconClick = async () => {
    console.log("handleSendIconClick called");  // 함수 호출 확인
    if (content.trim() !== '') {
      const question = content.trim();
    
      let answerContent;
    
      try {
        console.log("Sending request to API...");  // API 요청 확인
        const response = await axios.post(
          API_ENDPOINTS.chatbot,
          { category, content },
          { withCredentials: true }
        );
    
        if (response.status === 200) {
          console.log("Received response from API: ", response.data);  // API 응답 확인
          answerContent = response.data.message;
        }
      } catch (error) {
        console.error("Error with API request: ", error);  // API 요청 오류 확인
        if (error.response && error.response.data) {
          alert(error.response.data);
        } else {
          alert(error.message);
        }
      }
    
      if (answerContent) {
        console.log("Updating chatMessages with: ", question, answerContent);  // 상태 업데이트 확인
        setChatMessages((prevMessages) => [...prevMessages, { content: question }, { content: answerContent }]);
      }
    
      setContent('');
    }
  };

  {chatMessages.map((message, index) => (
    <div key={index}>
      <div className="message-send">{message.question}</div>
      <div className="answer">{message.answer}</div>
    </div>
  ))}
  
  const handleButton1Click = () => {
    setInstructionText('이용사항에 대한 도움이 필요합니다.');
    setTimeout(() => {
      setInstructionText2('이용사항에 대한 질문을 입력해주세요.');
    }, 500);
  };

  const handleButton2Click = () => {
    setInstructionText('추천에 대한 도움이 필요합니다.');
    setTimeout(() => {
      setInstructionText2(['여행가려는 구성원의 연령대를 알려주세요.',<br></br> ,'Ex)유아와 함께 갈만한 해수욕장을 추천해줘']);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target === e.currentTarget) {
      e.preventDefault();
      setMessageToSend(content);
      e.stopPropagation();
    }
  };
  
  
  const handleSendOnEnter = async (message) => {
    console.log("handleSendIconClick called");  // 함수 호출 확인
    if (content.trim() !== '') {
      const question = "질문 : " + content.trim();
    
      let answerContent;
    
      try {
        console.log("Sending request to API...");  // API 요청 확인
        const response = await axios.post(
          API_ENDPOINTS.chatbot,
          { category, content },
          { withCredentials: true }
        );
    
        if (response.status === 200) {
          console.log("Received response from API: ", response.data);  // API 응답 확인
          answerContent = "답변 : " + response.data.message;
        }
      } catch (error) {
        console.error("Error with API request: ", error);  // API 요청 오류 확인
        if (error.response && error.response.data) {
          alert(error.response.data);
        } else {
          alert(error.message);
        }
      }
    
      if (answerContent) {
        console.log("Updating chatMessages with: ", question, answerContent);  // 상태 업데이트 확인
        setChatMessages((prevMessages) => [...prevMessages, { content: question }, { content: answerContent }]);
      }
    
      setContent('');
    }
  };
  

  useEffect(() => {
    if (messageToSend !== null) {
      handleSendOnEnter(messageToSend);
      setMessageToSend(null);
    }
  }, [messageToSend]);
  

  const calculateTextareaHeight = () => {
    const lineCount = Math.ceil(content.length / 25);
    const lineHeight = 24;
    const minHeight = 50;
    const maxHeight = lineHeight * 5;
    const calculatedHeight = lineHeight * lineCount;
    return Math.max(minHeight, Math.min(calculatedHeight, maxHeight));
  };

  if (!showChatWindow) {
    return (
      <div className='chatbot-element'>
        <button className='chatbot-button' onClick={handleChatBotIconClick}>
          <div>
            <img src={chatboticon} alt="chatboticon" className="chatbot-icon" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className='chatwindow-bar'>
        <button className='chatwindow-button'>
          <div>
            <img src={chatboticon} alt="chatboticon" className="chatbot-icon" />
          </div>
        </button>
        <h5 style={{ fontSize: "20px", marginTop: "25px", fontWeight: "bold" }}>Sea & See</h5>
        <button className='x-button' onClick={handleXIconClick}>
          <div>
            <img src={xicon} alt="xicon" className="x-icon" />
          </div>
        </button>
      </div>

      <div className='chatlist-container'>
        <div className="chatlist" style={{ overflowY: 'auto' }} ref={chatlistRef}>

          {showInstructions && (
            <div className="answer"> Sea & See ChatBot에 오신걸 환영합니다. 무엇을 도와드릴까요?
              <br/>
              <button className='Button1' onClick={handleButton1Click}>이용사항</button>
              <button className='Button2' onClick={handleButton2Click}>추천</button>
            </div>
          )}

          {instructionText && (
            <div className="message-send">{instructionText}</div>
          )}

          {instructionText2 && (
            <div className="answer">{instructionText2}</div>
          )}

          {chatMessages.map((message, index) => (
          <div key={index} className={index % 2 === 0 ? "message-send" : "answer"}>
              {message.content}
          </div>
          ))}
        </div>
      </div>

      <div className='chatfooter'>
        <div className="input-container" style={{ display: 'flex', alignItems: 'center', position: 'relative', height: `${calculateTextareaHeight()}px` }}>
          <textarea
            className='chatcontent'
            style={{
              height: '100%',
              resize: 'none',
              paddingRight: '40px',
              paddingBottom: '0',
              boxSizing: 'border-box',
            }}
            placeholder='내용을 입력하세요.'
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
          />
          <button className='send-button' onClick={handleSendIconClick}>
            <img src={sendicon} alt="sendicon" className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

