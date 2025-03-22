from model import User
import motor.motor_asyncio
from dotenv import load_dotenv
#Turn this into environment variable
load_dotenv()
import os

# Connect to MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv('MONGO_DB'))

database = client.FinanceBroTool
user_collection = database.user

