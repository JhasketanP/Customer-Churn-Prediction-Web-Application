from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)

# Load model, scaler, and column structure
model = joblib.load("E:\\churn_proj\\churn_model.pkl")
scaler = joblib.load("E:\\churn_proj\\scaler.pkl")
columns = joblib.load("E:\\churn_proj\\columns.pkl")

@app.route("/predict", methods=["POST"])
def predict_churn():
    data = request.json
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    # Convert input to DataFrame with one row
    df_input = pd.DataFrame([data])

    # Ensure all expected columns exist in input
    for col in columns:
        if col not in df_input.columns:
            df_input[col] = 0  # Add missing column with default value

    df_input = df_input[columns]  # Reorder columns
    numeric_cols = ['tenure', 'MonthlyCharges', 'TotalCharges']
    df_input[numeric_cols] = scaler.transform(df_input[numeric_cols])

    prediction = model.predict(df_input)[0]
    probability = model.predict_proba(df_input)[0][1]

    return jsonify({
        "prediction": int(prediction),
        "churn_probability": round(probability, 4)
    })

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Manual encoding
    gender = 1 if data['gender'] == 'Male' else 0
    partner = 1 if data['Partner'] == 'Yes' else 0
    dependents = 1 if data['Dependents'] == 'Yes' else 0
    phone_service = 1 if data['PhoneService'] == 'Yes' else 0
    multiple_lines = 1 if data['MultipleLines'] == 'Yes' else 0

    # ... add more encodings as needed for other categorical fields

    # Extract numerical features
    tenure = float(data['tenure'])
    monthly_charges = float(data['MonthlyCharges'])
    total_charges = float(data['TotalCharges'])

    # Create input array (in correct order used during training)
    input_array = np.array([[gender, partner, dependents, phone_service,
                             multiple_lines, tenure, monthly_charges, total_charges]])

    # Predict
    prediction = model.predict(input_array)[0]
    return jsonify({'churn': int(prediction)})


if __name__ == "__main__":
    app.run(debug=True)