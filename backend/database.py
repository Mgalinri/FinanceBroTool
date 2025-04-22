#Connects to mongodb database
from dotenv import load_dotenv

#Turn this into environment variable
load_dotenv()
import os

# Connect to MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('MONGO_URI'))

database = client.FinanceBroTool
user_collection = database.user
user_account_collection = database.user_account

