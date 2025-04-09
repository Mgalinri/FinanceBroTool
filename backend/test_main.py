# internal imports
from main import app
from model import user_collection

#fastapi imports
from fastapi.testclient import TestClient
import pytest


#To use the test client you need to pass the app

#A fake db can be created for testing purposes
client = TestClient(app)

#Test for create user endpoint
#You might have to run these test sequentailly
#ex. pytest test_main.py::test_incorrect_register_user
#Delete the user added manually
def test_register_user():
    response =  client.post(
        "/api/financebrotool",
        json={
            "email": "hey@gmail.com",
            "first_name": "string",
            "last_name": "string",
            "disabled": True,
            "password": "string"
        })
    assert response.status_code == 200



def test_incorrect_register_user():
    response =  client.post(
        "/api/financebrotool",
        json={
        "email": "string",
        "first_name": "string",
        "last_name": "string",
        "disabled": True,
        "password": "string"

        })
    print(response.status_code)
    assert response.status_code == 400
    assert response.json() == {"detail": "User already exists with this email"}
