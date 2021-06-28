/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ProductListResults from 'src/components/products/ProductListResults';

function ProductsList() {
  return (
    <>
      <Helmet>
        <title>Products | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <ProductListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ProductsList;
