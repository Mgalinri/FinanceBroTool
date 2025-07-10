from typing import Annotated, List
from fastapi.responses import JSONResponse
from fastapi import Depends, HTTPException, status
from fastapi.security import(
    OAuth2PasswordBearer, 
)
from typing import  List
import jwt
from pydantic_mongo import  PydanticObjectId
from fastapi import Request
from jwt.exceptions import InvalidTokenError
import motor.motor_asyncio
import os 
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from dotenv import load_dotenv

from model import(
    TokenData,
    User,
    UserInDB,
    UserExpense
)

load_dotenv()

# DB Connection
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('MONGO_URI'))

database = client.FinanceBroTool
user_collection = database.user
user_expense_collection = database.user_expenses

# Pull env variables
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

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

async def get_expenses(email: str) -> List[UserExpense]:
    cursor = user_expense_collection.find({"userid": email})
    expenses = []
    # Loop through the cursor and create UserExpense objects
    # using the data from each document
    async for doc in cursor:
        expenses.append(UserExpense(**doc))
    
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
    print('percentages', percentages)
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
async def delete_expense(id):
    print(f"Deleting expense with id: {id}")
    """Maybe we need to add a date field to the expenses\n"""
    id_ = PydanticObjectId(id)
    print(f"ObjectId: {id_}")
    result = await user_expense_collection.delete_one({"_id": id_})
    return (HTTPException(status_code=200, detail="Expense deleted successfully")
            if result.deleted_count > 0 else HTTPException(status_code=404, detail="Expense not found"))

async def delete_expenses(email):
    """Deletes all expenses for a user\n
    Parameters
    email (str): The email of the user whose expenses are to be deleted\n
    Return
    The deleted user expense document"""
    result = await user_expense_collection.delete_many({"userid": email})
    return (HTTPException(status_code=200, detail="All expenses deleted successfully")
            if result.deleted_count > 0 else HTTPException(status_code=404, detail="Expenses not found"))

async def update_expense(id, user_expense_doc):
    """Updates the user expense in the database\n
    Parameters
    id (str): The id of the user expense to be updated\n
    user_expense_doc (dict): The user expense model data\n
    Return
    The updated user expense document"""
    id_ = PydanticObjectId(id)
    result = await user_expense_collection.update_one({"_id": id_}, {"$set": user_expense_doc})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found or income already up to date")
    
    return JSONResponse(content={"message": "Income updated successfully", "modified_count": result.modified_count})
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
    return pwd_context.verify(plain_password, hashed_password)

# Extras we may not need

#Search for the user first through a query, then delete the user
async def remove_user(id):
    await user_collection.delete_one({"email":id})
    return True

def get_token_from_cookie(request:Request):
    "Gets the token from the cookie in the request\n"
   
    
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
