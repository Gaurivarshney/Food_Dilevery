import {getApp, getApps ,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDP4Un_HVWukGGKLhi1c7OVc01HfT8hqyY",
    authDomain: "restrauntapp-e9b07.firebaseapp.com",
    databaseURL: "https://restrauntapp-e9b07-default-rtdb.firebaseio.com",
    projectId: "restrauntapp-e9b07",
    storageBucket: "restrauntapp-e9b07.appspot.com",
    messagingSenderId: "799486151285",
    appId: "1:799486151285:web:c0f1f2a87cf83bcf62463c"
  };

  const app = getApps.length > 0? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export{app,firestore, storage};