// src/main/frontend/src/App.js
import './App.css'
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import NewHome from './screens/NewHome';
import Introduce from './screens/Introduce';
import Search from './screens/Search';
import CommunityStore from './screens/CommunityStore';
import CommunityPhoto from './screens/CommunityPhoto';
import UploadPhoto from './screens/UploadPhoto';
import UploadStore from './screens/UploadStore';
import UpdateStore from './screens/UpdateStore';
import UpdatePhoto from './screens/UpdatePhoto';
import BeachDetail from './screens/BeachDetail';
import Login from './screens/Login';
import Join from './screens/Join';
import TempCommunityStore from './screens/TempCommunityStore';
import TempCommunityPhoto from './screens/TempCommunityPhoto';
import { SessionProvider } from './components/Session/SessionContext';
import NavBarElements from './components/Navbar/NavBarElements'
import FooterElement from './components/Footer/FooterElement';
import "./Fonts/font.css";

function App() {
  //  const [data, setData] = useState('');

  //  useEffect(() => {
  //   fetchData();
  //  }, []);

  //  const fetchData = async () => {
  //   const backendURL = 'http://44.205.148.35:8080/hello'
  //   try {
  //     const response = await axios.get(backendURL, { responseType: 'text'});
  //     const textData = response.data;
  //     setData(textData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  //  };
  
  return (
    <div className='App'>
      <SessionProvider> {/* 세션 컨텍스트 제공 */}
        <Router>
          <NavBarElements />
          <Routes>
            <Route path="/" element = { <Home /> } />
            <Route path="/NewHome" element = { <NewHome /> } />
            <Route path="/Introduce" element = { <Introduce /> } />
            <Route path="/Search" element = { <Search /> } />
            <Route path="/CommunityStore" element = { <CommunityStore /> } />
            <Route path="/CommunityPhoto" element = { <CommunityPhoto /> } />
            <Route path="/UploadPhoto" element = { <UploadPhoto /> } />
            <Route path="/UploadStore" element = { <UploadStore /> } />
            <Route path="/UpdateStore" element = { <UpdateStore /> } />
            <Route path="/UpdatePhoto" element = { <UpdatePhoto /> } />
            <Route path="/Login" element = { <Login /> } />
            <Route path="/Join" element = { <Join /> } />
            <Route path="/BeachDetail" element = { <BeachDetail /> } />
            <Route path="/TempCommunityStore" element = { <TempCommunityStore /> } />
            <Route path="/TempCommunityPhoto" element = { <TempCommunityPhoto /> } />

          </Routes>
          <FooterElement />
        </Router>
      </SessionProvider>
    </div>
  );
}

export default App;