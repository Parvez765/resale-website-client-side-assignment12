import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"





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

    // SignIn With Login

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
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
        googleSignIn,
        userLogin
    }

   
    return (
        <AuthContext.Provider value = {authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;