import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { Chart, useChart } from 'src/components/chart';
import { fNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    series: { label: string; value: number }[];
  };
};

export function AnalyticsEarningsBreakdown({ title, subheader, chart, ...other }: Props) {
  const chartOptions = useChart({
    chart: {
      type: 'donut',
    },
    labels: chart.series.map((i) => i.label),
    legend: {
      position: 'left',
      offsetY: 80,
    },
    colors: ['#2196F3', '#FFC107', '#4CAF50', '#F44336'],
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      pie: {
        customScale: 1.05,
        donut: {
          size: '85%',
        },
        offsetY: 20,
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box
        sx={{
          my: 5,
          display: 'grid',
          rowGap: 2,
          columnGap: 2,
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
        }}
      >
        <Chart
          type="donut"
          series={chart.series.map((i) => i.value)}
          options={chartOptions}
          height={300}
        />

        <Box sx={{ p: 3 }}>
          {chart.series.map((item) => (
            <Box
              key={item.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">{item.label}</Typography>
              </Box>

              <Typography variant="subtitle2">${fNumber(item.value)}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
