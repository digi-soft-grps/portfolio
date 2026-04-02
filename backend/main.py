from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = pickle.load(open("model/model.pkl", "rb"))

@app.get("/")
def home():
    return {"message": "Heart Risk API running ✅"}

@app.post("/predict")
def predict(data: dict):
    try:
        features = [
            data["age"],
            data["sex"],
            data["cp"],
            data["trestbps"],
            data["chol"],
            data["fbs"],
            data["restecg"],
            data["thalach"],
            data["exang"],
            data["oldpeak"],
            data["slope"],
            data["ca"],
            data["thal"]
        ]

        input_data = np.array(features).reshape(1, -1)
        
        prediction = model.predict(input_data)[0]
        
        # Get probability if model supports it
        probability = 0.0
        if hasattr(model, "predict_proba"):
            # Probabilities for [Class 0, Class 1]
            probs = model.predict_proba(input_data)[0]
            probability = float(probs[1]) # Probability of class 1 (High Risk)

        return {
            "prediction": int(prediction),
            "probability": probability,
            "message": "High Risk ⚠️" if prediction == 1 else "Low Risk ✅"
        }

    except Exception as e:
        return {"error": str(e)}