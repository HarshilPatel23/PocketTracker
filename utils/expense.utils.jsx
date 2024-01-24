import {doc,getDoc,setDoc,collection,getDocs, addDoc} from 'firebase/firestore'
import { db,auth } from '../firebaseUtil';
import { useState } from 'react';

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
  
  