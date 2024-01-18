// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth,signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword} from'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'
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
// const provider= new GoogleAuthProvider();
// provider.setCustomParameters({
//     prompt:"select_account"
// });
export const auth=getAuth();
// export const signInWithGooglePopup=()=>signInWithPopup(auth,provider); 
export const db=getFirestore()


export const createUserDocumentFromAuth=async(userAuth)=>{
  console.log("adding to db2",userAuth.user.uid)
    const userDocRef=await doc(db,'users',userAuth.user.uid);
    console.log("userdocref",userDocRef);
    const userSnapShot= await getDoc(userDocRef);
    if (!userSnapShot.exists()){
        const {email}= userAuth.user;
        const createdAt=new Date();
        const emailAddress=email;
        const fullName="";                              // needs to add field in the signup form to add here
        console.log(createdAt,emailAddress,fullName) 
        try{await setDoc(userDocRef,{                   // user doc fields 
          fullName,
          emailAddress,
          createdAt
          })} catch (error) {
            console.log("error seting",error)
        }
    }
    console.log(userSnapShot.exists())
    return userDocRef;
}


export const addUser=async(userEmail,userPassword)=>{
  const userAuth=await createUserWithEmailAndPassword(auth,userEmail,userPassword);
  return userAuth;
}