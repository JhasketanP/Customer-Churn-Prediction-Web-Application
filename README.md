# Customer-Churn-Prediction-Web-Application
This repository contains a fully interactive web-based Customer Churn Prediction system built using React.js (frontend) and Flask (backend). Users can input customer details, and the application predicts whether the customer is likely to churn or stay, along with the churn probability.

**Project Overview**

This project demonstrates a complete deployment-style workflow:

Frontend
	1) Built using React with Tailwind-like styling
	2) Interactive UI for user input
	3) Sends form data to backend for prediction
	4) Displays prediction result + probability
	   (Ref: frontend main component , entry point , stylesheet )

Backend
	1) Built using Flask
	2) Loads:
		1) Trained ML model (churn_model.pkl)
		2) Scaler for numerical features
		3) Column mapping for correct input order
	3) Accepts JSON input → Preprocesses → Predicts → Returns output
	   (Ref: backend code )

Static HTML Version
A standalone HTML + JS implementation for testing without React.
(Ref: HTML app version )

**Tech Stack**

Frontend
	1) React.js (Vite)
	2) JSX components
	3) Tailwind-style UI classes
	4) Fetch / Axios API calls

Backend
	1) Python Flask
	2) Joblib (model loading)
	3) NumPy & Pandas
	4) Scikit-learn (scaler + model)

Machine Learning
	1) Trained on Telco Customer Churn dataset
	2) Preprocessing: scaling, encoding
	3) Model: Random Forest / Logistic Regression / etc. (based on your .pkl)

**Folder Structure**

project/
	1) app.py			- Flask backend server
	2) churn_model.pkl	- Trained ML model
	3) scaler.pkl		- Standard scaler for numerical feature
	4) columns.pkl		- Model input column ordering
frontend/
	1) index.html		- Static HTML version
	2) index.css		- Styling
	3) main.jsx			- React entry point
	4) app_1.jsx		- React main UI component


**Key Features**

1) Real-time customer churn prediction
2) Clean, responsive UI
3) JSON-based API for ML inference
4) Model-compatible preprocessing
5) Interactive form elements
6) Clear output interpretation

