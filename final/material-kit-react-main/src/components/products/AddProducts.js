/* eslint-disable import/no-cycle */
import { Helmet } from 'react-helmet';
import AddProductDetails from 'src/components/products/AddProductDetails';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';

const AddProducts = () => (
  <>
    <Helmet>
      <title>AddProducts | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AddProductDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default AddProducts;
