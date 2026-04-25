import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';

// Sample data for charts
const quarterlyData = {
  Q1: 35,
  Q2: 44,
  Q3: 24,
  Q4: 34,
};

const monthlyData = {
  January: 4000,
  February: 3000,
  March: 2000,
  April: 2780,
  May: 1890,
  June: 2390,
};

const pieChartData = [
  { id: 0, value: 30, label: 'North' },
  { id: 1, value: 25, label: 'South' },
  { id: 2, value: 20, label: 'East' },
  { id: 3, value: 25, label: 'West' },
];

const lineChartData = [
  { month: 'Jan', sales: 4000, revenue: 2400 },
  { month: 'Feb', sales: 3000, revenue: 1398 },
  { month: 'Mar', sales: 2000, revenue: 9800 },
  { month: 'Apr', sales: 2780, revenue: 3908 },
  { month: 'May', sales: 1890, revenue: 4800 },
  { month: 'Jun', sales: 2390, revenue: 3800 },
];

function ReportsPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Reports & Analytics
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h5">$45,231.89</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Sales
              </Typography>
              <Typography variant="h5">12,345</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Growth Rate
              </Typography>
              <Typography variant="h5">+23.5%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Users
              </Typography>
              <Typography variant="h5">8,234</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ mb: 4 }}>
        {/* Bar Chart */}
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quarterly Sales
              </Typography>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34], label: 'Series 1' },
                  { data: [51, 6, 49, 30], label: 'Series 2' },
                ]}
                height={300}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 60, right: 10 }}
              />
            </CardContent>
          </Card>
        </Box>

        {/* Pie Chart */}
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Regional Distribution
              </Typography>
              <PieChart
                series={[
                  {
                    data: pieChartData,
                    cx: 100,
                    cy: 100,
                  },
                ]}
                width={300}
                height={300}
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              />
            </CardContent>
          </Card>
        </Box>
      </Stack>

      {/* Line Chart */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sales & Revenue Trend
          </Typography>
          <LineChart
            series={[
              { data: lineChartData.map((d) => d.sales), label: 'Sales' },
              { data: lineChartData.map((d) => d.revenue), label: 'Revenue' },
            ]}
            xAxis={[{ data: lineChartData.map((d) => d.month), scaleType: 'point' }]}
            height={350}
            margin={{ top: 10, bottom: 30, left: 60, right: 10 }}
          />
        </CardContent>
      </Card>

      {/* Gauge Charts */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Performance Metric
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Gauge value={75} startAngle={-90} endAngle={90} width={200} height={200} />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Target Achievement
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Gauge value={60} startAngle={-90} endAngle={90} width={200} height={200} />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Success Rate
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Gauge value={85} startAngle={-90} endAngle={90} width={200} height={200} />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default ReportsPage;
