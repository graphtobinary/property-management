/* eslint-disable react/no-unescaped-entities */
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';

const placeTypes = [
  {
    id: 1,
    name: 'An entire place',
    description: 'People will have the whole place to themselves',
  },
  {
    id: 2,
    name: 'A room',
    description: 'Guests will have their own room to themselves and access to shared places',
  },
  {
    id: 3,
    name: 'A shared room in your property',
    description:
      'Guests sleep in a shared room in a professionally managed hostel with staff on site 24/7',
  },
];

export function CreateListStep2({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [selectedPlaceType, setSelectedPlaceType] = useState<number | null>(null);

  const handlePlaceTypeClick = (id: number) => {
    setSelectedPlaceType(id);
  };

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Step 2
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 0 }}>
        Tell us about your place
      </Typography>
      <Typography variant="body2" sx={{ mb: 5 }}>
        In this step, we'll ask you which type of property you have and if guests will book the
        entire place or just a room. Then let us know the location and how many guests can stay.
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        What type of place will guests have?
      </Typography>

      <Grid container spacing={3}>
        {placeTypes.map((place) => (
          <Grid
            key={place.id}
            xs={12}
            onClick={() => handlePlaceTypeClick(place.id)}
            sx={{
              border: selectedPlaceType === place.id ? '2px solid blue' : '1px solid gray',
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
              <Typography variant="body1">{place.name}</Typography>
              <Typography variant="body2">{place.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" disabled={!selectedPlaceType} onClick={onNext}>
          Next
        </Button>
      </Box>
    </DashboardContent>
  );
}
