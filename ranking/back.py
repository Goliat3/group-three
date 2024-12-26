from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# FastAPI 애플리케이션 생성
app = FastAPI()

# 데이터베이스 설정
DATABASE_URL = "sqlite:///./ranking.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 템플릿 설정
templates = Jinja2Templates(directory="templates")

# 랭킹 모델
class Ranking(Base):
    __tablename__ = "rankings"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), nullable=False)
    score = Column(Integer, nullable=False)

# 데이터베이스 생성
Base.metadata.create_all(bind=engine)

# Pydantic 모델
class RankingCreate(BaseModel):
    username: str
    score: int

# 의존성 - 데이터베이스 세션 가져오기
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 랭킹 페이지
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# 랭킹 데이터 조회 API
@app.get("/api/rankings")
async def get_rankings(db: Session = Depends(get_db)):
    rankings = db.query(Ranking).order_by(Ranking.score.desc()).all()
    return [{"username": r.username, "score": r.score} for r in rankings]

# 랭킹 데이터 추가 API
@app.post("/api/rankings", status_code=201)
async def add_ranking(ranking: RankingCreate, db: Session = Depends(get_db)):
    new_ranking = Ranking(username=ranking.username, score=ranking.score)
    db.add(new_ranking)
    db.commit()
    db.refresh(new_ranking)
    return {"message": "Ranking added successfully!"}
