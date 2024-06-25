from flask import Flask, request, jsonify, Response;
from sentencesimilarity import  *
from sentence_transformers import SentenceTransformer, util
from FaceEmotionDetection import FaceEmotionDetection
from firebase import firebase
import os
import json
from flask_mysqldb import MySQL
from gtts import gTTS
import uuid
import pyttsx3
from time import sleep
import cv2
from datetime import datetime
import numpy as np
from PIL import Image

app = Flask(__name__)
f = firebase()
storage, database = f.initialize()
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'phpmyadmin'
app.config['MYSQL_PASSWORD'] = 'maryam2000'
app.config['MYSQL_DB'] = 'flask'

mysql = MySQL(app)

d = FaceEmotionDetection()

prediction = []
eye_prediction = []
similarity_score = 100
fer_score = 100
eye_score = 100
score = 300
user_email = ''

@app.route('/firstpage', methods=["POST"])
def firstpage():
    print("Hello, this is a debug message of firstpage!")
    data3 = request.get_json()
    print(data3)
    email = data3
    global user_email
    print("Email: ", user_email)
    print(email)
    cursor = mysql.connection.cursor()
    query2 ='''SELECT * FROM History WHERE customer_id in ( SELECT id FROM Customer WHERE email = %s)'''
    cursor.execute(query2, (user_email,))
    result2 = cursor.fetchall() 
    print(result2)
    return jsonify({'message': result2})

@app.route('/login', methods=["POST"])
def login():
    global user_email
    print("Hello, this is a debug message of login!")
    data2 = request.get_json()
    email = data2['email']
    password = data2['password']
    user_email = email
    print("Email: ", user_email)
    cursor = mysql.connection.cursor()
    query = '''SELECT email, password FROM Customer WHERE email = %s AND password = %s'''
    cursor.execute(query, (email, password))
    result = cursor.fetchone()  # Fetch the first row
    print(result)
    if result:
        print("done")
        return jsonify({'message': "success"})
        
    else:
        print("error")
        return jsonify({'message': 'Invalid email or password'}), 401
    
@app.route('/signout', methods=["POST"])
def signout(): 
    global similarity_score
    global fer_score
    global eye_score
    global score
    global user_email
    print("done")
    similarity_score = 100
    fer_score = 100
    eye_score = 100
    score = 300
    user_email = ''
    return "signout"

@app.route('/signup', methods=["POST"])
def signup():
    global user_email
    print("Hello, this is a debug message!")
    data = request.get_json()
    # data = request.json
    username = data['username']
    email = data['email']
    password = data['password']

    user_email = email

    cursor = mysql.connection.cursor()
    # cursor.execute(''' CREATE TABLE Customer (
    #  id INT AUTO_INCREMENT PRIMARY KEY,
    #  username VARCHAR(255), 
    #  email VARCHAR(255),
    #  password VARCHAR(255)  
               
    #  ); ''')
    # cursor.execute('''  CREATE TABLE History (
    #     id INT AUTO_INCREMENT PRIMARY KEY,
    #     time VARCHAR(255), 
    #     customer_id INT,
    #     eyeScore INT,
    #     faceScore INT,
    #     AnswerScore INT,
    #     score INT , 
    #     FOREIGN KEY (customer_id) REFERENCES Customer(id)
    #  ); ''')

    query = "INSERT INTO Customer (username, email, password) VALUES (%s, %s, %s)"
    cursor.execute(query, (username, email, password))
    mysql.connection.commit()
    cursor.close()
    # return jsonify(data2)
    return "done"
    

@app.route("/similarity", methods=['POST'])
def similarity():
    global similarity_score
    data = request.get_json()
    received_text = data.get('text', '')
    print(received_text[0])
    print(received_text[1])
    cosine_scores = sentSim(received_text[0], received_text[1])
    if cosine_scores < 0.6:
        similarity_score = similarity_score - 5
        if similarity_score < 0:
            similarity_score = 0
    print('similarity score: ', cosine_scores)
    print('sim score: ', similarity_score)
    return "completed"

@app.route("/fer", methods=['POST'])
def fer():
    global prediction
    global fer_score
    global eye_score
    global eye_prediction
    sad_score = 0
    fear_score = 0
    data = request.get_json()
    method = data.get('text', '')
    if method == 1:
        for data1, data2 in d.predict(method):
            prediction = data1
            eye_prediction = data2
    elif method == 0:
        d.predict(method)
        print(prediction)
        print(eye_prediction)
        sad_score =  prediction.count("Sad")
        fear_score = prediction.count("Fearful")
        fer_score = fer_score - (sad_score * 3 + fear_score * 3)
        if fer_score < 0:
            fer_score = 0
        print('fer score: ', fer_score)

        right_score =  eye_prediction.count("right")
        left_score = eye_prediction.count("left")
        eye_score = eye_score - (right_score * 3 + left_score * 3)
        if eye_score < 0:
            eye_score = 0
        print('eye score: ', eye_score)
    else:
        return "completed"
    # return Response(d.predict())
    return "completed"

@app.route("/score")
def interviewScore():
    global similarity_score
    global fer_score
    global eye_score
    global score
    global user_email
    print("user Email: ",user_email)
    
    score = similarity_score + fer_score + eye_score

    print('eye score: ', eye_score)
    print('fer score: ', fer_score)
    print('sim score: ', similarity_score)
    print('final score: ', score)
    # send to database
    cursor = mysql.connection.cursor()
    query = "SELECT * FROM Customer WHERE email = %s"
    cursor.execute(query, (user_email,))
    # Fetch all rows
    data = cursor.fetchall()
    print("Data: ",data[0][0])
    id = int(data[0][0])
    # Close connection
    cursor.close()
    time = str(datetime.now())
    cursor2 = mysql.connection.cursor()
    query2 = "INSERT INTO History (time, customer_id, eyeScore, faceScore, AnswerScore, score) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor2.execute(query2, (time, id, eye_score, fer_score, similarity_score, score))
    mysql.connection.commit()
    cursor2.close()

    similarity_score = 100
    fer_score = 100
    eye_score = 100
    score = 300
    return "completed"

@app.route("/end")
def interviewScore():
    global similarity_score
    global fer_score
    global eye_score
    global score

    similarity_score = 100
    fer_score = 100
    eye_score = 100
    score = 300
    return "completed"

@app.route('/uploadText', methods=['POST'])
def upload_audio():
    data = request.get_json()
    received_text = data.get('text', '')
    fileName = received_text[len(received_text) - 1]
    # fileName = fileName[:-4]
    received_text.pop()
    print(received_text[0])
    print(fileName)

    index = 0
    for question in received_text:
        # tts = gTTS(received_text[0], tld="us")
        # audio_path = 'Avatar/audio.wav'
        # tts.save(audio_path)
        engine = pyttsx3.init()
        rate = engine.getProperty('rate')
        engine.setProperty('rate', rate-10)
        voices = engine.getProperty('voices')
        # engine.setProperty('voice', voices[10].id)
        engine.setProperty('voice', 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-US_DAVID_11.0')
        # for voice in voices:
        #     if voice.languages == 'en-us' and voice.gender =='male' in voice.name.lower():
        #         engine.setProperty('voice', voice.id)
        #         break
        engine.save_to_file(question, "Avatar/audio.wav")
        engine.runAndWait()
        
    # while "audio.wav" not in os.listdir("Avatar"):
    #     sleep(1)

        audio_name = "audio"+str(uuid.uuid4())+".wav"
        audio_data = {
            "id": index,
            "filename": audio_name
        }
        storage.child(fileName+"/audios/"+audio_name).put("Avatar/audio.wav")
        database.child(fileName+"/audios/"+str(index)).set(audio_data)
        
        command = "python3 Avatar/Wav2Lip/inference.py --checkpoint_path Avatar/Wav2Lip/checkpoints/wav2lip_gan.pth --face Avatar/animation.mp4 --audio Avatar/audio.wav"
        try:
            os.system(command)
            video_name = "video"+str(uuid.uuid4())+".mp4"
            video = cv2.VideoCapture('Avatar/audio.wav')
            duration = video.get(cv2.CAP_PROP_POS_MSEC)
            video_data = {
                "duration": duration,
                "id": index,
                "filename": video_name  # Extract filename if needed
            }
            storage.child(fileName+"/videos/"+video_name).put("./Avatar/result_video.mp4")
            database.child(fileName+"/videos/"+str(index)).set(video_data)
            print("completed "+ str(index))
        except Exception as e:
            print("not completed: "+ e)

        index+=1
    return "completed"

@app.route("/")
def home():
    return "hello"


if __name__ == "__main__":
    app.run(debug=True)
