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

app.get('/api/workouts', async (req, res) => {
    const getWorkout = await db.Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration',
            }
        }
    }])
    console.log(getWorkout)
    res.json(getWorkout)
});

app.put('/api/workouts/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    const updateWorkout = await db.Workout.findByIdAndUpdate(
        id,
        {
            $push:
            {
                exercises: body
            }
        }
    )
    res.send(updateWorkout)
})

app.get('/api/workouts/range', async (req, res) => {
    const getStats = await db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
        .sort({ day: -1 })
        .limit(7)
        .sort({ day: 1 })

    res.send(getStats)
});

app.listen(PORT, function () {
    console.log(`Serving content on http://localhost:${PORT}`);
});
