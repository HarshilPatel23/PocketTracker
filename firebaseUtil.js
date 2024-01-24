// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword} from'firebase/auth'
import {getFirestore,doc,getDoc,setDoc,collection,getDocs, addDoc} from 'firebase/firestore'
import React, { createContext, useContext, useState, useEffect } from 'react';

import {signInWithEmailAndPassword} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDH5GJuR290AcQtlcX_N6A4qOLSiodvug8",
  authDomain: "pocket-tracker-74811.firebaseapp.com",
  projectId: "pocket-tracker-74811",
  storageBucket: "pocket-tracker-74811.appspot.com",
  messagingSenderId: "645436597162",
  appId: "1:645436597162:web:378ae015fdb1581bc341d3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore()