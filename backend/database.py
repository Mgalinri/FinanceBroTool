from bson import ObjectId
from model import user
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://devs:Devel0pers123@farmcluster.sfelu.mongodb.net/?retryWrites=true&w=majority&appName=FARMCluster')

database = client.FinanceBroTool
user_collection = database.user
user_account_collection = database.user_account

# Switch to logging user in, passing in email and pw
async def fetch_one_user_on_email(email):
    user_document = await user_collection.find_one({"email": email})
    return user_document

async def fetch_all_users():
    users = []
    cursor = user_collection.find({})
    async for document in cursor:
        users.append(user(**document))
    return users

async def create_user(user):
    document = user
    result = await user_collection.insert_one(document)
    return result

async def create_user_account(user_acc):
    document = user_acc
    document["user_id"] = ObjectId(document["user_id"])
    result = await user_account_collection.insert_one(document)
    return result

# async def update_user():

async def remove_user(id):
    await user_collection.delete_one({"_id":ObjectId(id)})
    return True
