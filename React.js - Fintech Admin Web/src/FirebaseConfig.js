import { initializeApp } from 'firebase/app'; 

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2LiDeOSc2uGCdOU3MRqbrfeZaNiCB458",
    authDomain: "brubankfirebase.firebaseapp.com",
    projectId: "brubankfirebase",
    storageBucket: "brubankfirebase.appspot.com",
    messagingSenderId: "456003111414",
    appId: "1:456003111414:web:7ae1d34535f680892f9fd7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 