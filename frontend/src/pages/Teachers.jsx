import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  Card,
  CardContent,
  LinearProgress,
  Grid,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../services/api';

const StyledCard = styled(Card)(() => ({
  background: 'linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)',
  color: '#fff',
  borderRadius: '20px',
  padding: '20px',
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

const StyledTableContainer = styled(TableContainer)(() => ({
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

const GlowingAvatar = styled(Avatar)(() => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 0 15px rgba(33,203,243,0.3)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const AnimatedProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255,255,255,0.2)',
  '.MuiLinearProgress-bar': {
    borderRadius: 4,
    background:
      'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,1) 100%)',
  },
}));

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(30,60,114,0.2)',
  },
}));

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    teacherId: '',
    name: '',
    email: '',
    phone: '',
    subject: '',
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Teacher ID validation
    if (!formData.teacherId) {
      newErrors.teacherId = 'Teacher ID is required';
    } else if (!/^\d+$/.test(formData.teacherId)) {
      newErrors.teacherId = 'Teacher ID must be a number';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 2) {
      newErrors.subject = 'Subject must be at least 2 characters long';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.subject)) {
      newErrors.subject = 'Subject can only contain letters and spaces';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      if (selectedTeacher) {
        await updateTeacher(selectedTeacher._id, formData);
        showSnackbar('Teacher updated successfully', 'success');
      } else {
        await createTeacher(formData);
        showSnackbar('Teacher added successfully', 'success');
      }
      fetchTeachers();
      handleCloseDialog();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (selectedTeacher
          ? 'Failed to update teacher'
          : 'Failed to add teacher');
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });

      // Handle duplicate key errors
      if (error.response?.status === 400) {
        if (errorMessage.includes('Teacher ID')) {
          setErrors({ ...errors, teacherId: 'Teacher ID already exists' });
        } else if (errorMessage.includes('Email')) {
          setErrors({ ...errors, email: 'Email already exists' });
        }
      }
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await getTeachers();
      setTeachers(response.data || []);
    } catch {
      setSnackbar({
        open: true,
        message: 'Failed to fetch teachers',
        severity: 'error',
      });
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      teacherId: teacher.teacherId,
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      subject: teacher.subject,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      fetchTeachers();
      setSnackbar({
        open: true,
        message: 'Teacher deleted successfully',
        severity: 'success',
      });
    } catch {
      setSnackbar({
        open: true,
        message: 'Failed to delete teacher',
        severity: 'error',
      });
    }
  };

  const handleCloseDialog = () => {
    setSelectedTeacher(null);
    setFormData({ teacherId: '', name: '', email: '', phone: '', subject: '' });
    setOpenDialog(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
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
          <GroupIcon sx={{ fontSize: 32 }} />
        </GlowingAvatar>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            Teachers Management
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Manage and monitor teacher information
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
                  <GroupIcon />
                </GlowingAvatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {teachers.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Teachers
                  </Typography>
                </Box>
              </Box>
              <AnimatedProgress
                variant="determinate"
                value={(teachers.length / 50) * 100}
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
          onClick={() => setOpenDialog(true)}
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
          Add Teacher
        </Button>
      </Box>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher._id}>
                <TableCell>{teacher.teacherId}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.phone}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(teacher)}
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        color: '#1e3c72',
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(teacher._id)}
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        color: '#ff1744',
                      },
                    }}
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
          {selectedTeacher ? 'Edit Teacher' : 'Add New Teacher'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="teacherId"
              label="Teacher ID"
              type="number"
              value={formData.teacherId}
              onChange={handleInputChange}
              error={!!errors.teacherId}
              helperText={errors.teacherId}
              required
              disabled={!!selectedTeacher}
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
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              required
              inputProps={{
                pattern: '\\d{10,}',
                title: 'Phone number must be at least 10 digits',
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
              name="subject"
              label="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              error={!!errors.subject}
              helperText={errors.subject}
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
            {selectedTeacher ? 'Update' : 'Add'}
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

export default Teachers;
