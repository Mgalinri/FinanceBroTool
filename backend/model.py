from typing import Annotated
from pydantic import BaseModel, BeforeValidator
from bson.objectid import ObjectId

# Convert ObjectId to string for Pydantic error
def objectid_to_str(value):
    if isinstance(value, ObjectId):
        return str(value)
    return value

class user(BaseModel):
    first_name: str
    last_name: str
    email: str
    password_hash: str

class user_account(BaseModel):
    # FK
    user_id: Annotated[str, BeforeValidator(objectid_to_str)]
    amount: float

class category(BaseModel):
    category_name: str

class user_espenses(BaseModel):
    # FK
    user_id: Annotated[str, BeforeValidator(objectid_to_str)]
    # FK
    category_id: Annotated[str, BeforeValidator(objectid_to_str)]

class budgeting_percentages(BaseModel):
    # FK
    user_id: Annotated[str, BeforeValidator(objectid_to_str)]
    # FK
    category_id: Annotated[str, BeforeValidator(objectid_to_str)]
    # not sure what budgeting percentages means ngl
    assigned_percentages: int