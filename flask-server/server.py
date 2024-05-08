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

app = Flask(__name__)
f = firebase()
storage, database = f.initialize()
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask'

mysql = MySQL(app)

d = FaceEmotionDetection()

prediction = []
similarity_score = 0
fer_score = 0
eye_score = 0
score = 300
user_email = ''

@app.route('/firstpage', methods=["POST"])
def firstpage():
    print("Hello, this is a debug message of firstpage!")
    data3 = request.get_json()
    # data = request.json
    print(data3)
    username = data3
    # data_dict = json.loads(data3)

    # username = data_dict['username']
    print(username)
    cursor = mysql.connection.cursor()
    query2 ='''SELECT * FROM history WHERE id in ( select id from customer WHERE username = %s)'''
    cursor.execute(query2, (username,))
    result2 = cursor.fetchall() 
    print(result2)
    return jsonify({'message': result2})

@app.route('/login', methods=["POST"])
def login():
    print("Hello, this is a debug message of login!")
    data2 = request.get_json()
    # data = request.json
    username = data2['username']
    password = data2['password']
    cursor = mysql.connection.cursor()
    # cursor.execute('''SELECT username, password FROM customer WHERE username = %s AND password = %s''', (username, password))
    query = '''SELECT username, password FROM Customer WHERE username = %s AND password = %s'''
    cursor.execute(query, (username, password))
    result = cursor.fetchone()  # Fetch the first row
       
    if result:
        print("done")
        
        # data = [
        #     {'message': 'success'},
        #     {'message': result2}
        # ]
        # return jsonify(data)
        return jsonify({'message': "success"})
        
    else:
        print("error")
        return jsonify({'message': 'Invalid username or password'}), 401
    
       

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
    cursor.execute(''' CREATE TABLE Customer (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(255), 
     email VARCHAR(255),
     password VARCHAR(255)  
               
     ); ''')
    cursor.execute(''' CREATE TABLE History (
      time VARCHAR(255), 
        id INT,
        eyeScore INT,
        faceScore INT,
        AnswerScore INT,
        score INT , 
        FOREIGN KEY (id) REFERENCES Customer(id)
     ); ''')

    # cursor.execute("INSERT INTO Customer (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
#     data2 = [
#     {'message': 'success'},
#     {'message': 'Message 2'}
# ]
    query = "INSERT INTO Customer (username, email, password) VALUES (%s, %s, %s)"
    cursor.execute(query, (username, email, password))
    mysql.connection.commit()
    cursor.close()
    # return jsonify(data2)
    

@app.route("/similarity", methods=['POST'])
def similarity():
    global similarity_score
    data = request.get_json()
    received_text = data.get('text', '')
    print(received_text[0])
    print(received_text[1])
    cosine_scores = sentSim(received_text[0], received_text[1])
    if cosine_scores < 0.6:
        similarity_score = similarity_score + 5
    print('similarity score: ', cosine_scores)
    print('sim score: ', similarity_score)
    return "completed"

@app.route("/fer", methods=['POST'])
def fer():
    global prediction
    global fer_score
    sad_score = 0
    fear_score = 0
    data = request.get_json()
    method = data.get('text', '')
    if method == 1:
        for i in d.predict():
            prediction = i
    else:
        print(prediction)
        sad_score =  prediction.count("Sad")
        fear_score = prediction.count("Fearful")
        fer_score = fer_score + (sad_score * 3 + fear_score * 3)
        print('fer score: ', fer_score)
    # return Response(d.predict())
    return "completed"

@app.route("/eye", methods=['POST'])
def eye():
    global eye_score
    data = request.get_json()
    method = data.get('text', '')
    if method == 1:
        eye_score += 3
        print('eye score: ', eye_score)
    # return Response(d.predict())
    return "completed"

@app.route("/score")
def interviewScore():
    global similarity_score
    global fer_score
    global eye_score
    global score
    global user_email
    
    score = score - (similarity_score + fer_score + eye_score)

    print('eye score: ', eye_score)
    print('fer score: ', fer_score)
    print('sim score: ', similarity_score)
    print('final score: ', score)
    # send to database
    cursor = mysql.connection.cursor()
    query = "SELECT id FROM Customer WHERE email = %s"
    cursor.execute(query, user_email)
    # Fetch all rows
    data = cursor.fetchall()
    # Close connection
    cursor.close()
    # Print the data to the console
    for row in data:
        id = int(row)
    time = str(datetime.now())
    cursor = mysql.connection.cursor()
    query = "INSERT INTO History (time, id, eyeScore, faceScore, AnswerScore, score) VALUES (%s, %d, %d, %d, %d, %d)"
    cursor.execute(query, (time, id, eye_score, fer_score, similarity_score, score))
    mysql.connection.commit()
    cursor.close()
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
