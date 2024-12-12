import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

const List = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Fetched leaves:', response.data);
      if (response.data.success) {
        setLeaves(response.data.leaves);
      } else {
        console.error('Error fetching leaves:', response.data.message);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
      console.error('Error fetching leaves:', error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <Box p={4}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" component="h3" gutterBottom>
          Manage Leaves
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search By Dep Name"
        />
        <Button
          component={Link}
          to="/employee-dashboard/add-leave"
          variant="contained"
          color="primary"
        >
          Add New Leave
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <TableRow key={leave._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{leave.departmentName}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                  
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2">No leaves found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default List;
