import React, { createContext, useContext, useState } from 'react';
import data from './instructions.json';

const TutorContext = createContext();

export const useTutor = () => {
    return useContext(TutorContext); 
}

export const TutorContextProvider = ({children}) => {
    const [tutor, ] = useState(data);

    return (
        <TutorContext.Provider value={tutor}>
            {children}
        </TutorContext.Provider>
    );
}