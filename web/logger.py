from pymongo import MongoClient, DESCENDING
from datetime import datetime

MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "XSS"
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
class LogManager:
    def __init__(self, uri=MONGO_URI, db_name=DB_NAME, log_collection_name="log", dataset_collection_name="dataset"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.log_collection = self.db[log_collection_name]
        self.dataset_collection = self.db[dataset_collection_name]
        self.log_collection.create_index([("TimeDate", DESCENDING)])

    def insert_log(self, source_ip, destination_ip, url, method, status, user_input, note):
        log_entry = {
            "Source IP": source_ip,
            "Destination IP": destination_ip,
            "URL": url,
            "Method": method,
            "Status": status,
            "User Input": user_input,
            "Note": note,
            "TimeDate": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        result = self.log_collection.insert_one(log_entry)
        return result.inserted_id

    def get_latest_logs(self, limit=100):
        cursor = self.log_collection.find().sort("TimeDate", DESCENDING).limit(limit)
        logs = list(cursor)
        
        for i, log in enumerate(logs, start=1):
            log['Index'] = i
        
        return logs
    
    def count_xss_types(self):
        normal_count = self.log_collection.count_documents({"Note": "No XSS detected"})
        reflected_xss_count = self.log_collection.count_documents({"Note": "Reflected XSS"})
        stored_xss_count = self.log_collection.count_documents({"Note": "Stored XSS"})

        return {
            "Normal": normal_count,
            "Reflected XSS": reflected_xss_count,
            "Stored XSS": stored_xss_count
        }

    def count_label_dataset(self):
        dataset_collection = self.db["dataset"]
        normal_count = dataset_collection.count_documents({"Label": 0})
        reflected_xss_count = dataset_collection.count_documents({"Label": 1})

        return {
            "Normal": normal_count,
            "XSS": reflected_xss_count
        }


    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close_connection()
        
    def close_connection(self):
        self.client.close()

log_manager = LogManager()
