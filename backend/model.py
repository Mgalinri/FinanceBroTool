from pydantic import BaseModel

class user(BaseModel):
    first_name: str
    last_name: str
    email: str
    password_hash: str

class user_account(BaseModel):
    # figure out how to make this FK
    user_id: int
    amount: float

class category(BaseModel):
    category_name: str

class user_espenses(BaseModel):
    # figure out how to make this FK
    user_id: int
    # figure out how to make this FK
    category_id: int

class budgeting_percentages(BaseModel):
    # figure out how to make this FK
    user_id: int
    # figure out how to make this FK
    category_id: int
    # not sure what budgeting percentages means ngl
    assigned_percentages: int