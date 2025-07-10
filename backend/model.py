from typing import Optional
from pydantic_mongo import  PydanticObjectId
from pydantic import BaseModel, Field

# Models

class TokenData(BaseModel):
    username: str | None = None

class User(BaseModel):
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    income: int | None = None
    percentages: object | None = None

class UserInDB(BaseModel):
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    disabled: bool | None = None
    password: str
    income: int | None = None
    percentages: object | None = None

class UserExpensesInDB(BaseModel):
    userid: str | None = None
    category: str | None = None
    description: str | None = None
    amount: int | None = None

class UserExpense(BaseModel):
    expenseid : Optional[PydanticObjectId] = Field(alias="_id")
    userid: str | None = None
    category: str | None = None
    description: str | None = None
    amount: int | None = None
   