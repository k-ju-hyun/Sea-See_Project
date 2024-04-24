import './ChatbotElement.css';
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

import chatboticon from '../../image/chatbot_icon.PNG';

const ChatbotElement = () => {
  const [showChat, setShowChat] = useState(false);

  const handleButtonClick = () => {
    setShowChat(true);
  };

  return (
    <div className='chatbot-element'>
      {!showChat && (
        <button className='chatbot-button' onClick={handleButtonClick}>
          <div>
            <img src={chatboticon} alt="chatboticon" className="chatbot-icon" />
          </div>
        </button>
      )}

      {showChat && <ChatWindow />}
    </div>
  );
};

export default ChatbotElement;
