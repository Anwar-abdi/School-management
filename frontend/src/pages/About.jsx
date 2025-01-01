import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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

const About = () => {
  const [stats] = useState({
    students: 1200,
    teachers: 80,
    courses: 50,
  });

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
          <InfoIcon sx={{ fontSize: 32 }} />
        </GlowingAvatar>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            About Our School
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Learn more about our institution and achievements
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GlowingAvatar sx={{ mr: 2 }}>
                  <SchoolIcon />
                </GlowingAvatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {stats.students}+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Students Enrolled
                  </Typography>
                </Box>
              </Box>
              <AnimatedProgress
                variant="determinate"
                value={(stats.students / 2000) * 100}
              />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GlowingAvatar sx={{ mr: 2 }}>
                  <GroupIcon />
                </GlowingAvatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {stats.teachers}+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Expert Teachers
                  </Typography>
                </Box>
              </Box>
              <AnimatedProgress
                variant="determinate"
                value={(stats.teachers / 100) * 100}
              />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GlowingAvatar sx={{ mr: 2 }}>
                  <MenuBookIcon />
                </GlowingAvatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {stats.courses}+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Academic Courses
                  </Typography>
                </Box>
              </Box>
              <AnimatedProgress
                variant="determinate"
                value={(stats.courses / 100) * 100}
              />
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                To provide quality education that prepares students for the
                challenges of tomorrow. We strive to create an environment that
                fosters learning, innovation, and personal growth.
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                To be a leading educational institution that empowers students
                with knowledge, skills, and values necessary for success in a
                rapidly evolving global society.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
