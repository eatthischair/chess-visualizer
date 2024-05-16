import React, {useState} from 'react';
import {MyContext} from './Context';

export const MyProvider = ({children}) => {
  const [prevColorMatrix, setPrevColorMatrix] = useState(null);

  return (
    <MyContext.Provider value={{prevColorMatrix, setPrevColorMatrix}}>
      {children}
    </MyContext.Provider>
  );
};
