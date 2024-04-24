import './UploadStore.css'
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import UploadStoreBreadcrumbElement from '../components/Breadcrumb/UploadStoreBreadcrumbElement';
import ChatbotElement from '../components/Chatbot/ChatbotElement';

import mapicon from '../image/map_icon.png';
import storeicon from '../image/store_icon.png';

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { SessionContext } from '../components/Session/SessionContext';
import { API_ENDPOINTS } from '../components/api/apiEndpoints';

const UploadStore = () => {
  const [selectedFile, setSelectedFile] = useState(null); // 함수생성
  const [location, setLocation] = useState('');
  const [storename, setStoreName] = useState('');
  const [contenttitle, setContentTitle] = useState('');
  const [selectgroup, setselectgroup] = useState('방문 단위');
  const [content, setContent] = useState('');

  // 유저의 로그인 id 가져오기
  const { login, logout, userID } = useContext(SessionContext);

  // 다른 페이지로 이동하기 위한 변수
  const navigate = useNavigate();

  // 입력한 내용 처리
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);  // 파일 선택 시 setSelectedFile로 업데이트
  };
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

  const handleUpload = async () => {
    if (selectedFile) {
      // 홈페이지에서 F12 누르고 콘솔 창에서 확인
      console.log('파일 업로드:', selectedFile);
      console.log('커뮤니티: 해수욕장 주변 맛집');
      console.log('방문 단위:', selectgroup);
      console.log('작성자:', sessionStorage.getItem('userID'));
      console.log('제목:', contenttitle);
      console.log('내용:', content);
      console.log('장소:', location);
      console.log('가게명:', storename);

      // 방문단위 선택에 따라 categorysmall 값 지정
      const categorySmallMapping = {
        '방문 단위': undefined,
        '전체': undefined,
        '가족': 1,
        '커플': 2, 
        '친구': 3, 
        '단체(6인 이상)': 4,
        '기타': 5,
      };
      const categorySmallValue = categorySmallMapping[selectgroup];

      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('categorybig', 1);
      formData.append('categorysmall', categorySmallValue);
      formData.append('author', sessionStorage.getItem('userID'));
      formData.append('title', contenttitle);
      formData.append('contents', content);
      formData.append('location', location);
      formData.append('restaurant', storename);
      
      try{
        const response = await axios.post(API_ENDPOINTS.communityWrite, formData);
        
        console.log('업로드 성공:', response);
        alert('게시글을 업로드하였습니다.');

        // 게시글 업로드 후 CommunityStore 페이지로 이동
        navigate('/CommunityStore');
      } catch (error) {
        console.error('업로드 실패:', error);
        alert('업로드에 실패했습니다.');
      }
    } else {
      console.log('파일을 선택하세요.');
    }
  };

  const changeText = (selectedItem) => {
    setselectgroup(selectedItem);
  };

  return (
    <div className='UploadStore'>
      <Container>
        <Col xs={12}>
          <UploadStoreBreadcrumbElement />
          <h2 className='UploadStoreTitle'>업로드</h2>

          <label htmlFor="fileUpload" className="file-choose">
            {selectedFile ? (
              <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="selected-image" style={{maxWidth: '100%', maxHeight: '100%'}}/>
            ) : (
              <div className="Photosize"> 
                <div className="div">파일 선택</div>
              </div> 
            )}
          </label>

          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          <div className='parent-navdiv' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className='dropdown-div'>
              <Nav className='dropdown' style={{ justifyContent: "flex-end" }}>
                <NavDropdown title={selectgroup} id="uploaddropdown" className="upload-dropdown">
                <NavDropdown.Item onClick={() => changeText('가족')}>가족</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeText('커플')}>커플</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeText('친구')}>친구</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeText('단체(6인 이상)')}>단체(6인 이상)</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeText('기타')}>기타</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          </div>

          <div className='parent-mapdiv' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className='div'>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={mapicon} alt="mapicon" className="map-icon" style={{ marginRight: "10px" }} />
                <h5 style={{ fontSize: "16px", marginTop: "10px" }}>장소</h5>
              </div>
            </div>
          </div>

          <div>
            <input className='locationstyle' type="text" placeholder='예 ) 해운대 해수욕장' value={location} onChange={handleLocationChange} />
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
            <input className='storenamestyle' type="text" placeholder='가게명' value={storename} onChange={handleStoreNameChange} />
          </div>

          <div className='parent-titlediv' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className='div'>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h5 style={{ fontSize: "16px" }}>제목</h5>
              </div>
            </div>
          </div>

          <div>
            <input className='contentTitlestyle' type="text" placeholder='제목' value={contenttitle} onChange={handleContentTitleChange} />
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
              className='contentstyle'
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
            <button id="UploadButton" className = "UploadButton" type="button" onClick={handleUpload}>업로드</button>
          </div> 
        </Col>
      </Container>
      <ChatbotElement />
    </div>
  );
};

export default UploadStore