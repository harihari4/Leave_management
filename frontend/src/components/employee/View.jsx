import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Avatar, Grid, Paper, CircularProgress } from '@mui/material';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <Box sx={{ padding: 4 }}>
      {employee ? (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: '0 auto' }}>
          <Typography variant="h4" gutterBottom>
            Employee Details
          </Typography>
          <Box display="flex" justifyContent="center" marginBottom={4}>
            <Avatar
              src={`http://localhost:5000/${employee.userId.profileImage}`}
              alt={employee.userId.name}
              sx={{ width: 120, height: 120 }}
            />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body1">{employee.userId.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Employee ID
              </Typography>
              <Typography variant="body1">{employee.employeeId}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Date of Birth
              </Typography>
              <Typography variant="body1">
                {new Date(employee.dob).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Gender
              </Typography>
              <Typography variant="body1">{employee.gender}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Department
              </Typography>
              <Typography variant="body1">{employee.department.dep_name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Marital Status
              </Typography>
              <Typography variant="body1">{employee.maritalStatus}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default View;
