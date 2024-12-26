import firebase_admin
from firebase_admin import credentials, firestore
from fastapi import FastAPI, Form, HTTPException
import hashlib

# Firebase 인증 설정
cred = credentials.Certificate("path/to/your/firebase_credentials.json")
firebase_admin.initialize_app(cred)

# Firestore 클라이언트 초기화
db = firestore.client()

app = FastAPI()

# 회원가입 처리
@app.post("/signup")
async def signup(username: str = Form(...), password: str = Form(...), confirm_password: str = Form(...)):
    # 비밀번호 확인
    if password != confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # Firestore에서 사용자 컬렉션 확인
    users_ref = db.collection("users")
    user_doc = users_ref.document(username).get()

    # 사용자 이미 존재 확인
    if user_doc.exists:
        raise HTTPException(status_code=400, detail="Username already exists")

    # 비밀번호 해싱
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    # 사용자 데이터 Firestore에 저장
    users_ref.document(username).set({
        "username": username,
        "password": hashed_password
    })

    return {"message": "User successfully created"}

# 로그인 처리
@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    # Firestore에서 사용자 찾기
    users_ref = db.collection("users")
    user_doc = users_ref.document(username).get()

    # 사용자 존재 확인
    if not user_doc.exists:
        raise HTTPException(status_code=400, detail="Username not found")
    
    # 비밀번호 확인
    user_data = user_doc.to_dict()
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    if user_data["password"] != hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    return {"message": "Login successful"}
