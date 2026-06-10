const express = require('express');
const router = express.Router();
const {
  addWorkout,
  getMyWorkouts,
  updateWorkout,
  deleteWorkout,
  completeWorkoutStatus,
} = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');

router.post('/addWorkout', protect, addWorkout);
router.get('/getMyWorkouts', protect, getMyWorkouts);
router.patch('/updateWorkout/:id', protect, updateWorkout);
router.delete('/deleteWorkout/:id', protect, deleteWorkout);
router.patch('/completeWorkoutStatus/:id', protect, completeWorkoutStatus);

module.exports = router;
