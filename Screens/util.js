import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDH5GJuR290AcQtlcX_N6A4qOLSiodvug8",
    authDomain: "pocket-tracker-74811.firebaseapp.com",
    projectId: "pocket-tracker-74811",
    storageBucket: "pocket-tracker-74811.appspot.com",
    messagingSenderId: "645436597162",
    appId: "1:645436597162:web:378ae015fdb1581bc341d3"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };