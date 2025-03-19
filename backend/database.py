from model import user
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://devs:Devel0pers123@farmcluster.sfelu.mongodb.net/?retryWrites=true&w=majority&appName=FARMCluster')

database = client.FinanceBroTool
user_collection = database.user

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

# async def update_user():

# need to change to id later, mongo ObjectId is weird
async def remove_user(id):
    await user_collection.delete_one({"email":id})
    return True
