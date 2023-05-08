from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from .models import Survey, SurveyCreate

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://0.0.0.0:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
async def add_survey_result(data: SurveyCreate):
    survey = Survey(**data.dict())
    RESULTS.append(survey)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.get("/surveys/")
async def get_survey_results() -> list[Survey]:
    return RESULTS
