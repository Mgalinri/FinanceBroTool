#APIs/Views will be in this page

#Python Imports
from datetime import timedelta
from typing import Annotated


#Fast API imports
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import (OAuth2PasswordRequestForm)
from fastapi.middleware.cors import CORSMiddleware



#Internal Imports
from model import (
    User, 
    get_user,
    get_current_active_user,
    Token,
    authenticate_user,
    create_access_token,
    UserInDB,
    user_account, 
    create_user,
    create_user_account,
    remove_user
    )


# App object
app = FastAPI()

# Handles the front-end communication with the backend
# The origin should the same as the front-end address
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:3000"],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*'],
)



# Token Settings
ACCESS_TOKEN_EXPIRE_MINUTES = 30

    

@app.post("/api/financebrotool", response_model=User)
async def register_user(user: UserInDB): 
    """To create a user account in the database

    Args:
        user (UserInDB): _description_
    """
     #Converts the user model to a dictionary
    existing_user = await get_user(user.email) #Check if the user already exists in the database, returns None if it does not
    if existing_user!=None:  
        print("User already exists")
        raise HTTPException(status_code=400, detail="User already exists with this email") #Returns an error if the user already exists
    else:
        response = await create_user(user.model_dump())
        if response:
            return response 
        raise HTTPException(status_code=404, detail="Something went wrong")
    
    

@app.get("/api/financebrotool{email}", response_model=User)
async def get_user_by_email(email):
    """Finds the user in mongo with help of the email

    Args
        email (_type_): _description_

    Raises
        HTTPException: 404 if the user is not found in the database

    Returns
        _type_: json object of the user
    """
    response = await get_user(email)
    if response:
        return response
    raise HTTPException(404, f"there is no users item with this email {email}")


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
    """
    Handles the login of the user and returns a JWT token

    Args:
        form_data (Annotated[OAuth2PasswordRequestForm, Depends): _description_

    Raises:
        HTTPException:401 if the user is not found in the database

    Returns:
        Token: _description_
    """
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


#Grayson added this endpoint to create a user account
#Check how it would be used
@app.post("/api/financebrotool/createaccount", response_model=user_account)
async def post_user_account(user_acc: user_account):
    response = await create_user_account(user_acc.model_dump())
    if response:
        return response
    raise HTTPException(404, "Something went wrong")



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