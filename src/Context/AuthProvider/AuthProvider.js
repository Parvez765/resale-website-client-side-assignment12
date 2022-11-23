import React, { createContext } from 'react';
import app from '../../firebase/firebase.config';
import {getAuth} from "firebase/auth"

const auth = getAuth(app)

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    
    const value = {}

    const authInfo = {value}
    return (
        <div>
            {children}
        </div>
    );
};

export default AuthProvider;