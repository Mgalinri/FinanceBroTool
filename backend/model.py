from typing import Annotated, List
from fastapi.responses import JSONResponse
from pydantic import BaseModel, BeforeValidator
from bson.objectid import ObjectId
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import(
    OAuth2PasswordBearer, 
)
import jwt
from pydantic import BaseModel
from fastapi import Request
from jwt.exceptions import InvalidTokenError
import motor.motor_asyncio
import os 
from datetime import datetime, timedelta, timezone
#To hash password coming from the user
from passlib.context import CryptContext

from dotenv import load_dotenv
#Turn this into environment variable
load_dotenv()
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('MONGO_URI'))

database = client.FinanceBroTool
user_collection = database.user
user_expense_collection = database.user_expenses

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

# Models

class Token(BaseModel):
    access_token: str
    token_type: str

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

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Obtain User Via Email

async def get_user(email: str):
    """
    Checks if the user exists in the database by finding a user with the same email\n
    Parameters
    email (str): The email of the user to be found\n
    Return
    the user as a pydantic model if it exists, otherwise returns None"""
    obtain_user = await user_collection.find_one({
        "email": email})
   
    if obtain_user:
        user_dict = obtain_user
        return UserInDB(**user_dict)
    return None

async def get_expenses(email: str) -> List[UserExpensesInDB]:
    cursor = user_expense_collection.find({"userid": email})
    expenses = []
    print("hello")
    async for doc in cursor:
        expenses.append(UserExpensesInDB(**doc))
    
    return expenses

async def get_percentages(email: str):
    # tells mongo to excluse _id and only pull percentages object
    user = await user_collection.find_one({"email": email}, {"_id": 0, "percentages": 1})
    
    if user and "percentages" in user:
        return user["percentages"]
    return None

async def get_income(email: str):
    # tells mongo to excluse _id and only pull percentages object
    user = await user_collection.find_one({"email": email}, {"_id": 0, "income": 1})
    
    if user and "income" in user:
        return user["income"]
    return None


# Register User

async def create_user(user):
    """Creates a new user in the database\n
    Parameters
    user (dict) : The user model data\n
    Return
    The added user document"""
    hash = get_password_hash(user['password'])
    user['password'] = hash
    document = user
    result = await user_collection.insert_one(document)
    return result

async def set_user_income(email, income):
    result = await user_collection.update_one(
        {"email": email},
        {"$set": {"income": income}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found or income already up to date")
    
    return JSONResponse(content={"message": "Income updated successfully", "modified_count": result.modified_count})

async def set_user_percentages(email, percentages):
    result = await user_collection.update_one(
        {"email": email},
        {"$set": {"percentages": percentages}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found or percentages already up to date")
    
    return JSONResponse(content={"message": "Percentages updated successfully", "modified_count": result.modified_count})

async def set_user_expense(user_expense_doc):
    result = await user_expense_collection.insert_one(user_expense_doc)

    return result

# User Authentication

async def authenticate_user( username: str, password: str):
    user = await get_user(username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
   
    to_encode.update({"exp": expire})
   
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_password_hash(password):
    """Hashes the password using bcrypt algorithm \n
    Parameters
    password (str): The password to be hashed\n
    Returns the hashed password"""
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    """
    Verifies the password using bcrypt algorithm\n

    Args:
        plain_password (_type_): _description_
        hashed_password (bool): _description_

    Returns:
        _type_: _description_
    """
    print(plain_password)
    return pwd_context.verify(plain_password, hashed_password)

# Extras we may not need

#Search for the user first through a query, then delete the user
async def remove_user(id):
    await user_collection.delete_one({"email":id})
    return True

def get_token_from_cookie(request:Request):
    "Gets the token from the cookie in the request\n"
   
    print(request.cookies.get("access_token"))
    token = request.cookies.get("access_token")
    if request.cookies.get("access_token") is None:
        raise HTTPException(status_code=401, detail="Token not found in cookies")
    return token

async def get_current_user(token: Annotated[str, Depends(get_token_from_cookie)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("email")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username= username)
    except InvalidTokenError:
        raise credentials_exception
    user = await get_user(email=username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
  
    return current_user

async def fetch_one_user_on_email(email):
    user_document = await user_collection.find_one({"email": email})
    return user_document