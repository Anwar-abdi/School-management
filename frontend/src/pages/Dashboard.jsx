/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getStudents, getTeachers } from '../services/api';

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

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(3),
  height: '100%',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
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

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '12px',
  marginBottom: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.03)',
    transform: 'translateX(8px) scale(1.01)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
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

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes] = await Promise.all([
          getStudents(),
          getTeachers(),
        ]);
        setStudentCount(studentsRes.data.length);
        setTeacherCount(teachersRes.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          <TrendingUpIcon sx={{ fontSize: 32 }} />
        </GlowingAvatar>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            School Analytics Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Real-time overview of your school&apos;s performance
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GlowingAvatar sx={{ mr: 2 }}>
                  <SchoolIcon />
                </GlowingAvatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {loading ? '...' : studentCount}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Students
                  </Typography>
                </Box>
              </Box>
              <AnimatedProgress
                variant="determinate"
                value={loading ? 0 : (studentCount / 1000) * 100}
              />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GlowingAvatar sx={{ mr: 2 }}>
                  <GroupIcon />
                </GlowingAvatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {loading ? '...' : teacherCount}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Teachers
                  </Typography>
                </Box>
              </Box>
              <AnimatedProgress
                variant="determinate"
                value={loading ? 0 : (teacherCount / 50) * 100}
              />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GlowingAvatar sx={{ mr: 2 }}>
                  <ClassIcon />
                </GlowingAvatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    24
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Classes
                  </Typography>
                </Box>
              </Box>
              <AnimatedProgress variant="determinate" value={60} />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GlowingAvatar sx={{ mr: 2 }}>
                  <AssignmentIcon />
                </GlowingAvatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    12
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Courses
                  </Typography>
                </Box>
              </Box>
              <AnimatedProgress variant="determinate" value={90} />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <GlowingAvatar sx={{ mr: 2 }}>
                <NotificationsIcon />
              </GlowingAvatar>
              <Typography variant="h6" fontWeight="bold">
                Recent Activities
              </Typography>
            </Box>
            <List>
              {[
                {
                  icon: SchoolIcon,
                  primary: 'New Student Registration',
                  secondary: 'John Doe has been registered',
                  date: '2 hours ago',
                },
                {
                  icon: GroupIcon,
                  primary: 'Teacher Meeting',
                  secondary: 'Staff meeting for Q1 planning',
                  date: '3 hours ago',
                },
                {
                  icon: ClassIcon,
                  primary: 'Class Schedule Update',
                  secondary: 'Class 10-A schedule modified',
                  date: '5 hours ago',
                },
              ].map((item, index) => (
                <StyledListItem key={index}>
                  <ListItemAvatar>
                    <GlowingAvatar>
                      <item.icon />
                    </GlowingAvatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.primary}
                    secondary={item.secondary}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {item.date}
                  </Typography>
                </StyledListItem>
              ))}
            </List>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <GlowingAvatar sx={{ mr: 2 }}>
                <EventIcon />
              </GlowingAvatar>
              <Typography variant="h6" fontWeight="bold">
                Upcoming Events
              </Typography>
            </Box>
            <List>
              {[
                {
                  icon: EventIcon,
                  primary: 'Annual Sports Day',
                  secondary: 'Preparation for annual sports meet',
                  date: 'Next Week',
                },
                {
                  icon: EventIcon,
                  primary: 'Parent-Teacher Meeting',
                  secondary: 'Term 1 progress discussion',
                  date: 'In 2 Weeks',
                },
                {
                  icon: EventIcon,
                  primary: 'Science Exhibition',
                  secondary: 'Inter-school science project showcase',
                  date: 'In 3 Weeks',
                },
              ].map((item, index) => (
                <StyledListItem key={index}>
                  <ListItemAvatar>
                    <GlowingAvatar>
                      <item.icon />
                    </GlowingAvatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.primary}
                    secondary={item.secondary}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {item.date}
                  </Typography>
                </StyledListItem>
              ))}
            </List>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
