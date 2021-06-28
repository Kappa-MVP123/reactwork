/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable object-curly-newline */
/* eslint-disable dot-notation */
/* eslint-disable quotes */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ProContext } from 'src/App';
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
  InputAdornment
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const ProductListResults = () => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState(useContext(ProContext));
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = products.map((product) => product.id);
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
    setPage(newPage);
  };
  const delProd = () => {
    console.log(products.length);
    for (let i = 0; i < selectedProductIds.length; i++) {
      const step = selectedProductIds[i];
      for (let j = 0; j < products.length; j++) {
        if (products[j].id === step) {
          products.splice(j, 1);
        }
      }
    }
    setProducts(products);
    setSelectedProductIds([]);
  };
  const addProd = () => {
    navigate('/app/add_pro');
  };
  useEffect(() => {
    if (localStorage.getItem('addName') !== 'null') {
      products.push({ prod_name: localStorage.getItem('addName'), id: localStorage.getItem('addID'), prod_price: localStorage.getItem('addPrice'), Cost: localStorage.getItem('addCost') });
      localStorage.setItem('addName', 'null');
      localStorage.setItem('addId', 'null');
      localStorage.setItem('addPrice', 'null');
      localStorage.setItem('addCost', 'null');
    }
  }, []);
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
  const product2 = products.filter((product) => {
    if (values.serch !== '') {
      if (product.prod_name.indexOf(values.serch) !== -1 || product.id.indexOf(values.serch) !== -1) {
        console.log(values.serch);
        return product;
      }
    } else {
      return product;
    }
  });
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
          placeholder="Search product"
          variant="outlined"
        />
        <Button onClick={() => { addProd(); }}>add</Button>
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
                    checked={selectedProductIds.length === products.length}
                    color="primary"
                    indeterminate={
                      selectedProductIds.length > 0
                      && selectedProductIds.length < products.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  產品名稱
                </TableCell>
                <TableCell>
                  產品名稱ID
                </TableCell>
                <TableCell>
                  價格
                </TableCell>
                <TableCell>
                  成本
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product2.slice(0, limit).map((product) => (
                <TableRow
                  hover
                  key={product.id}
                  selected={selectedProductIds.indexOf(product.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProductIds.indexOf(product.id) !== -1}
                      onChange={(event) => handleSelectOne(event, product.id)}
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
                        {product.prod_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {product.id}
                  </TableCell>
                  <TableCell>
                    {product.prod_price}
                  </TableCell>
                  <TableCell>
                    {product.Cost}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={products.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default ProductListResults;
