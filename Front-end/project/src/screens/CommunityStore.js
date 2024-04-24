import './CommunityStore.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CommunityStoreBreadcrumbElement from '../components/Breadcrumb/CommunityStoreBreadcrumbElement';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ChatbotElement from '../components/Chatbot/ChatbotElement';

import StoreCardElement from '../components/StoreCard/StoreCardElement';
import { API_ENDPOINTS } from '../components/api/apiEndpoints';
import { SessionContext } from '../components/Session/SessionContext';

const CommunityStore = () => {
  const navigate = useNavigate();

  // 로그인 상태
  const { login, logout, userID } = useContext(SessionContext);

  // 카드 개수
  const [count, setCount] = useState([]);

  // 방문단위 선택 유지 버튼
  const [selectedOption, setSelectedOption] = useState('방문 단위');
  
  const handleDropdownSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  const CheckLogin = () => {
    if (sessionStorage.getItem('userID') != null){
      navigate('/UploadStore');
    } else{
      alert('먼저 로그인 해주세요');
    }
  }

  // json으로 커뮤니티 글 전부 GET
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
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
      const categorySmallValue = categorySmallMapping[selectedOption];

      // 방문단위 선택에 따라 요청 url 변경
      let endpoint = API_ENDPOINTS.communityList;
      if (!categorySmallValue) {
        endpoint = API_ENDPOINTS.communityListAll; // 선택된 옵션이 "전체" 또는 "방문 단위"인 경우에는 다른 엔드포인트 사용
      }

      // GET
      const response = await axios.get(endpoint, {
        params: {
          author: sessionStorage.getItem('userID'),
          categorybig: 1,
          categorysmall: categorySmallValue, // 선택된 옵션에 따라 categorysmall 값 설정
        },
      });
      setData(response.data);

      // 게시글 개수 구하기
      const updatedCount = Array.from({ length: response.data.length }, (_, index) => response.data.length - index);
      setCount(updatedCount);
    } catch (error) {
      console.error('Error:', error);
      setData(null);
    }
  };

  // 한번만 실행되도록(초기화할때 많이 쓰인다고 한다는데 사실 잘 모르고 대충 이렇게 하니깐 되더라)
  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  useEffect(() => {
    if (data) {
      console.log(data.length);
    }
  }, [data]);

  // 동적으로 카드 표시
  const getColWidth = (breakpoint) => {
    switch (breakpoint){
      case 'xs':
        return 12;
      case 'sm':
        return 8;
      case 'md':
        return 6;
      case 'lg':
        return 4;
      case 'xl':
        return 3;
      default:
        return 3;
    }
  };

  // 카드 띄우기
  const renderStoreCards = () => {
    if (!data) {
      return <div>로그인이 필요한 기능입니다.</div>;
    }
    
    return count.map((storeCount, index) => (
      <Col key={index} xs={getColWidth('xs')} sm={getColWidth('sm')} md={getColWidth('md')} lg={getColWidth('lg')} xl={getColWidth('xl')}>
        <StoreCardElement 
          user={sessionStorage.getItem('userID')}
          filename={data[storeCount -1].filename}
          boardId={data[storeCount -1].id}
          author={data[storeCount -1].author}
          title={data[storeCount -1].title}
          contents={data[storeCount -1].contents}
          location={data[storeCount -1].location}
          storename={data[storeCount -1].restaurant}
          published={data[storeCount -1].published}
          like={data[storeCount -1].like}
          like_me={data[storeCount -1].like_me}
        />
      </Col>
    ));
  };

  return (
    <div className='CommunityStore'>
      <Container>
        <Col xs={12}>
          <CommunityStoreBreadcrumbElement />
          <div className='communityStoreContents'>
            <h2 className='storeTitle'>해수욕장 주변 맛집</h2>
            <div className='communityStoreButtons'>
              <DropdownButton id="dropdown-basic-button" title={selectedOption} onSelect={handleDropdownSelect} className='storeGroupDropdown'>
                <Dropdown.Item eventKey='전체'>전체</Dropdown.Item>
                <Dropdown.Item eventKey='가족'>가족</Dropdown.Item>
                <Dropdown.Item eventKey='커플'>커플</Dropdown.Item>
                <Dropdown.Item eventKey='친구'>친구</Dropdown.Item>
                <Dropdown.Item eventKey='단체(6인 이상)'>단체(6인 이상)</Dropdown.Item>
                <Dropdown.Item eventKey='기타'>기타</Dropdown.Item>
              </DropdownButton>

              <a onClick={(CheckLogin)} className='storeUploadButton'>
                <span className='storeUpload'>업로드</span>
              </a>
            </div>
            <div className='storeCardElementArea'>
              <Row>{renderStoreCards()}</Row>
            </div>
            {/* <StoreCardElement 
              user='test'
              filename='test'
              boardId='test'
              author='test'
              title='test'
              contents='test'
              location='test'
              storename='test'
              published='test'
              like='test'
              like_me='test'
            /> */}
          </div>
        </Col>
      </Container>
      <ChatbotElement />
    </div>
  )
}

export default CommunityStore

