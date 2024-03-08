from flask import Flask, request, jsonify;
from sentencesimilarity import  *
from sentence_transformers import SentenceTransformer, util
from firebase import firebase
import os
from gtts import gTTS
import uuid
import pyttsx3

app = Flask(__name__)
f = firebase()
storage, database = f.initialize()

@app.route("/similarity", methods=['POST'])
def members():
    data = request.get_json()
    received_text = data.get('text', '')
    print(received_text[0])
    print(received_text[1])
    # cosine_scores = sentSim(1)
    # return {"members":[float(cosine_scores[0][0]),float(cosine_scores[1][1]),float(cosine_scores[2][2])]}
    return "hello"

@app.route('/uploadText', methods=['POST'])
def upload_audio():
    data = request.get_json()
    received_text = data.get('text', '')
    fileName = received_text[len(received_text) - 1]
    received_text.pop()
    print(received_text[0])
    print(fileName)
    index = 0
    for question in received_text:
        # tts = gTTS(question, lang='en-us')
        # audio_path = 'Avatar/audio.wav'
        # tts.save(audio_path)
        engine = pyttsx3.init()
        rate = engine.getProperty('rate')
        engine.setProperty('rate', rate-10)
        voices = engine.getProperty('voices')
        engine.setProperty('voice', voices[10].id)
        engine.save_to_file(question, "Avatar/audio.wav")
        engine.runAndWait()

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