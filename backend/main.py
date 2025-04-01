from datetime import datetime, timedelta, timezone
from fastapi.middleware.cors import CORSMiddleware
from bson.objectid import ObjectId
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import(
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,)
import os


# App object
app = FastAPI()

from model import (
    User, 
    get_current_user,
    get_current_active_user,
   Token,
   TokenData,
   verify_password,
    get_password_hash,
    authenticate_user,
    create_access_token,
    UserInDB,
    user_account, 
    user_espenses, 
    category, 
    budgeting_percentages,
    fetch_one_user_on_email,
    fetch_all_users,
    create_user,
    create_user_account,
    remove_user
    )



app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:3000"],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*'],
)



ACCESS_TOKEN_EXPIRE_MINUTES = 30


@app.get("/")
def read_root():
    return {"Ping":"pong"}

@app.get("/api/financebrotool")
async def get_all_users():
    response = await fetch_all_users()
    return response

@app.get("/api/financebrotool{email}", response_model=User)
async def get_user_by_email(email):
    response = await fetch_one_user_on_email(email)
    if response:
        return response
    raise HTTPException(404, f"there is no users item with this email {email}")

#Work on this
@app.post("/api/financebrotool", response_model=User)
async def post_user(user: UserInDB): 
    response = await create_user(user.model_dump())
    if response:
        return response 
    raise HTTPException(404, "Something went wrong")

@app.post("/api/financebrotool/createaccount", response_model=user_account)
async def post_user_account(user_acc: user_account):
    response = await create_user_account(user_acc.model_dump())
    if response:
        return response
    raise HTTPException(404, "Something went wrong")

@app.delete("/api/financebrotool{id}")
async def delete_user(id):
    response = await remove_user(id)
    if response:
        return "Successfully deleted user!"
    raise HTTPException(404, f"there is no user item with this id {id}")

@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    print(form_data)
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"email": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@app.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.email}]