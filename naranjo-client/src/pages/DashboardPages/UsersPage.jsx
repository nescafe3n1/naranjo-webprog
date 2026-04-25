import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Typography, Card, CardContent } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

// Sample data for users
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 130,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 130,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: false,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    editable: false,
  },
  {
    field: 'joinDate',
    headerName: 'Join Date',
    width: 130,
    editable: false,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'jon@example.com', age: 14, status: 'Active', joinDate: '2024-01-15' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'cersei@example.com', age: 31, status: 'Active', joinDate: '2024-02-20' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: 'jaime@example.com', age: 31, status: 'Inactive', joinDate: '2024-03-10' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'arya@example.com', age: 11, status: 'Active', joinDate: '2024-01-25' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'daenerys@example.com', age: 28, status: 'Active', joinDate: '2024-04-05' },
  { id: 6, lastName: 'Melisandre', firstName: 'Salma', email: 'salma@example.com', age: 150, status: 'Inactive', joinDate: '2024-02-14' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: 'ferrara@example.com', age: 44, status: 'Active', joinDate: '2024-03-22' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', email: 'rossini@example.com', age: 36, status: 'Active', joinDate: '2024-01-30' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: 'harvey@example.com', age: 65, status: 'Active', joinDate: '2024-02-11' },
  { id: 10, lastName: 'Smith', firstName: 'Michael', email: 'michael@example.com', age: 42, status: 'Active', joinDate: '2024-04-01' },
];

function UsersPage() {
  // Calculate statistics
  const totalUsers = rows.length;
  const activeUsers = rows.filter((row) => row.status === 'Active').length;
  const inactiveUsers = rows.filter((row) => row.status === 'Inactive').length;
  const averageAge = (rows.reduce((sum, row) => sum + (row.age || 0), 0) / rows.length).toFixed(1);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Users Management
      </Typography>

      {/* User Statistics */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h5">{totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Users
              </Typography>
              <Typography variant="h5">{activeUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Inactive Users
              </Typography>
              <Typography variant="h5">{inactiveUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Age
              </Typography>
              <Typography variant="h5">{averageAge}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Users DataGrid */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Users List
          </Typography>
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                '& .MuiDataGrid-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;
