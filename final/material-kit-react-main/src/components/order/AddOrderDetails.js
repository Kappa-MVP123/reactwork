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

const AddOrderDetails = (props) => {
  const [values, setValues] = useState({
    seq: localStorage.getItem('addseq'),
    Orderid: '',
    EmpId: '',
    CustId: '',
    OrderDate: '',
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
    localStorage.setItem('addseq', values.seq);
    localStorage.setItem('addOrderid', values.Orderid);
    localStorage.setItem('addEmpId', values.EmpId);
    localStorage.setItem('addCustId', values.CustId);
    localStorage.setItem('addOrderDate', values.OrderDate);
    Navigate('/app/order');
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          title="AddOrder"
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
                label="序號"
                required
                value={values.seq}
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
                label="訂單編號"
                name="Orderid"
                onChange={handleChange}
                required
                value={values.Orderid}
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
                label="員工代號"
                name="EmpId"
                onChange={handleChange}
                required
                value={values.EmpId}
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
                label="客戶代號"
                name="CustId"
                onChange={handleChange}
                value={values.CustId}
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
                name="OrderDate"
                type="Date"
                onChange={handleChange}
                value={values.OrderDate}
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
            Add order
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AddOrderDetails;
