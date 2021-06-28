/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { OrderContext } from 'src/App';
import {
  Box,
  Button,
  CardContent,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  TablePagination,
  TableRow,
  Typography,
  SvgIcon,
  InputAdornment,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router';

const OrderListResults = () => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [orders, setOrder] = useState(useContext(OrderContext));
  const Navigate = useNavigate();

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = orders.map((product) => product.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedProductIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProductIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedProductIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedProductIds.slice(1));
    } else if (selectedIndex === selectedProductIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedProductIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedProductIds.slice(0, selectedIndex),
        selectedProductIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };
  const delProd = () => {
    for (let i = 0; i < selectedProductIds.length; i++) {
      const step = selectedProductIds[i];
      for (let j = 0; j < orders.length; j++) {
        if (orders[j].id === step) {
          orders.splice(j, 1);
        }
      }
    }
    setSelectedProductIds([]);
  };
  const addProd = () => {
    localStorage.setItem('addseq', orders.length + 1);
    Navigate('/app/add_order');
  };

  const [values, setValues] = useState({
    serch: '',
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  // eslint-disable-next-line arrow-body-style
  const orders2 = orders.filter((order) => {
    if (values.serch !== '') {
      if (order.id.indexOf(values.serch) !== -1 || order.EmpId.indexOf(values.serch) !== -1 || order.CustId.indexOf(values.serch) !== -1 || order.OrderDate.indexOf(values.serch) !== -1) {
        console.log(values.serch);
        return order;
      }
    } else {
      return order;
    }
  });

  useEffect(() => {
    if (localStorage.getItem('addOrderid') !== 'null') {
      orders.push({ seq: localStorage.getItem('addseq'), id: localStorage.getItem('addOrderid'), EmpId: localStorage.getItem('addEmpId'), CustId: localStorage.getItem('addCustId'), OrderDate: localStorage.getItem('addOrderDate') });
      localStorage.setItem('addseq', 'null');
      localStorage.setItem('addOrderid', 'null');
      localStorage.setItem('addEmpId', 'null');
      localStorage.setItem('addCustId', 'null');
      localStorage.setItem('addOrderDate', 'null');
    }
  }, []);
  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <TextField
          name="serch"
          onChange={handleChange}
          value={values.serch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          placeholder="Search order"
          variant="outlined"
        />
        <Button onClick={addProd}>Add</Button>
        <Button onClick={delProd}>Del</Button>
        <Button>Change</Button>
      </Box>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedProductIds.length === orders.length}
                    color="primary"
                    indeterminate={
                      selectedProductIds.length > 0
                      && selectedProductIds.length < orders.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  序號
                </TableCell>
                <TableCell>
                  訂單編號
                </TableCell>
                <TableCell>
                  員工代號
                </TableCell>
                <TableCell>
                  客戶代號
                </TableCell>
                <TableCell>
                  訂單日期
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders2.slice(0, limit).map((order) => (
                <TableRow
                  hover
                  key={order.id}
                  selected={selectedProductIds.indexOf(order.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProductIds.indexOf(order.id) !== -1}
                      onChange={(event) => handleSelectOne(event, order.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {order.seq}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {order.id}
                  </TableCell>
                  <TableCell>
                    {order.EmpId}
                  </TableCell>
                  <TableCell>
                    {order.CustId}
                  </TableCell>
                  <TableCell>
                    {order.OrderDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={orders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25, 1000]}
      />
    </Card>
  );
};

export default OrderListResults;
