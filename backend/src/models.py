import uuid

from pydantic import BaseModel, Field


class SurveyBase(BaseModel):
    store_name: str | None
    gift_card_balance: str | None
    gift_card_price: str | None
    network: str | None
    wallet_address: str | None
    email_address: str | None


class SurveyCreate(SurveyBase):
    pass


class Survey(SurveyBase):
    survey_uid: uuid.UUID = Field(default_factory=uuid.uuid4)
