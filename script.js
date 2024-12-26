// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASUYjCOlM6zieMi6cHHiRhCLCO-MfyJtE",
  authDomain: "khsquiz.firebaseapp.com",
  projectId: "khsquiz",
  storageBucket: "khsquiz.firebasestorage.app",
  messagingSenderId: "121118377857",
  appId: "1:121118377857:web:b1586ac7d345573b068a80",
  measurementId: "G-NNJT5H71SS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function newproblem() {
    const Problem = s //문제 json으로 받아올 것
    currentProblem = Problem
    document.getElementById('problem').innerText = currentProblem //아무튼 새로운 문제 할당 function
}
function save() {

}
function main() {

}