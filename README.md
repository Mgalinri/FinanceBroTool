# Finance Bro Tool

A tool made using the **FARM** stack for those who are looking to organize their finances.

## Table of Content
1. Requirements
2. Installation Guide
3. Usage Guideline
4. Docs and Links
5. License

## Requirements
- MongoDB
- Node.js (For NPM)
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

### Database Setup
On MongoDB Atlas add this connection
 mongodb+srv://devs:Devel0pers123@farmcluster.sfelu.mongodb.net/?retryWrites=true&w=majority&appName=FARMCluster

## Usage Guideline
To obtain a SECRET_KEY for hashing and save it in a env file.
For hashing
```
openssl rand -hex 32
```
Also add:

ALGORITHM = HS256

## Docs and Links
https://fastapi.tiangolo.com/tutorial/security/get-current-user/#create-a-user-model
## License
This project is licensed under the terms of the MIT license.