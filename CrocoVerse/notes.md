# 🐊 Crocodile Intelligence Platform
### A Machine Learning-Powered Crocodile Information & Prediction Website

![Crocodile](https://img.shields.io/badge/Species-18%20Crocodilian%20Species-green)
![ML](https://img.shields.io/badge/ML-Scikit--Learn%20%7C%20XGBoost-blue)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)

---

## 📖 About the Project

The **Crocodile Intelligence Platform** is a full-stack web application that combines wildlife data with machine learning to provide insights, predictions, and educational content about crocodilian species worldwide. Built on a dataset of **1,000+ field observations** across **18 species**, the platform empowers researchers, conservationists, and wildlife enthusiasts with data-driven tools.

---

## 🤖 ML Prediction Features

### 1. 🏋️ Weight Predictor
**Model:** Linear / Polynomial Regression

Predict a crocodile's weight based on observable physical and biological traits.

| Input Features | Output |
|---|---|
| Observed Length (m) | Estimated Weight (kg) |
| Age Class | |
| Species | |
| Sex | |

> **Use Case:** Field researchers can quickly estimate weight without needing to physically weigh a crocodile.

---

### 2. 🧬 Age Class Classifier
**Model:** Random Forest / Decision Tree

Classify a crocodile's life stage from physical measurements.

| Input Features | Output Classes |
|---|---|
| Length (m) | Hatchling |
| Weight (kg) | Juvenile |
| Species | Subadult |
| | Adult |

> **Use Case:** Useful for population studies to understand the age distribution of a species in a given region.

---

### 3. 🛡️ Conservation Status Predictor
**Model:** XGBoost Multi-class Classifier

Predict the conservation risk level of a crocodile based on species and environmental context.

| Input Features | Output Classes |
|---|---|
| Species | Least Concern |
| Habitat Type | Vulnerable |
| Country / Region | Endangered |
| Length & Weight | Critically Endangered |

> **Use Case:** Helps conservation organizations assess and prioritize species protection efforts.

---

### 4. 🔍 Species Identifier
**Model:** Multi-class Classification (Random Forest / KNN)

Identify the most likely crocodile species from habitat and physical characteristics.

| Input Features | Output |
|---|---|
| Habitat Type | Predicted Species Name |
| Country / Region | Scientific Name |
| Length (m) | Confidence Score (%) |
| Weight (kg) | |

> **Use Case:** A field guide tool for wildlife observers who spot a crocodile and want to identify it quickly.

---

### 5. 🌿 Habitat Suitability Predictor
**Model:** Multi-class Classification

Predict the most suitable habitat for a given crocodile species based on its physical traits.

| Input Features | Output |
|---|---|
| Species | Rivers / Mangroves / Swamps |
| Length (m) | Lakes / Estuaries / Marshes |
| Weight (kg) | Forest Swamps / Reservoirs |
| Age Class | etc. |

> **Use Case:** Supports conservation planning by identifying ideal relocation or protection zones.

---

### 6. ⚠️ Population Risk Score
**Model:** Composite Scoring (Rule-based + ML)

Generate a custom 0–100 risk score for a species in a specific region by combining conservation status, habitat availability, and observation trends over time.

| Input Features | Output |
|---|---|
| Species | Risk Score (0–100) |
| Region | Risk Category (Low / Medium / High / Critical) |
| Habitat Type | Trend Direction (↑ Improving / ↓ Declining) |
| Date Range | |

> **Use Case:** A dynamic dashboard metric for conservation NGOs and government wildlife departments.

---

### 7. 📈 Observation Trend Analysis
**Model:** Time-Series Analysis

Analyze observation frequency over time to identify which species are being sighted more or less often — used as a proxy for population health.

| Input | Output |
|---|---|
| Date of Observation | Species trend line charts |
| Species | Year-over-year observation count |
| Country / Region | Seasonal pattern heatmaps |

> **Use Case:** Track whether conservation efforts are having a positive impact on sighting rates.

---

## 🛠️ Tech Stack

### Backend & Machine Learning
| Tool | Purpose |
|---|---|
| **Python** | Core language |
| **scikit-learn** | Core ML models (Regression, Random Forest, KNN) |
| **XGBoost** | Conservation Status Predictor |
| **pandas / NumPy** | Data processing & feature engineering |
| **Flask / FastAPI** | REST API to serve ML predictions |

### Frontend
| Tool | Purpose |
|---|---|
| **React** (or HTML/JS) | Website UI |
| **Chart.js / D3.js** | Species & habitat data visualizations |
| **Leaflet.js** | Interactive world map of sighting locations |

### Database
| Tool | Purpose |
|---|---|
| **PostgreSQL / SQLite** | Store observations and prediction logs |

---

## 📂 Dataset Overview

| Field | Description |
|---|---|
| `Observation ID` | Unique ID per record |
| `Common Name` | Common species name |
| `Scientific Name` | Latin binomial classification |
| `Observed Length (m)` | Body length in meters |
| `Observed Weight (kg)` | Body weight in kilograms |
| `Age Class` | Hatchling / Juvenile / Subadult / Adult |
| `Sex` | Male / Female / Unknown |
| `Date of Observation` | Date the specimen was observed |
| `Country/Region` | Geographic location |
| `Habitat Type` | River / Swamp / Mangrove / Lake etc. |
| `Conservation Status` | IUCN conservation classification |

**Total Records:** 1,000 | **Species Count:** 18 | **Countries:** 30+

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/crocodile-intelligence-platform.git
cd crocodile-intelligence-platform

# Install Python dependencies
pip install -r requirements.txt

# Run the API server
python app.py

# Open the frontend
open index.html
```

---

## 📌 Roadmap

- [x] Dataset exploration & cleaning
- [ ] Weight Predictor model
- [ ] Age Class Classifier model
- [ ] Conservation Status Predictor
- [ ] Species Identifier
- [ ] Habitat Suitability Predictor
- [ ] Population Risk Score dashboard
- [ ] Observation Trend Analysis charts
- [ ] Deploy to cloud (AWS / Heroku / Render)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a pull request or raise an issue.

---

## 📄 License

This project is licensed under the MIT License.

---

> *"Every crocodile saved is a piece of our planet's future preserved."* 🌍