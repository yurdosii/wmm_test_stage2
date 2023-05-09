from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from src.wmm_backend.settings import CORS_ALLOWED_ORIGINS

from .models import Survey, SurveyCreate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MVP solution for right now, later some SQL/NoSQL DBs can be used
RESULTS: list[Survey] = []


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/surveys/")
async def add_survey_result(item: SurveyCreate):
    survey = Survey(**item.dict())
    RESULTS.append(survey)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.get("/surveys/")
async def get_survey_results() -> list[Survey]:
    return RESULTS
