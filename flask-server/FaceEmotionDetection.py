import cv2
import numpy as np
from keras.models import model_from_json

class FaceEmotionDetection():
    def __init__(self):
        self.emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}

        # load json and create model
        json_file = open('Fer/model/model.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        self.emotion_model = model_from_json(loaded_model_json)

        # load weights into new model
        self.emotion_model.load_weights("Fer/model/model_weights.h5")

    def predict(self, run):
        # start the webcam feed
        camera = cv2.VideoCapture(0)

        prediction = []
        while run:
            # Find haar cascade to draw bounding box around face
            ret, frame = camera.read()
            if not ret:
                break
            face_detector = cv2.CascadeClassifier('Fer/haarcascade_frontalface_default.xml')
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            # detect faces available on camera
            num_faces = face_detector.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)

            # take each face available on the camera and Preprocess it
            for (x, y, w, h) in num_faces:
                # cv2.rectangle(frame, (x, y-50), (x+w, y+h+10), (0, 255, 0), 4)
                roi_gray_frame = gray_frame[y:y + h, x:x + w]
                cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray_frame, (48, 48)), -1), 0)
                
                # predict the emotions
                emotion_prediction = self.emotion_model.predict(cropped_img)
                maxindex = int(np.argmax(emotion_prediction))
                # cv2.putText(frame, self.emotion_dict[maxindex], (x+5, y-20), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
                detection = self.emotion_dict[maxindex]
                # yield f"data:{detection}\n\n"

                if not prediction:
                    prediction.append(detection)
                else:
                    if prediction[len(prediction) - 1] != detection:
                        prediction.append(detection)
                yield f"data:{prediction}\n\n"
            # cv2.imshow('Emotion Detection', frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
            if not run:
                break
            
        camera.release()
        cv2.destroyAllWindows()
        if not run:
            camera.release()
            cv2.destroyAllWindows()


# d = FaceEmotionDetection()
# d.predict()