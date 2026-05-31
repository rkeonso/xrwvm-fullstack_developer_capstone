// src/services/api.js
const API_URL = "http://127.0.0.1:8000/djangoapp";

export async function getDealers() {
  const response = await fetch(`${API_URL}/dealers/`);
  return response.json();
}

export async function getDealerReviews(dealerId) {
  const response = await fetch(`${API_URL}/dealers/${dealerId}/reviews`);
  return response.json();
}

export async function addReview(reviewData) {
  const response = await fetch(`${API_URL}/add_review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData)
  });
  return response.json();
}

export async function getDealerDetails(dealerId) {
  const response = await fetch(`http://127.0.0.1:8000/djangoapp/dealer/${dealerId}/`);
  return response.json();
}