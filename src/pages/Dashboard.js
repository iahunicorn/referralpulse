import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Stack,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getEarnings } from '../services/api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [earnings, setEarnings] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const userName = "John Doe"; // Replace with actual logged-in user's name

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await getEarnings();
        setEarnings(response.data);
        const total = response.data.reduce((sum, item) => sum + item.amount, 0);
        setTotalEarnings(total);
      } catch (error) {
        console.error('Error fetching earnings:', error);
      }
    };

    fetchEarnings();
  }, []);

  const handleProfileClick = () => {
    // Logic to navigate to the profile page
    window.location.href = '/profile'; // Replace with your routing logic
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Navigation Menu */}
      <Navbar userName={userName} onProfileClick={handleProfileClick} />

      <Stack spacing={3} sx={{ mt: 2 }}>
        {/* Summary Card */}
        <Box sx={{ width: { xs: '100%', md: '33%' } }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Earnings
            </Typography>
            <Typography component="p" variant="h4">
              ${totalEarnings.toFixed(2)}
            </Typography>
          </Paper>
        </Box>

        {/* Chart */}
        <Box width="100%">
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Earnings Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={earnings}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* Recent Transactions Table */}
        <Box width="100%">
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Transactions
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {earnings.slice(0, 5).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell align="right">${row.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
};

export default Dashboard;