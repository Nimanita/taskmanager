

import { 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Container, 
  Chip
} from '@mui/material';
import {
  DatabaseOutlined,
  CodeOutlined,
  LayoutOutlined,
  ApiOutlined,
  BoxPlotOutlined,
  CheckCircleOutlined,
  OrderedListOutlined
} from '@ant-design/icons';

const About = () => {
  const techStack = [
    { name: 'MongoDB', icon: <DatabaseOutlined />, color: 'success' },
    { name: 'React.js', icon: <CodeOutlined />, color: 'primary' },
    { name: 'Material UI', icon: <LayoutOutlined />, color: 'secondary' },
    { name: 'Node.js', icon: <ApiOutlined />, color: 'success' },
    { name: 'Express.js', icon: <BoxPlotOutlined />, color: 'warning' },
    { name: 'Redux', icon: <CodeOutlined />, color: 'error' },
  ];

  const features = [
    {
      title: "Task Management",
      icon: <OrderedListOutlined />,
      description: "Create, view, edit, and delete tasks with ease. Each task can be categorized and assigned a status to track progress effectively."
    },
    {
      title: "Smart Organization",
      icon: <LayoutOutlined />,
      description: "Organize tasks using custom categories and track progress with different status options. Keep your workflow structured and efficient."
    },
    {
      title: "Powerful Sorting & Filtering",
      icon: <BoxPlotOutlined />,
      description: "Sort tasks by name, status, due date, or category. Quick search functionality helps you find specific tasks instantly. Filter tasks by category and status."
    },
    {
      title: "User Profile",
      icon: <CheckCircleOutlined />,
      description: "Access and manage your profile information. Personalize your task management experience."
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3rem' } }}>
          TodoHero
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4 }}>
          A powerful and intuitive task management solution built with modern technologies
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Technology Stack
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {techStack.map((tech) => (
                <Chip
                  key={tech.name}
                  icon={tech.icon}
                  label={tech.name}
                  color={tech.color}
                  variant="outlined"
                  sx={{ fontSize: '1rem', py: 2.5 }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
              Key Features
            </Typography>
            <Grid container spacing={3}>
              {features.map((feature) => (
                <Grid item xs={12} md={6} key={feature.title}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      transition: 'box-shadow 0.3s',
                      '&:hover': {
                        boxShadow: 3
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                      {feature.icon}
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Usage Tips
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlined /> Tasks are automatically sorted by due date by default
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlined /> Click on column headers (Name, Status, Due Date, Category) to sort tasks
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlined /> Use the search bar to quickly find tasks across all fields
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlined /> Combine category and status filters for precise task viewing
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlined /> Remember to refresh the page after adding a new task
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Acknowledgments
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Special thanks to <Box component="span" sx={{ fontWeight: 500 }}>https://github.com/codedthemes/mantis-free-react-admin-template</Box> for providing the beautiful dashboard template that enhances the user experience of our application.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Contact Me
            </Typography>
            <Typography variant="body1" color="text.secondary">
              mamatasingh2507@gmail.com
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;