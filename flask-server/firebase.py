import pyrebase

class firebase():
    def __init__(self):
        self.config = {
        "apiKey": "AIzaSyDoQyQmb3KxiZRzVtKEMdAlwO2mw5ihEIo",
        "authDomain": "apia-72347.firebaseapp.com",
        "projectId": "apia-72347",
        "storageBucket": "apia-72347.appspot.com",
        "messagingSenderId": "677798393276",
        "appId": "1:677798393276:web:e62b64e695a9764f6e27b9",
        "serviceAccount": "serviceAccount.json",
        "databaseURL": "https://apia-72347-default-rtdb.firebaseio.com/"
        }
        # firebase = pyrebase.initialize_app(self.config)
        # storage = firebase.storage()
        # database = firebase.database()

        # return storage, database

    def initialize(self):
        firebase = pyrebase.initialize_app(self.config)
        storage = firebase.storage()
        database = firebase.database()
        return storage, database