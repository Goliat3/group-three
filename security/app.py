from fastapi import FastAPI, Form, Request, Depends, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import Optional
import hashlib

# FastAPI 앱 생성
app = FastAPI()

# 템플릿 렌더러 설정 (HTML 파일을 렌더링하기 위해 사용)
templates = Jinja2Templates(directory="templates")

# 간단한 사용자 정보 저장용 (실제 환경에서는 데이터베이스 사용)
fake_db = {}

# 로그인 및 회원가입 모델 정의
class User(BaseModel):
    username: str
    password: str

# 로그인 페이지 렌더링
@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

# 회원가입 페이지 렌더링
@app.get("/signup", response_class=HTMLResponse)
async def signup_page(request: Request):
    return templates.TemplateResponse("signup.html", {"request": request})

# 회원가입 처리
@app.post("/signup")
async def signup(username: str = Form(...), password: str = Form(...), confirm_password: str = Form(...)):
    # 비밀번호 확인
    if password != confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    # 사용자 이미 존재 확인
    if username in fake_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # 비밀번호 해싱
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    # 사용자 정보 저장
    fake_db[username] = hashed_password
    
    return {"message": "User successfully created"}

# 로그인 처리
@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    # 사용자 존재 확인
    if username not in fake_db:
        raise HTTPException(status_code=400, detail="Username not found")
    
    # 비밀번호 확인
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if fake_db[username] != hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    return {"message": "Login successful"}

# 서버 실행
# uvicorn main:app --reload 로 실행합니다.
