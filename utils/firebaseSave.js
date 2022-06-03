import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyACwQjIecE6LAmhgcamXjZ06vU15esnZ2Q",
    authDomain: "af-rpms.firebaseapp.com",
    projectId: "af-rpms",
    storageBucket: "af-rpms.appspot.com",
    messagingSenderId: "532242515311",
    appId: "1:532242515311:web:9b13fdd15dfd671b3a149a",
    measurementId: "G-41L16215K7"
  };

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);



export default (file,cb)=>{
    const storageRef = ref(storage, file.originalname);
    uploadBytes(storageRef, file.buffer).then(() => {
       return getDownloadURL(ref(storage, file.originalname));
    }).then(url=>{
        cb(null,url);
    }).catch(err=>{
        cb(err);
    });
    
}