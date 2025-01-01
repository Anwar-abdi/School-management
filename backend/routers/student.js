const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new student
router.post('/', async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  try {
    console.log('Update request for ID:', req.params.id);
    console.log('Update data:', req.body);

    // Ensure the request body is properly formatted
    const updateData = { ...req.body };

    // Convert ID to number if it exists
    if (updateData.ID) {
      updateData.ID = Number(updateData.ID);
    }

    // Convert date string to Date object
    if (updateData.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateData.dateOfBirth);
    }

    console.log('Processed update data:', updateData);

    // First check if another student has the same ID or email (excluding current student)
    const existingStudent = await Student.findOne({
      $and: [
        { _id: { $ne: req.params.id } },
        {
          $or: [{ ID: updateData.ID }, { email: updateData.email }],
        },
      ],
    });

    if (existingStudent) {
      console.log('Duplicate found:', existingStudent);
      return res.status(400).json({
        message: `A student with this ${
          existingStudent.ID === updateData.ID ? 'ID' : 'email'
        } already exists`,
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validations on update
      }
    );

    if (!updatedStudent) {
      console.log('Student not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Student not found' });
    }

    console.log('Successfully updated student:', updatedStudent);
    res.json(updatedStudent);
  } catch (error) {
    console.error('Update error:', error);
    // Check for duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'A student with this ID or email already exists',
      });
    }
    res.status(400).json({ message: error.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
