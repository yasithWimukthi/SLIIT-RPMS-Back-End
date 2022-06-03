import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";

import fs from 'fs';

const firebaseConfig = {
  apiKey: "AIzaSyDN-4pKXq2Gq_41FPrVcK7-h9dejDo2Hbg",
  authDomain: "student-management-f2e04.firebaseapp.com",
  projectId: "student-management-f2e04",
  storageBucket: "student-management-f2e04.appspot.com",
  messagingSenderId: "122381542908",
  appId: "1:122381542908:web:7d7ef4be9954904734be79",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);



export default (file,cb)=>{
    const storageRef = ref(storage, file.originalname);
    uploadBytes(storageRef, file.buffer).then((snapshot) => {
       return getDownloadURL(ref(storage, file.originalname));
    }).then(url=>{
        cb(null,url);
    }).catch(err=>{
        cb(err);
    });
    
}