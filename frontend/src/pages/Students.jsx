import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Card,
  CardContent,
  LinearProgress,
  Grid,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../services/api';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)',
  color: '#fff',
  borderRadius: '20px',
  padding: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 12px 25px rgba(0,0,0,0.2)',
    '&:before': {
      transform: 'scale(1.5)',
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '100%',
    height: '100%',
    background:
      'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
    transform: 'scale(1)',
    transition: 'transform 0.5s ease-out',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  '& .MuiTableHead-root': {
    background: 'linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)',
    '& .MuiTableCell-root': {
      color: '#fff',
      fontWeight: 'bold',
    },
  },
  '& .MuiTableBody-root .MuiTableRow-root': {
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      transform: 'scale(1.01)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
  },
}));

const GlowingAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 0 15px rgba(33,203,243,0.3)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const AnimatedProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255,255,255,0.2)',
  '.MuiLinearProgress-bar': {
    borderRadius: 4,
    background:
      'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,1) 100%)',
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(30,60,114,0.2)',
  },
}));

const Students = () => {
  const [students, setStudents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    ID: '',
    name: '',
    address: '',
    email: '',
    gender: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchStudents = useCallback(async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      showSnackbar('Failed to fetch students', 'error');
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ID.trim()) {
      newErrors.ID = 'Student ID is required';
    } else if (!/^\d+$/.test(formData.ID)) {
      newErrors.ID = 'ID should contain only numbers';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name should be at least 2 characters long';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should contain only letters and spaces';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 5) {
      newErrors.address = 'Address should be at least 5 characters long';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();

      if (age < 5) {
        newErrors.dateOfBirth = 'Student must be at least 5 years old';
      } else if (age > 100) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenDialog = (student = null) => {
    if (student) {
      console.log('Opening dialog for student:', student);
      setSelectedStudent(student);
      const formattedDate = new Date(student.dateOfBirth)
        .toISOString()
        .split('T')[0];
      setFormData({
        ID: student.ID.toString(),
        name: student.name,
        email: student.email,
        address: student.address,
        gender: student.gender,
        dateOfBirth: formattedDate,
      });
    } else {
      setSelectedStudent(null);
      setFormData({
        ID: '',
        name: '',
        address: '',
        email: '',
        gender: '',
        dateOfBirth: '',
      });
    }
    setErrors({});
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showSnackbar('Please fill all required fields correctly', 'error');
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        ID: Number(formData.ID),
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
      };

      console.log('Submitting data:', dataToSubmit);
      console.log('Selected student:', selectedStudent);

      if (selectedStudent) {
        console.log('Updating student with ID:', selectedStudent._id);
        const response = await updateStudent(selectedStudent._id, dataToSubmit);
        console.log('Update response:', response);
        await fetchStudents();
        showSnackbar('Student updated successfully', 'success');
        handleCloseDialog();
      } else {
        const response = await createStudent(dataToSubmit);
        console.log('Create response:', response);
        await fetchStudents();
        showSnackbar('Student added successfully', 'success');
        handleCloseDialog();
      }
    } catch (error) {
      console.error('Operation error:', error.response || error);
      const errorMessage = error.response?.data?.message || 'Operation failed';
      showSnackbar(errorMessage, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        showSnackbar('Student deleted successfully', 'success');
        fetchStudents();
      } catch (error) {
        showSnackbar('Failed to delete student', 'error');
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
    setErrors({});
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)',
          p: 3,
          borderRadius: '20px',
          color: 'white',
          boxShadow: '0 8px 32px rgba(30,60,114,0.2)',
        }}
      >
        <GlowingAvatar sx={{ width: 56, height: 56, mr: 3 }}>
          <SchoolIcon sx={{ fontSize: 32 }} />
        </GlowingAvatar>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            Students Management
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Manage and monitor student information
          </Typography>
        </Box>
      </Box>

      {/* Stats Card */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GlowingAvatar sx={{ mr: 2 }}>
                  <SchoolIcon />
                </GlowingAvatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {students.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Students
                  </Typography>
                </Box>
              </Box>
              <AnimatedProgress
                variant="determinate"
                value={(students.length / 1000) * 100}
              />
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: 'linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)',
            borderRadius: '12px',
            padding: '10px 20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            },
          }}
        >
          Add Student
        </Button>
      </Box>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.ID}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      console.log('Edit button clicked for student:', student);
                      handleOpenDialog(student);
                    }}
                    sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(student._id)}
                    sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          {selectedStudent ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="ID"
              label="Student ID"
              value={formData.ID}
              onChange={handleInputChange}
              error={!!errors.ID}
              helperText={errors.ID}
              required
              inputProps={{
                pattern: '[0-9]*',
                maxLength: 10,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                },
              }}
            />
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              required
              inputProps={{
                maxLength: 50,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                },
              }}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                },
              }}
            />
            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
              required
              multiline
              rows={2}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                },
              }}
            />
            <TextField
              name="gender"
              select
              label="Gender"
              value={formData.gender}
              onChange={handleInputChange}
              error={!!errors.gender}
              helperText={errors.gender}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                },
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
            <TextField
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              InputLabelProps={{ shrink: true }}
              required
              inputProps={{
                max: new Date().toISOString().split('T')[0],
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(0,0,0,0.04)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: 'linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              },
            }}
          >
            {selectedStudent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </StyledDialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Students;
