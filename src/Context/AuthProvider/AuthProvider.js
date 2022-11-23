import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth"
import { current } from 'daisyui/src/colors';




export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    // Create User With Email And Password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign in With Google
    const googleSignIn = (provider) => {
        return signInWithPopup(auth, provider)
    }

    // Sigout User
    const userSignOut = () => {
        setLoading(true)
        return signOut(auth)
    }




    // Observar
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])
   
    
    const authInfo = {
        user,
        createUser,
        loading,
        userSignOut,
        googleSignIn
    }

   
    return (
        <AuthContext.Provider value = {authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;