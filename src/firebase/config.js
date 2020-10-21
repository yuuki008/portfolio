import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import {firebaseConfig} from './config'

export const firebaseConfig = {
    apiKey: "AIzaSyAn69RQiL4hlrdSS4wjsn2aWbOLbjYym5I",
    authDomain: "portfolio-9fef6.firebaseapp.com",
    databaseURL: "https://portfolio-9fef6.firebaseio.com",
    projectId: "portfolio-9fef6",
    storageBucket: "portfolio-9fef6.appspot.com",
    messagingSenderId: "1080208511037",
    appId: "1:1080208511037:web:46ff77ac5aa8debd681a54",
    measurementId: "G-XKNF8HB2VC"
  };


firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const functions = firebase.functions()
export const FirebaseTimestamp = firebase.firestore.Timestamp;