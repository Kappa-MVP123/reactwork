/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { useNavigate } from 'react-router';
import { ProContext } from 'src/App';

const AddProductDetails = (props) => {
  const [values, setValues] = useState({
    Name: '',
    ID: '',
    Price: '',
    Cost: '',
  });
  const Navigate = useNavigate();
  const [products, setProducts] = useState(useContext(ProContext));
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const onClick = () => {
    localStorage.setItem('addName', values.Name);
    localStorage.setItem('addID', values.ID);
    localStorage.setItem('addPrice', values.Price);
    localStorage.setItem('addCost', values.Cost);
    Navigate('/app/products');
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          title="AddProduct"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Product Name"
                label="Product Name"
                name="Name"
                onChange={handleChange}
                required
                value={values.Name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Product ID"
                name="ID"
                onChange={handleChange}
                required
                value={values.ID}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Price"
                name="Price"
                onChange={handleChange}
                type="number"
                required
                value={values.Price}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Cost"
                name="Cost"
                onChange={handleChange}
                type="number"
                value={values.Cost}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => { onClick(); }}
          >
            Add product
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AddProductDetails;
