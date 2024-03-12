from flask import Flask, request, jsonify, Response;
from sentencesimilarity import  *
from sentence_transformers import SentenceTransformer, util
from FaceEmotionDetection import FaceEmotionDetection
from firebase import firebase
import os
from flask_mysqldb import MySQL
from gtts import gTTS
import uuid
import pyttsx3
from time import sleep

app = Flask(__name__)
f = firebase()
storage, database = f.initialize()
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask'
score = 250

mysql = MySQL(app)
@app.route('/signup', methods=["POST"])
def signup():
    print("Hello, this is a debug message!")
    data = request.get_json()
    # data = request.json
    username = data['username']
    email = data['email']
    password = data['password']

    cursor = mysql.connection.cursor()
    cursor.execute(''' CREATE TABLE Customer (
    username VARCHAR(255), 
    email VARCHAR(255),
    password VARCHAR(255)             
    ); ''')
    cursor.execute(''' CREATE TABLE History (
      time VARCHAR(255), 
        type VARCHAR(255),
        score INT               -- Example data type for age
    ); ''')

    cursor.execute("INSERT INTO Customer (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'User signed up successfully'})

@app.route("/similarity", methods=['POST'])
def similarity():
    global score
    data = request.get_json()
    received_text = data.get('text', '')
    print(received_text[0])
    print(received_text[1])
    cosine_scores = sentSim(received_text[0], received_text[1])
    if cosine_scores < 0.6:
        score = score - 5
    print('similarity score: ',cosine_scores)
    print('total score: ',score)
    return "completed"

@app.route("/fer", methods=['POST'])
def fer():
    data = request.get_json()
    method = data.get('text', '')
    prediction = []
    if method == 1:
        d = FaceEmotionDetection()
        prediction = Response(d.predict())
    else:
        print(prediction)
    # return Response(d.predict())
    return "completed"

@app.route('/uploadText', methods=['POST'])
def upload_audio():
    data = request.get_json()
    received_text = data.get('text', '')
    fileName = received_text[len(received_text) - 1]
    received_text.pop()
    print(received_text[0])
    print(fileName)
    index = 0
    # for question in received_text:
    # tts = gTTS(received_text[0], tld="us")
    # audio_path = 'Avatar/audio.wav'
    # tts.save(audio_path)
    engine = pyttsx3.init()
    rate = engine.getProperty('rate')
    engine.setProperty('rate', rate+30)
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[10].id)
    # for voice in voices:
    #     if voice.languages[0] == 'en-US' and 'male' in voice.name.lower():
    #         engine.setProperty('voice', voice.id)
    #         break
    engine.save_to_file(received_text[0], "Avatar/audio.wav")
    engine.say(received_text[0])
    engine.runAndWait()
    # while "audio.wav" not in os.listdir("Avatar"):
    #     sleep(1)

        # audio_name = "audio"+str(uuid.uuid4())+".wav"
        # audio_data = {
        #     "id": index,
        #     "filename": audio_name
        # }
        # storage.child(fileName+"audios/"+audio_name).put("Avatar/audio.wav")
        # database.child(fileName+"audios").child(str(index)).set(audio_data)
        
        # command = "python3 Avatar/Wav2Lip/inference.py --checkpoint_path Avatar/Wav2Lip/checkpoints/wav2lip_gan.pth --face Avatar/talking.mp4 --audio Avatar/audio.wav"
        # try:
        #     os.system(command)
        #     video_name = "video"+str(uuid.uuid4())+".mp4"
        #     video_data = {
        #         "id": index,
        #         "filename": video_name  # Extract filename if needed
        #     }
        #     storage.child(fileName+"videos/"+video_name).put("./Avatar/result_video.mp4")
        #     database.child(fileName+"videos").child(str(index)).set(video_data)
        #     print("completed "+ str(index))
        # except Exception as e:
        #     print("not completed: "+ e)

        # index+=1
    return "completed"

@app.route("/")
def home():
    return "hello"

if __name__ == "__main__":
    app.run(debug=True)