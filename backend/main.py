#APIs/Views will be in this page

#Python Imports
from datetime import timedelta
from typing import Annotated, Dict, List

#Fast API imports
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import (OAuth2PasswordRequestForm)
from fastapi.middleware.cors import CORSMiddleware

#Internal Imports
from model import (
    User,
    get_income,
    get_percentages, 
    get_user,
    get_current_active_user,
    Token,
    authenticate_user,
    create_access_token,
    UserInDB,
    create_user,
    remove_user,
    set_user_income,
    set_user_percentages,
    UserExpensesInDB,
    set_user_expense,
    get_expenses
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

# Register User

@app.post("/api/financebrotool/createaccount", response_model=User)
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
    
@app.post("/api/financebrotool/setincome")
async def set_income(payload: dict): 
    email = payload.get("email")
    print(email)
    income = payload.get("income")
    print(income)

    if not email or income is None:
        raise HTTPException(status_code=400, detail="Email and income are required")

    user = await get_user(email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    response = await set_user_income(email, income)
    if response:
        return response 
    raise HTTPException(status_code=404, detail="Something went wrong")

@app.post("/api/financebrotool/setpercentages")
async def set_percentages(payload: dict): 
    email = payload.get("email")
    print(email)
    percentages = payload.get("percentages")
    print(percentages)

    if not email or percentages is None:
        raise HTTPException(status_code=400, detail="Email and percentages are required")

    user = await get_user(email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    response = await set_user_percentages(email, percentages)
    if response:
        return response 
    raise HTTPException(status_code=404, detail="Something went wrong")

@app.get("/api/financebrotool/getpercentagesbyemail/{email}", response_model=Dict[str, int])
async def get_percentages_by_email(email: str):
    response = await get_percentages(email)  # Make sure this returns only the percentages as a dict
    if response:
        return response
    raise HTTPException(404, detail=f"There are no percentages for the email {email}")

@app.get("/api/financebrotool/getincomebyemail/{email}", response_model=int)
async def get_income_by_email(email: str):
    response = await get_income(email)  # Make sure this returns only the percentages as a dict
    if response:
        return response
    raise HTTPException(404, detail=f"There is no income for the email {email}")

# Expenses

@app.post("/api/financebrotool/addexpense", response_model=UserExpensesInDB)
async def add_expense(user_expense: UserExpensesInDB): 

    # if not email or percentages is None:
    #     raise HTTPException(status_code=400, detail="Email and percentages are required")

    # user = await get_user(userid)
    # if user is None:
    #     raise HTTPException(status_code=404, detail="User not found")

    response = await set_user_expense(user_expense.model_dump())
    if response:
        return response 
    raise HTTPException(status_code=404, detail="Something went wrong")

@app.get("/api/financebrotool/getexpensesbyemail/{email}",  response_model=List[UserExpensesInDB])
async def get_expenses_by_email(email):
    response = await get_expenses(email)
    if response:
        return response
    raise HTTPException(404, f"there are no expenses with this email {email}")

# Authenticate User

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

# Extras

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

@app.delete("/api/financebrotool{id}")
async def delete_user(id):
    response = await remove_user(id)
    if response:
        return "Successfully deleted user!"
    raise HTTPException(404, f"there is no user item with this id {id}")