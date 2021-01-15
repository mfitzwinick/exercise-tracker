const router = require("express").Router();
const path = require("path");
const Workout = require("../models/workout.js");

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, ".../public/exercise.html"));
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