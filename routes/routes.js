const router = require("express").Router();
const path = require("path");
const Workout = require("../models/workout.js");

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.post("/api/workouts", function (req, res) {
    Workout.create({})
        .then(updatedExercise => {
            res.json(updatedExercise)
        })
})
router.get("/api/workouts/range", function (req, res) {
    Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }
    ])
        .limit(7)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err)
        })
})

router.put("/api/workouts/:id", ({ body, params }, res) => {
    console.log(params)
    Workout.findByIdAndUpdate(params.id, { $push: { "exercises": body } })
        .then(updatedExercise => {
            res.json(updatedExercise)
        })
});



router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(result => { res.json(result) })

});
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;

//hit /api/workouts/range
//.aggredate "sort" "limit" "then" res.json