const Workout = require('../models/Workout');

// @desc    Create a new workout
// @route   POST /workouts/addWorkout
// @access  Private
exports.addWorkout = async (req, res) => {
  try {
    const { name, duration } = req.body;

    const workout = new Workout({
      userId: req.user.id,
      name,
      duration,
    });

    const createdWorkout = await workout.save();
    res.status(201).json(createdWorkout);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all workouts for logged in user
// @route   GET /workouts/getMyWorkouts
// @access  Private
exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id });
    return res.status(200).json({
      workouts: workouts
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a workout
// @route   PUT /workouts/updateWorkout/:id
// @access  Private
exports.updateWorkout = async (req, res) => {
  try {
    const { name, duration } = req.body;
    const workout = await Workout.findById(req.params.id);

    if (workout) {
      if (workout.userId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      workout.name = name || workout.name;
      workout.duration = duration || workout.duration;

      const updatedWorkout = await workout.save();


      return res.status(200).json({
        message: 'Workout updated successfully',
        updatedWorkout: updatedWorkout
      });
    } else {
      return res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// @desc    Delete a workout
// @route   DELETE /workouts/deleteWorkout/:id
// @access  Private
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
      // Ensure the workout belongs to the user
      if (workout.userId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      await workout.deleteOne();
      res.status(200).json({ message: 'Workout deleted successfully' });
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Complete a workout status
// @route   PATCH /workouts/completeWorkoutStatus/:id
// @access  Private
exports.completeWorkoutStatus = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
      // Ensure the workout belongs to the user
      if (workout.userId.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      workout.status = 'completed';

      const updatedWorkout = await workout.save();

      return res.status(200).json({
        message: 'Workout status updated successfully',
        updatedWorkout: updatedWorkout
      });
    } else {
      return res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

