# 🌤️ Weather Intelligence App

An AI-native Weather Intelligence web application built using **Google AI Studio App Build**, **React**, **Vite**, and **Tailwind CSS**. The application fetches real-time weather and forecast data from the open-access **Open-Meteo API**.

---

## 🚀 Live Deployment
- **Live App URL:** [https://weather-intelligence-app-3yf.pages.dev](https://weather-intelligence-app-3yf.pages.dev)
- **Hosted Platform:** Cloudflare Pages

---

## ✨ Features
- **City Search & Geocoding:** Search for any city worldwide with instant geocoding.
- **Current Weather Hero:** Live main temperature, weather condition description, feels-like temp, daily highs/lows, humidity, wind speed, pressure, UV index, and sun cycle.
- **24-Hour Trend Chart:** Interactive temperature and metrics visualization.
- **7-Day Forecast Cards:** Daily min/max temperature spectrum range, rain probabilities, and condition icons.
- **Smart Activity Intelligence Hub:** 0–100% suitability scores for outdoor and indoor activities based on weather metrics.
- **Graceful Error Handling:** Friendly error alerts and fallback states for zero-result city searches or network timeouts.

---

## 📡 API Integration (Open-Meteo)
This app integrates public, open-access endpoints from Open-Meteo:
1. **Geocoding API:** `https://geocoding-api.open-meteo.com/v1/search`
   - Converts city names into latitude and longitude coordinates.
2. **Forecast API:** `https://api.open-meteo.com/v1/forecast`
   - Retrieves real-time weather conditions, hourly trends, and 7-day weather forecasts.

---

## 🛠️ Development & Deployment Workflow

### 1. Generation in Google AI Studio
- Built and prototyped interactively using **Google AI Studio App Build**.

### 2. GitHub Connection
- Pushed directly from Google AI Studio to GitHub repository:  
  `premkumarshanmu-rgb/weather-intelligence-app`

### 3. Cloudflare Pages Deployment
- **Framework Preset:** React (Vite)
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Automatic CI/CD:** Connected directly to the `main` branch on GitHub for automated deployments.

---

## 💻 Local Setup & Development
To run this project locally:

```bash
# Clone the repository
git clone [https://github.com/premkumarshanmu-rgb/weather-intelligence-app.git](https://github.com/premkumarshanmu-rgb/weather-intelligence-app.git)

# Navigate into directory
cd weather-intelligence-app

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
