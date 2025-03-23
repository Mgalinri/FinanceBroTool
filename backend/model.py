from typing import Annotated
from pydantic import BaseModel, BeforeValidator
from bson.objectid import ObjectId
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import(
    OAuth2PasswordBearer, 
 OAuth2PasswordRequestForm,
 SecurityScopes,
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
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('MONGO_DB'))

database = client.FinanceBroTool
user_collection = database.user
user_account_collection = database.user_account

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

# Convert ObjectId to string for Pydantic error
def objectid_to_str(value):
    if isinstance(value, ObjectId):
        return str(value)
    return value

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
    


class UserInDB(BaseModel):
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    disabled: bool | None = None
    password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()


def verify_password(plain_password, hashed_password):
    print(plain_password)
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


#Check if user exists in the database
async def get_user(email: str):
    obtain_user = await user_collection.find_one({
        "email": email})
   
    if obtain_user:
        user_dict = obtain_user
        return UserInDB(**user_dict)
    return None


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

async def fetch_all_users():
    users = []
    cursor = user_collection.find({})
    async for document in cursor:
        users.append(User(**document))
    return users

async def create_user(user):
    print(type(user['password']))
    hash = get_password_hash(user['password'])
    user['password'] = hash
    document = user
    result = await user_collection.insert_one(document)
    return result

async def create_user_account(user_acc):
    document = user_acc
    document["user_id"] = ObjectId(document["user_id"])
    result = await user_account_collection.insert_one(document)
    return result

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


#Models created by Grayson for MongoDB
#Check which class are we keeping

    
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