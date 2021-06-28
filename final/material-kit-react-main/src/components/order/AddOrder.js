/* eslint-disable import/no-cycle */
import { Helmet } from 'react-helmet';
import AddOrderDetails from 'src/components/order/AddOrderDetails';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';

const AddOrder = () => (
  <>
    <Helmet>
      <title>AddOrder | Material Kit</title>
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
            <AddOrderDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default AddOrder;
