const express = require("express");
const mongoose = require("mongoose");
const db = require('./models/');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/Fitness',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

app.get('/exercise', (req, res) => {
    res.redirect('/exercise.html')
});

app.get('/stats', (req, res) => {
    res.redirect('/stats.html')
});

app.post('/api/workouts', async (req, res) => {
    const postWorkout = await db.Workout.create({})
    res.json(postWorkout)
});

