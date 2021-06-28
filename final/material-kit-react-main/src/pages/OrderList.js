/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import OrderListResults from 'src/components/order/OrderListResults';

function OrderList() {
  return (
    <>
      <Helmet>
        <title>Order | Material Kit</title>
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
            <OrderListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default OrderList;
