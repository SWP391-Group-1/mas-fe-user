// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyD7mmy9krr62eIZfc3gGRx2ACu-m1ZzbLg',
    authDomain: 'fpt-mas-5bab9.firebaseapp.com',
    projectId: 'fpt-mas-5bab9',
    storageBucket: 'fpt-mas-5bab9.appspot.com',
    messagingSenderId: '1024122491688',
    appId: '1:1024122491688:web:d3ec0e6682c7831edb761d',
    measurementId: 'G-VK3ZPNLKNN',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
