from flask import Flask, request, jsonify;
from sentencesimilarity import  *
from sentence_transformers import SentenceTransformer, util
from firebase import firebase
import os
from gtts import gTTS

app = Flask(__name__)
f = firebase()
storage, database = f.initialize()

@app.route("/members")
def members():
    cosine_scores = sentSim(1)
    return {"members":[float(cosine_scores[0][0]),float(cosine_scores[1][1]),float(cosine_scores[2][2])]}

@app.route('/uploadText', methods=['POST'])
def upload_audio():
    data = request.get_json()
    received_text = data.get('text', '')
    print(received_text)
    # received_text = jsonify({"result": "success!", "text": text})
    # data = request.get_json()
    # received_text = data.get('text', '')
    tts = gTTS(received_text)
    audio_path = 'Avatar/audio.wav'
    tts.save(audio_path)

    audio_id = 1
    audio_data = {
        "id": audio_id,
        "filename": "audio.wav"  # Extract filename if needed
    }
    storage.child("audios/audio.wav").put("Avatar/audio.wav")
    database.child("audios").child(str(audio_id)).set(audio_data)
    
    command = "python3 Avatar/Wav2Lip/inference.py --checkpoint_path Avatar/Wav2Lip/checkpoints/wav2lip_gan.pth --face Avatar/talking.mp4 --audio Avatar/audio.wav"
    try:
        os.system(command)
        video_id = 1
        video_data = {
            "id": video_id,
            "filename": "video.mp4"  # Extract filename if needed
        }
        
        storage.child("videos/video.mp4").put("../client/src/pages/Interview/result_video.mp4")
        database.child("videos").child(str(video_id)).set(video_data)
    except Exception as e:
        return "not completed"
    return "completed"

    # return jsonify({'audioPath': audio_path})

# @app.route("/avatar")
# def runAvatar():
#     audio_file = upload_audio()
#     command = "python3 Avatar/Wav2Lip/inference.py --checkpoint_path Avatar/Wav2Lip/checkpoints/wav2lip_gan.pth --face Avatar/talking.mp4 --audio {audio_file}"
#     try:
#         os.system(command)
#     except Exception as e:
#         return "not completed"
#     return "completed"

@app.route("/")
def home():
    return "hello"


if __name__ == "__main__":
    app.run(debug=True)