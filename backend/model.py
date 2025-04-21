#Models will be in this page

from typing import Annotated
from fastapi.responses import JSONResponse
from pydantic import BaseModel, BeforeValidator
from bson.objectid import ObjectId
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import(
    OAuth2PasswordBearer, 
)
import jwt
from pydantic import BaseModel
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

#Models in Relation to User Authentication
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


#Function to obtain the user
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

# Functions for adding a new user to the database
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

async def fetch_one_user_on_email(email):
    user_document = await user_collection.find_one({"email": email})
    return user_document

# async def update_user():

# need to change to id later, mongo ObjectId is weird

#Search for the user first through a query, then delete the user
async def remove_user(id):
    await user_collection.delete_one({"email":id})
    return True

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
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
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
