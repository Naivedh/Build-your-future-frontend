import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { httpPost } from '../utils/api';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) =>  {
    const [authConfig, setAuthConfig] = useState(null);

    return (
        <AuthContext.Provider value={[authConfig, setAuthConfig]}>
            {children}
        </AuthContext.Provider>
    );
}