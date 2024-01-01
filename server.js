const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config();

// Define the schema
const symptomSchema = new mongoose.Schema({
  symptoms: [String], // Array of symptoms
  timestamp: { type: Date, default: Date.now } // Timestamp when the data was submitted
});

// Create the model using the schema
const Symptom = mongoose.model('Symptom', symptomSchema);

// MongoDB connection
mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(express.json());

// Specific routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'login.html'));
});
app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'settings.html'));
});

// Static files
app.use(express.static(path.join(__dirname, "Public")));

// API endpoint for submitting symptoms
app.post("/submit-symptoms", (req, res) => {
  const newSymptom = new Symptom({
    symptoms: req.body.symptoms
  });

  newSymptom.save()
    .then(() => res.status(200).send("Symptoms received"))
    .catch(err => {
      console.error(err);
      res.status(500).send("An error occurred on the server.");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
