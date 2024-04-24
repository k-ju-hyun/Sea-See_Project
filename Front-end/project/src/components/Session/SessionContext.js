import React, { createContext, useEffect, useState } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {

  const [userID, setUserID] = useState(null);


  const login = (newUserID, newSession) => { // 매개변수 이름 변경
    sessionStorage.setItem('userID', newUserID);
  };

  const logout = () => {
    sessionStorage.removeItem('userID');
  };

  const sessionData = { userID, login, logout };

  return (
    <SessionContext.Provider value={sessionData}>
      {children}
    </SessionContext.Provider>
  );
};
