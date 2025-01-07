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
        import { doc, getDoc } from "firebase/firestore";

        const RandPNum = Math.floor(1+Math.random()*3);
        const docRef = doc(db, "korean", RandPNum);
        const docSnap = await getDoc(docRef);
        const problem = docSnap.data('problem')
        const answer = docSnap.data('answer')
        const Number = 0;

        function createProblem() {
            const RandPNum = Math.floor(1+Math.random()*3);
            const docRef = doc(db, "korean", RandPNum);
            const docSnap = getDoc(docRef);
            const problem = docSnap.data('problem')
            const answer = docSnap.data('answer')
            const Number = 0;
            const PSec = document.getElementsByClassName('p')
            Psec.src="data:image/;base64,"+problem;
        }
        function checkAnswer() {
            if(number == answer) {
                console.log("정답입니다!")
            }else {
                console.log("오답입니다.")
            }
        }
        function Answer(number) {
            Number = number
        }
