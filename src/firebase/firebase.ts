/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes,deleteObject
 } from "firebase/storage";

 const firebaseConfig = {
  apiKey: "AIzaSyCXHNBwCM6maMGnXdeeHprOLKtRdsJWILI",
  authDomain: "shopojtat.firebaseapp.com",
  projectId: "shopojtat",
  storageBucket: "shopojtat.appspot.com",
  messagingSenderId: "904031914665",
  appId: "1:904031914665:web:b661f05b7841d9be1b77b8",
  measurementId: "G-BQW3RPJMK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireBaseFn = {
  uploadToStorage: async (
    file: File,
    fallBackUrl: string = "https://firebasestorage.googleapis.com/v0/b/shopojtat.appspot.com/o/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg?alt=media&token=c0edf81b-b54e-40ce-8ec6-a0cf19c72de0"
  ) => {
    try {
      const typeFile = `.${file.type.split("/")[1]}`;
      const fileName = `picture_${Math.ceil(
        Date.now() * Math.random()
      )}${typeFile}`;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const res = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(res.ref)
        .then((res) => res)
        .catch((err) => (console.log(err), fallBackUrl));
      return url;
    } catch (err) {
      return fallBackUrl;
    }
  },
};
