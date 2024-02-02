import {doc,getDoc,setDoc,collection,getDocs, addDoc, updateDoc} from 'firebase/firestore'
import { db,auth } from '../firebaseUtil';
import React, { createContext, useContext, useState, useEffect } from 'react';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword, updatePassword} from 'firebase/auth'
import { updateProfile } from 'firebase/auth';

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
export const addUser=async(userEmail,userPassword,userName)=>{
    var user;
    await createUserWithEmailAndPassword(auth,userEmail,userPassword)
    .then(function(userCredential) {
        // Signed up successfully
        user=userCredential
        // Update the user's display name
        updateProfile(userCredential.user,{
          displayName: userName
        }).then(function() {
          // Display name updated successfully
          console.log("User signed up with display name:", userCredential.user.displayName);
        }).catch(function(error) {
          // An error occurred while updating display name
          console.error("Error updating display name:", error.message);
        });
    
    })
      .catch(function(error) {
        // Handle errors during the signup process
        console.error("Error signing up:", error.message);
    });
    return user;
}

const AuthContext = createContext();
// added to the app.js so we can useAuth to use below props
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
const [screenReload,setScreenReload]=useState()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      console.log("user",user)
      // console.log("setting user",user.email)
    });

    return unsubscribe;
  }, []);
  const reloadUser=()=>{
    setUser(null)
    setUser(auth.currentUser)
    console.log("reloaded",user)
  }
  const signIn = async (email, password) => {
    try {
      const response=await signInWithEmailAndPassword(auth,email, password);
      setUser(response.user)
      console.log("sucess",response.user.email)
      
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw error; 
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
    <AuthContext.Provider value={{ user, signIn, signOut,categories,subCategories,screenReload,setScreenReload,fetchCategoriesWithSubcategories,reloadUser}}>
      {children}
    </AuthContext.Provider>
  );
};
// create a user,category and sub category  info so can be asccesiable all the pages where we want to use
export const useAuth = () => useContext(AuthContext);

//function to get user info

export const getUserInfo = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      return { id: userSnapshot.id, ...userSnapshot.data() };
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user info:', error);
    throw error; 
  }
};

// function to update users information such as password and name

export const updateUserInformation=async(user,userName)=>{
    const userDocRef=await doc(db,'users',user.uid);
    const usersnapShot= await getDoc(userDocRef);
    if (usersnapShot.exists()){
      try{
        await updateDoc(userDocRef,{
          fullName:userName,
        })
      }catch(error){
        console.log(error)
      }
    }
    updateProfile(user,{
      displayName: userName
    }).then(function() {
      // Display name updated successfully
      console.log("Changed name successfully:", user.displayName);
    }).catch(function(error) {
      // An error occurred while updating display name
      console.error("Error updating display name:", error.message);
    });
}

//function to update password of the user

export const updateUserPassword=async(user,oldPassword,newPassword)=>{
    const userDocRef=await doc(db,'users',user.uid);
    const usersnapShot= await getDoc(userDocRef);
    if (usersnapShot.exists()){
      try{
        await updateDoc(userDocRef,{
          password:newPassword
        })
      }catch(error){
        console.log(error)
      }
    }
    const credential = signInWithEmailAndPassword(auth, user.email, oldPassword);
    credential.then(function(userCredential) {
      console.log("signed in")
      updatePassword(userCredential.user, newPassword)
      .then(function() {
        console.log("password updated")
        alert("Password updated successfully")
      }).catch(function(error) {
        console.log("error",error)
      });
    }).catch(function(error) {
      console.log("error",error)
      alert("Old password is incorrect, try again")
    });
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