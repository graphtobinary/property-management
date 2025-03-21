/* eslint-disable react/no-unescaped-entities */
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';
import { _products } from 'src/_mock';
import { PropertyItem } from '../property-item';

export function CreateListStep1({ onNext }: { onNext: () => void }) {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);

  const handlePropertyTypeClick = (type: string) => {
    setSelectedPropertyType(type);
  };

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Step 1
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 0 }}>
        Tell us about your place
      </Typography>
      <Typography variant="body2" sx={{ mb: 5 }}>
        In this step, we'll ask you which type of property you have and if guests will book the
        entire place or just a room. Then let us know the location and how many guests can stay.
      </Typography>

      <Grid container spacing={3}>
        {_products.map((product) => (
          <Grid
            key={product.id}
            xs={12}
            sm={6}
            md={3}
            border={selectedPropertyType === product.name ? '2px solid blue' : 0}
            onClick={() => handlePropertyTypeClick(product.name)}
          >
            <PropertyItem product={product} />
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" disabled>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedPropertyType}
          onClick={onNext}
        >
          Next
        </Button>
      </Box>
    </DashboardContent>
  );
}
