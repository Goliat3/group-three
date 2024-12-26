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
async function getProblems(category) {
  if(category == english) {
    try {
      const problemCol = collection(db, "problem");
      const problemSnapshot = await getDocs(problemCol);
      const problemList = problemSnapshot.docs.map((doc) => ({
        id: doc.id, // 각 문서의 ID 포함
        ...doc.data(), // 문서 데이터를 펼쳐서 객체로 반환
      }));
      return problemList;
    } catch (error) {
      console.error("Error getting problems:", error);
      return [];
    }  
  }else if(category == math) {
    try {
      const problemCol = collection(db, "problem");
      const problemSnapshot = await getDocs(problemCol);
      const problemList = problemSnapshot.docs.map((doc) => ({
        id: doc.id, // 각 문서의 ID 포함
        ...doc.data(), // 문서 데이터를 펼쳐서 객체로 반환
      }));
      return problemList;
    } catch (error) {
      console.error("Error getting problems:", error);
      return [];
    }
  }else if(category == korean) {
    try {
      const problemCol = collection(db, "problem");
      const problemSnapshot = await getDocs(problemCol);
      const problemList = problemSnapshot.docs.map((doc) => ({
        id: doc.id, // 각 문서의 ID 포함
        ...doc.data(), // 문서 데이터를 펼쳐서 객체로 반환
      }));
      return problemList;
    } catch (error) {
      console.error("Error getting problems:", error);
      return [];
    }
  }
}

async function checkAnswer(problemId, userAnswer) {
  try {
    const problemDoc = doc(db, "problem", problemId); // 특정 문제 문서 참조
    const problemSnapshot = await getDoc(problemDoc); // 문서 데이터 가져오기

    if (!problemSnapshot.exists()) {
      return { status: "error", message: "Problem not found" };
    }

    const problemData = problemSnapshot.data();
    if (problemData.answer === userAnswer) {
      return { status: "correct", message: "You got the correct answer!" };
    } else {
      return { status: "incorrect", message: "Wrong answer, try again." };
    }
  } catch (error) {
    console.error("Error checking answer:", error);
    return { status: "error", message: "An error occurred while checking the answer." };
  }
}

async function createProblem(question, answer,category) {
  if(category == english) {
    try {
      const problemCol = collection(db, "problem"); // 'problem' 컬렉션 참조
      const newProblem = {
        question: question, // 문제 텍스트
        answer: answer, // 정답 Q
      };
      const docRef = await addDoc(problemCol, newProblem); // 새 문서 추가
      return { status: "success", message: "Problem created successfully", id: docRef.id };
    } catch (error) {
      console.error("Error creating problem:", error);
      return { status: "error", message: "An error occurred while creating the problem." };
    }
  }else if(category == math) {
    try {
      const problemCol = collection(db, "problem"); // 'problem' 컬렉션 참조
      const newProblem = {
        question: question, // 문제 텍스트
        answer: answer, // 정답 Q
      };
      const docRef = await addDoc(problemCol, newProblem); // 새 문서 추가
      return { status: "success", message: "Problem created successfully", id: docRef.id };
    } catch (error) {
      console.error("Error creating problem:", error);
      return { status: "error", message: "An error occurred while creating the problem." };
    }
  }else if(category == korean) {
    try {
      const problemCol = collection(db, "problem"); // 'problem' 컬렉션 참조
      const newProblem = {
        question: question, // 문제 텍스트
        answer: answer, // 정답 Q
      };
      const docRef = await addDoc(problemCol, newProblem); // 새 문서 추가
      return { status: "success", message: "Problem created successfully", id: docRef.id };
    } catch (error) {
      console.error("Error creating problem:", error);
      return { status: "error", message: "An error occurred while creating the problem." };
    }
  }
}
