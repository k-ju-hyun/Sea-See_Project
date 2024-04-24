import './UpdateStore.css'
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import UpdateStoreBreadcrumbElement from '../components/Breadcrumb/UpdateStoreBreadcrumbElement';
import ChatbotElement from '../components/Chatbot/ChatbotElement';

import mapicon from '../image/map_icon.png';
import storeicon from '../image/store_icon.png';

import { API_ENDPOINTS } from '../components/api/apiEndpoints';

const UpdateStore = () => {
    // 네비게이션으로 페이지 이동하면서 받은 state
    const locations = useLocation();

    // 받은 state에서 변수 설정
    const [boardId, setBoardId] = useState(locations.state.boardId);
    const [published, setPublished] = useState(locations.state.published);
    const [contenttitle, setContentTitle] = useState(locations.state.title);
    const [content, setContent] = useState(locations.state.contents);
    const [location, setLocation] = useState(locations.state.location);
    const [storename, setStoreName] = useState(locations.state.storename);

    // 다른 페이지로 이동하기 위한 변수
    const navigate = useNavigate();
  
    // 입력한 내용 처리
    const handleLocationChange = (event) => {
      setLocation(event.target.value);
    };
    const handleStoreNameChange = (event) => {
      setStoreName(event.target.value);
    };
    const handleContentTitleChange = (event) => {
      setContentTitle(event.target.value);
    };
    const handleContentChange = (event) => {
      setContent(event.target.value);
    };
  
    const handleUpdate = async () => {
        // 홈페이지에서 F12 누르고 콘솔 창에서 확인
        console.log('제목:', contenttitle);
        console.log('내용:', content);
        console.log('장소:', location);
        console.log('가게명:', storename);
        
        try{
          const response = await axios.put(API_ENDPOINTS.communityUpdate(boardId), {
            title: contenttitle,
            contents: content,
            published: published
          });
          
          console.log('업데이트 성공:', response);
          alert('게시글을 수정하였습니다.');
  
          // 게시글 업로드 후 CommunityStore 페이지로 이동
          navigate('/CommunityStore');
        } catch (error) {
          console.error('업데이트 실패:', error);
          alert('업데이트에 실패했습니다.');
        }
    };
  
    return (
      <div className='updateStore'>
        <Container>
          <Col xs={12}>
            <UpdateStoreBreadcrumbElement />
            <h2 className='updateStoreTitle'>수정하기</h2>
  
            <div className='parent-mapdiv' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className='div'>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={mapicon} alt="mapicon" className="map-icon" style={{ marginRight: "10px" }} />
                  <h5 style={{ fontSize: "16px", marginTop: "10px" }}>장소</h5>
                </div>
              </div>
            </div>
  
            <div>
              <input className='updateStorelocationstyle' type="text" placeholder='예 ) 해운대 해수욕장' value={location} onChange={handleLocationChange} readOnly/>
            </div>
  
            <div className='parent-storediv' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className='div'>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={storeicon} alt="storeicon" className="store-icon" style={{ marginRight: "10px" }} />
                  <h5 style={{ fontSize: "16px", marginTop: "10px" }}>가게명</h5>
                </div>
              </div>
            </div>
  
            <div>
              <input className='updateStorestorenamestyle' type="text" placeholder='가게명' value={storename} onChange={handleStoreNameChange} readOnly/>
            </div>
  
            <div className='parent-titlediv' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className='div'>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h5 style={{ fontSize: "16px" }}>제목</h5>
                </div>
              </div>
            </div>
  
            <div>
              <input className='updateStorecontentTitlestyle' type="text" placeholder='제목' value={contenttitle} onChange={handleContentTitleChange} />
            </div>
  
            <div className='parent-contentdiv' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className='div'>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h5 style={{ fontSize: "16px" }}>내용</h5>
                </div>
              </div>
            </div>
          
            <div style={{ position: 'relative' }}>
              <textarea
                className='updateStorecontentstyle'
                style={{
                  height: content.length > 20 ? `${Math.ceil(content.length / 20) * 1.6}rem` : 'initial',
                  resize: 'none',
                  paddingRight: '0',
                  paddingBottom: '0'
                }}
                placeholder='내용을 입력하세요.'
                value={content}
                onChange={handleContentChange}
              />
            </div>
  
            <div>
              <button id="UploadButton" className = "updateButton" type="button" onClick={handleUpdate}>수정하기</button>
            </div> 
          </Col>
        </Container>
        <ChatbotElement />
      </div>
    );
}

export default UpdateStore