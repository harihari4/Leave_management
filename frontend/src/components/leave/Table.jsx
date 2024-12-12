import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { columns, LeaveButtons } from '../../utils/LeaveHelper'


const Table = () => {
    const [leaves,setLeaves] = useState(null)

    const fetchLeaves = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/leave", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            })
            if(response.data.success){
              let sno = 1;
                const data = await response.data.leaves.map((leave) => (
                  {
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId.employeeId,
                    name: leave.employeeId.userId.name,
                    leaveType: leave.leaveType,
                    department:leave.employeeId.department.dep_name,
                    days:
                        new Date(leave.endDate).getDate() -
                        new Date(leave.startDate).getDate(),
                    status: leave.status,
                    action: (<LeaveButtons Id={leave._id} />),
                  }
                ));
              setLeaves(data);
                
               
                
            }
          } catch(error){
            if(error.response && !error.response.data.success){
              alert(error.response.data.error)
          }
    }
    }
    useEffect (() => {
        fetchLeaves()
    }, [])
  return (
    <>
    {leaves ? (
    <div className='p-6'> 
    
    
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Leaves</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input  
        type="text" 
        placeholder='Search By Dep Name'
        className='px-4 py-0.5 border'
        />
        
      </div>
      
      <div className='mt-3'>
      <DataTable columns={columns} data={leaves} pagination/>
      </div>
    </div>
) : <div>Loading ...</div>}
</>
  )
}

export default Table
