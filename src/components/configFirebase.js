import * as firebase from "firebase";
 const config = {
    apiKey: "AIzaSyBmbftMvorqXamfjPhpmDBOHq1VdJR5_bg",
    authDomain: "kmutnb-aqi.firebaseapp.com",
    databaseURL: "https://kmutnb-aqi.firebaseio.com",
    projectId: "kmutnb-aqi",
    storageBucket: "kmutnb-aqi.appspot.com",
    messagingSenderId: "356211030762"
  }
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();