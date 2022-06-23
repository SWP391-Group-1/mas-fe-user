import { useContext, createContext, useEffect, useState } from 'react'
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext({
    isAuthenticated: false,
})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('access-token')
        return token != null
    })

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then((response) => {
            setIsAuthenticated(true)
            console.log(user.accessToken)
            localStorage.setItem('access-token-google', user.accessToken)
            navigate('/dashboard')
        })
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsub()
        }
    })
    return (
        <AuthContext.Provider
            value={{ googleSignIn, logOut, user, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
