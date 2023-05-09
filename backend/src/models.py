import uuid
from typing import Optional

from pydantic import BaseModel, Field


class SurveyBase(BaseModel):
    store_name: Optional[str]
    gift_card_balance: Optional[str]
    gift_card_price: Optional[str]
    network: Optional[str]
    wallet_address: Optional[str]
    email_address: Optional[str]


class SurveyCreate(SurveyBase):
    pass


class Survey(SurveyBase):
    survey_uid: uuid.UUID = Field(default_factory=uuid.uuid4)
