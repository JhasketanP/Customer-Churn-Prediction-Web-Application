import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    gender: 1,
    SeniorCitizen: 0,
    Partner: 1,
    Dependents: 0,
    tenure: 12,
    PhoneService: 1,
    MultipleLines: 0,
    OnlineSecurity: 1,
    OnlineBackup: 1,
    DeviceProtection: 0,
    TechSupport: 1,
    StreamingTV: 1,
    StreamingMovies: 0,
    PaperlessBilling: 1,
    MonthlyCharges: 70.5,
    TotalCharges: 850.3,
    InternetService_DSL: 1,
    InternetService_Fiber optic: 0,
    InternetService_No: 0,
    Contract_Month-to-month: 1,
    Contract_One year: 0,
    Contract_Two year: 0,
    PaymentMethod_Bank transfer (automatic): 0,
    PaymentMethod_Credit card (automatic): 0,
    PaymentMethod_Electronic check: 1,
    PaymentMethod_Mailed check: 0,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) : parseInt(value);
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/predict", formData);
    setResult(res.data);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 text-center font-sans">
      <h1 className="text-2xl font-bold mb-4">Customer Churn Prediction</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-2 gap-2">
          <label>Gender</label>
          <select name="gender" onChange={handleChange}>
            <option value={1}>Female</option>
            <option value={0}>Male</option>
          </select>

          <label>Senior Citizen</label>
          <select name="SeniorCitizen" onChange={handleChange}>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>

          <label>Partner</label>
          <select name="Partner" onChange={handleChange}>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>

          <label>Tenure</label>
          <input type="number" name="tenure" onChange={handleChange} value={formData.tenure} />
          
          <label>Monthly Charges</label>
          <input type="number" name="MonthlyCharges" onChange={handleChange} value={formData.MonthlyCharges} />
          
          <label>Total Charges</label>
          <input type="number" name="TotalCharges" onChange={handleChange} value={formData.TotalCharges} />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
          Predict Churn
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded shadow">
          <p>
            <strong>Prediction:</strong>{" "}
            {result.prediction === 1 ? "Customer is likely to Churn" : "Customer will stay"}
          </p>
          <p>
            <strong>Churn Probability:</strong> {result.churn_probability}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
