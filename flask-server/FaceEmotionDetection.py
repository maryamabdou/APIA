import cv2
import numpy as np
from keras.models import model_from_json
import cv2
import dlib

class FaceEmotionDetection():
    def __init__(self):
        self.emotion_dict = {0: "Angry", 1: "Disgust", 2: "Fear", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprise"}

        # load json and create model
        json_file = open('Fer/model/model.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        self.emotion_model = model_from_json(loaded_model_json)

        # load weights into new model
        self.emotion_model.load_weights("Fer/model/model_weights.h5")
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor("Fer/model/shape_predictor_68_face_landmarks.dat")
        # self.camera = cv2.VideoCapture(0)

    def get_gaze_ratio(self, eye_points, landmarks, frame, gray):
        eye_region = np.array([(landmarks.part(eye_points[0]).x, landmarks.part(eye_points[0]).y),
                                (landmarks.part(eye_points[1]).x, landmarks.part(eye_points[1]).y),
                                (landmarks.part(eye_points[2]).x, landmarks.part(eye_points[2]).y),
                                (landmarks.part(eye_points[3]).x, landmarks.part(eye_points[3]).y),
                                (landmarks.part(eye_points[4]).x, landmarks.part(eye_points[4]).y),
                                (landmarks.part(eye_points[5]).x, landmarks.part(eye_points[5]).y)], np.int32)
        height, width, _ = frame.shape
        mask = np.zeros((height, width), np.uint8)
        cv2.polylines(mask, [eye_region], True, 255, 2)
        cv2.fillPoly(mask, [eye_region], 255)
        eye = cv2.bitwise_and(gray, gray, mask=mask)

        min_x = np.min(eye_region[:, 0])
        max_x = np.max(eye_region[:, 0])
        min_y = np.min(eye_region[:, 1])
        max_y = np.max(eye_region[:, 1])

        gray_eye = eye[min_y: max_y, min_x: max_x]
        _, threshold_eye = cv2.threshold(gray_eye, 70, 255, cv2.THRESH_BINARY)

        height, width = threshold_eye.shape
        left_side_threshold = threshold_eye[0: height, 0: int(width / 2)]
        left_side_white = cv2.countNonZero(left_side_threshold)
        right_side_threshold = threshold_eye[0: height, int(width / 2): width]
        right_side_white = cv2.countNonZero(right_side_threshold)

        if left_side_white == 0:
            gaze_ratio = 1
        elif right_side_white == 0:
            gaze_ratio = 5
        else:
            gaze_ratio = left_side_white / right_side_white

        return gaze_ratio

    def predict(self, method):
        # start the webcam feed
        camera = cv2.VideoCapture(0)

        prediction = []
        eye_detecion = ''
        eye = []
        while method == 1:
            # Find haar cascade to draw bounding box around face
            ret, frame = camera.read()
            if not ret:
                break
            face_detector = cv2.CascadeClassifier('Fer/haarcascade_frontalface_default.xml')
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            # detect faces available on camera
            num_faces = face_detector.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)

            faces = self.detector(gray_frame)

            # take each face available on the camera and Preprocess it
            for (x, y, w, h) in num_faces:
                # cv2.rectangle(frame, (x, y-50), (x+w, y+h+10), (0, 255, 0), 4)
                roi_gray_frame = gray_frame[y:y + h, x:x + w]
                # roi_gray_frame = frame[y:y + h, x:x + w]
                cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray_frame, (48, 48)), -1), 0)
                # cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray_frame, (224, 224)), -1), 0)

                # predict the emotions
                emotion_prediction = self.emotion_model.predict(cropped_img)
                maxindex = int(np.argmax(emotion_prediction))
                # print(maxindex)
                cv2.putText(frame, self.emotion_dict[maxindex], (x+5, y-20), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
                detection = self.emotion_dict[maxindex]

                if not prediction:
                    prediction.append(detection)
                else:
                    if prediction[len(prediction) - 1] != detection:
                        prediction.append(detection)


                # eye tracking
                for face in faces:
                    landmarks = self.predictor(gray_frame, face)
                    
                    gaze_ratio_left_eye = self.get_gaze_ratio([36, 37, 38, 39, 40, 41], landmarks, frame, gray_frame)
                    gaze_ratio_right_eye = self.get_gaze_ratio([42, 43, 44, 45, 46, 47], landmarks, frame, gray_frame)
                    gaze_ratio = (gaze_ratio_right_eye + gaze_ratio_left_eye) / 2
         
                    if gaze_ratio <= 0.5:
                        cv2.putText(frame, "RIGHT", (50, 100), 5, 2, (0, 0, 255), 3)
                        eye_detecion = "right"
                        # new_frame[:] = (0, 0, 255)
                    elif 0.5 < gaze_ratio <= 8:
                        cv2.putText(frame, "CENTER", (50, 100), 5, 2, (0, 0, 255), 3)
                        eye_detecion = "center"
                    else:
                        # new_frame[:] = (255, 0, 0)
                        cv2.putText(frame, "LEFT", (50, 100), 5, 2, (0, 0, 255), 3)
                        eye_detecion = "left"

                    if not eye:
                        eye.append(eye_detecion)
                    else:
                        if eye[len(eye) - 1] != eye_detecion:
                            eye.append(eye_detecion)

                # send them
                yield f"data1:{prediction}\n\n", f"data2:{eye}\n\n"

                # yield f"data2:{eye}\n\n"
            # cv2.imshow('Emotion Detection', frame)

            # Define the desired size for the frame
            new_width = 350
            new_height = 250

            # Resize the frame
            resized_frame = cv2.resize(frame, (new_width, new_height))

            # Create a blank image (black image)
            canvas = np.zeros((new_height, new_width, 3), dtype=np.uint8)

            # Define the top-left corner where the resized frame will be placed
            top_left_x = 0
            top_left_y = 0

            # Ensure the resized frame fits within the canvas dimensions
            if top_left_x + new_width <= new_width and top_left_y + new_height <= new_height:
                # Place the resized frame on the canvas
                canvas[top_left_y:top_left_y+new_height, top_left_x:top_left_x+new_width] = resized_frame
            else:
                print("Error: The resized frame does not fit within the canvas dimensions")

            # Display the resulting image
            cv2.imshow('Result', canvas)
            cv2.moveWindow('Result', 0, 0)
            # cv2.imshow("Frame", frame)

            if cv2.waitKey(1) & method == 0:
                break
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
            
        camera.release()
        cv2.destroyAllWindows()

# d = FaceEmotionDetection()
# d.predict(1)
# d.eyeTracking()