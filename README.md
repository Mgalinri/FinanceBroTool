# Finance Bro Tool

A tool made using the **FARM** stack for those who are looking to organize their finances.

## Table of Content
1. Installation Guide
2. Usage Guideline
3. License

## Installation Guide
### Backend
Run the following commands to install the project in your system.
If you have windows switch the python for py.
```
cd backend
python -m pip install Django
pip install -r requirements.txt
```
Check the credentials on the settings.py to connect the MongoDb database.
Then run
```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
### Frontend
Start from the root folder of the repository
```
cd finance_bro_tool
npm install
npm start
```
## Usage Guideline

## License
This project is licensed under the terms of the MIT license.