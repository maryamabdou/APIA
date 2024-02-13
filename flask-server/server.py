from flask import Flask;
from sentencesimilarity import  *
from sentence_transformers import SentenceTransformer, util
mode = '1'
app = Flask(__name__)
if mode == '1':
    cosine_scores = sentSim(1)
    @app.route("/members")
    def members():
        return {"members":[float(cosine_scores[0][0]),float(cosine_scores[1][1]),float(cosine_scores[2][2])]}
@app.route("/")
def home():
    return "hello"


if __name__ == "__main__":
    app.run(debug=True)