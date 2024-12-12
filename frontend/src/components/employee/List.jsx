import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toDateString(),
            profileImage: (
              <img
                className="rounded-full"
                src={`http://localhost:5000/${emp.userId.profileImage}`}
                alt="Profile"
                width={40}
                height={40}
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployee(records);
  };

  return (
    <Box p={4}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" component="h3" gutterBottom>
          Manage Employees
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search By Dep Name"
          onChange={handleFilter}
        />
        <Button
          component={Link}
          to="/admin-dashboard/add-employee"
          variant="contained"
          color="primary"
        >
          Add New Employee
        </Button>
      </Box>

      <Box mt={6}>
        {empLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100px">
            <CircularProgress />
          </Box>
        ) : (
          <DataTable columns={columns} data={filteredEmployee} pagination />
        )}
      </Box>
    </Box>
  );
};

export default List;
