// src/services/api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/predict";

export const getCropRecommendation = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};
