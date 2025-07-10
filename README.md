# Finance Bro Tool

A tool made using the **FARM** stack for those who are looking to organize their finances.

## Table of Content
1. Requirements
2. Installation Guide
3. Features
4. Docs and Links
5. License

## Requirements
- MongoDB
- Node.js (For NPM and React) 
- Python

## Installation Guide
### Backend
Make sure you got a Virtual environment running. If you don´t run the
following command.
```
cd backend
pip install pipenv
pipenv shell
```
Run the following commands to install the project in your system.
If you have windows switch the python for py.
```
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
Start from the root folder of the repository
```
cd finance_bro_tool
npm install
npm start
```

To obtain a SECRET_KEY for hashing and save it in a env file.
For hashing
```
openssl rand -hex 32
```
Also add:

ALGORITHM = HS256

## Features
- A figma designed UI implemented with TailwindCSS on React.js
- Authentication and Authorization using JWT tokens
- A backend that fetches asynchronously from MongoDB using motor
- A system designed for the user to log in their expenses
- A dashboard that displays expense analysis


![ezgif-60a389bf074655](https://github.com/user-attachments/assets/d2f9fab6-15f6-474a-99d7-26e59c080f4d)

## Docs and Links
[FastAPI Security Tutorial](https://fastapi.tiangolo.com/tutorial/security/get-current-user/#create-a-user-model)



 

## License
This project is licensed under the terms of the MIT license.

## Collaborators
Grayson Crawford
