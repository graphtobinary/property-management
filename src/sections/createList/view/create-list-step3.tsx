/* eslint-disable react/no-unescaped-entities */
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';

const guestOptions = [
  {
    id: 1,
    name: '1-2 guests',
    description: 'Suitable for small groups or couples',
  },
  {
    id: 2,
    name: '3-4 guests',
    description: 'Ideal for families or small groups',
  },
  {
    id: 3,
    name: '5+ guests',
    description: 'Perfect for larger groups or families',
  },
];

export function CreateListStep3({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [selectedGuestOption, setSelectedGuestOption] = useState<number | null>(null);

  const handleGuestOptionClick = (id: number) => {
    setSelectedGuestOption(id);
  };

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Step 3
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 0 }}>
        Tell us about your place
      </Typography>
      <Typography variant="body2" sx={{ mb: 5 }}>
        In this step, we'll ask you how many guests can stay at your place.
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        How many guests can stay at your place?
      </Typography>

      <Grid container spacing={3}>
        {guestOptions.map((option) => (
          <Grid
            key={option.id}
            xs={12}
            onClick={() => handleGuestOptionClick(option.id)}
            sx={{
              border: selectedGuestOption === option.id ? '2px solid blue' : '1px solid gray',
              borderRadius: '8px',
              padding: '16px',
              cursor: 'pointer',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: '60px',
                height: '60px',
                backgroundColor: 'gray',
                borderRadius: '8px',
                mr: 2,
              }}
            />
            <Box>
              <Typography variant="body1">{option.name}</Typography>
              <Typography variant="body2">{option.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedGuestOption}
          onClick={onNext}
        >
          Next
        </Button>
      </Box>
    </DashboardContent>
  );
}
