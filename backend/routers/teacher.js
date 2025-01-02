const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new teacher
router.post('/', async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: error.keyPattern.teacherId
          ? 'Teacher ID already exists'
          : 'Email already exists',
      });
    }
    res.status(400).json({ message: error.message });
  }
});

// Update a teacher
router.put('/:id', async (req, res) => {
  try {
    // Check for duplicate email
    const existingTeacher = await Teacher.findOne({
      email: req.body.email,
      _id: { $ne: req.params.id },
    });

    if (existingTeacher) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Exclude teacherId from update
    const { teacherId, ...updateData } = req.body;

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a teacher
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
