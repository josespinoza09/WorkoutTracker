const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                require: "Enter exercise type"
            },
            name: {
                type: String,
                require: 'Enter workout name'
            },
            duration: {
                type: Number,
                required: 'Enter workout duration'
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
}
)

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;