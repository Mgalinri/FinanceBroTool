from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson.objectid import ObjectId

# App object
app = FastAPI()

from model import (
    user, 
    user_account, 
    user_espenses, 
    category, 
    budgeting_percentages
    )

from database import (
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

@app.get("/")
def read_root():
    return {"Ping":"pong"}

@app.get("/api/financebrotool")
async def get_all_users():
    response = await fetch_all_users()
    return response

@app.get("/api/financebrotool{email}", response_model=user)
async def get_user_by_email(email):
    response = await fetch_one_user_on_email(email)
    if response:
        return response
    raise HTTPException(404, f"there is no users item with this email {email}")

@app.post("/api/financebrotool/createuser", response_model=user)
async def post_user(user: user):
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