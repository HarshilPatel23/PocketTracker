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

// create user document in database
export const createUserDocumentFromAuth=async(userAuth)=>{
    const userDocRef=await doc(db,'users',userAuth.user.uid);
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


// signup user through email and password
export const addUser=async(userEmail,userPassword)=>{
  const userAuth=await createUserWithEmailAndPassword(auth,userEmail,userPassword);
  return userAuth;
}


// add expenses into logged user
export const addExpense=async(userId,amount,category,subCategory,expTitle)=>{
  const userDocRef=await doc(db,'users',userId);
  const expensesCollectionRef = collection(userDocRef, 'expenses');
  const currency="CAD"
    try{
      // Example: Adding an expense document to the "expenses" collection
      const addDate= new Date();
      const expenseData = {
        expTitle,
        addDate,
        category,
        subCategory,
        currency,
        amount
        // Add any other expense-related fields here
      };
      // Firestore will automatically generate a unique ID for the expense document
      await addDoc(expensesCollectionRef, expenseData);
    }catch(error){
      console.log(error)
    }

      

  return "expense added"
}

 
const AuthContext = createContext();
// added to the app.js so we can useAuth to use below props
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      console.log("user",user)
      // console.log("setting user",user.email)
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    try {
      const response=await signInWithEmailAndPassword(auth,email, password);
      setUser(response.user)
      console.log("sucess",response.user.email)
      
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  const [categories,setCategories]=useState([])
  const [subCategories,setSubCategory]=useState({})
  const fetchCategoriesWithSubcategories = async () => {
    try {
      const db = getFirestore(); // Get Firestore instance
      const categoriesCollection = collection(db, 'categories'); // Reference to the "categories" collection
      const categoriesSnapshot = await getDocs(categoriesCollection); // Fetch category documents
  
      const categoriesData = [];
      const subCategories= {} // Initialize an array to store subcategories
      for (const categoryDoc of categoriesSnapshot.docs) {
        const category = {
          label: categoryDoc.id,
          value:categoryDoc.id
          
        };
  
        // Reference to the "subCategories" subcollection
        const subCategoriesCollection = collection(categoryDoc.ref, 'subCategories');
        const subCategoriesSnapshot = await getDocs(subCategoriesCollection); // Fetch subcategory documents
        subCategories[categoryDoc.id]=[]
        for(const subCategoryDoc of subCategoriesSnapshot.docs){
          subCategories[categoryDoc.id].push({
            label:subCategoryDoc.id,
            value:subCategoryDoc.id
          })
        };
        // subCategoriesSnapshot.forEach((subCategoryDoc) => {
        //   // Add subcategory data to the array
        //   category.subCategories.push({
        //     id: subCategoryDoc.id,
        //   });
        // });
  
        categoriesData.push(category);
      }
      console.log('Categories with Subcategories:', categoriesData,"sub",subCategories);
      setCategories(categoriesData)
      setSubCategory(subCategories)
    } catch (error) {
      console.error('Error fetching categories with subcategories:', error);
      return null;
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, signIn, signOut,categories,subCategories,fetchCategoriesWithSubcategories }}>
      {children}
    </AuthContext.Provider>
  );
};
// create a user,category and sub category  info so can be asccesiable all the pages where we want to use
export const useAuth = () => useContext(AuthContext);


// function to get expenses details of the users.

export const getUserExpenses=async(userId)=>{
  const userDocRef=await doc(db,'users',userId);
  const usersnapShot= await getDoc(userDocRef);
  const expenses=[];
  if (usersnapShot.exists()){
    const expenseCollectionRef = collection(usersnapShot.ref, 'expenses');
    const expensesSnapShot = await getDocs(expenseCollectionRef); // Fetch expenses shnapshots
    expensesSnapShot.forEach((expenseDoc)=>{
      expenses.push({
        id: expenseDoc.id,
        ...expenseDoc.data()
      })
    });
    console.log("expenses",expenses)
    return expenses
  }
}