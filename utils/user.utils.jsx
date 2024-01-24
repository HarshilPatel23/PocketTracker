import {doc,getDoc,setDoc,collection,getDocs, addDoc} from 'firebase/firestore'
import { db,auth } from '../firebaseUtil';
import React, { createContext, useContext, useState, useEffect } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth'
// create user document in database
export const createUserDocumentFromAuth=async(userAuth)=>{
    const userDocRef=await doc(db,'users',userAuth.user.uid);
    const userSnapShot= await getDoc(userDocRef);
    if (!userSnapShot.exists()){
        const {email, displayName}= userAuth.user;
        const createdAt=new Date();
        const emailAddress=email;
        const fullName= displayName;                              // needs to add field in the signup form to add here (Added at 12.50 on 22nd y tirth)
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

//function to get user info

export const getUserInfo=async(userId)=>{
  const [userInfo,setUserInfo]=useState({})
    const userDocRef=await doc(db,'users',userId);
    const usersnapShot= await getDocs(userDocRef);
    if (usersnapShot.exists()){
      // return usersnapShot.data();
      setUserInfo(usersnapShot.data())
      console.log("user info",userInfo)
      return userInfo;

    }
}

// function to update users information such as password and name

export const updateUserInfrmation=async(userId,userName,userPassword)=>{
    const userDocRef=await doc(db,'users',userId);
    const usersnapShot= await getDoc(userDocRef);
    if (usersnapShot.exists()){
      try{
        await usersnapShot.ref.update({
          fullName:userName,
          password:userPassword
        })
      }catch(error){
        console.log(error)
      }
    }
}

// function to delete users

export const deleteUser=async(userId)=>{
    const userDocRef=await doc(db,'users',userId);
    const usersnapShot= await getDoc(userDocRef);
    if (usersnapShot.exists()){
      try{
        await usersnapShot.ref.delete()
      }catch(error){
        console.log(error)
      }
    }
  }