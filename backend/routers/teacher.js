import express from 'express';
import {
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../controllers/teacherController.js';

const router = express.Router();

router.get('/', getAllTeachers);
router.post('/', createTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;
