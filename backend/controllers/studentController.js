import Student from '../models/student.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createStudent = async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent)
      return res.status(404).json({ message: 'Student not found' });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export const creatStudent = async(req,res)=>{
  const newStudent = new student(req.body)

  await newStudent.save
}