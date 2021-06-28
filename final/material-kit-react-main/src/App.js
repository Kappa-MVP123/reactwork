/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

export const ThemeContext = React.createContext(null);
export const IDContext = React.createContext(null);
export const ProContext = React.createContext(null);
export const OrderContext = React.createContext(null);
export default function App() {
  const [SQLData, setSQLData] = useState([]);
  const [SQLData2, setSQLData2] = useState([]);
  const [order, setOrder] = useState([]);
  const id = localStorage.getItem('who');
  useEffect(() => {
    fetch('http://localhost/php-react/all-users.php')
      .then((response) => response.json())
      .then((data) => setSQLData(data.users));
    fetch('http://localhost/php-react/all-product.php')
      .then((response) => response.json())
      .then((data) => setSQLData2(data.products));
    fetch('http://localhost/php-react/all-order.php')
      .then((response) => response.json())
      .then((data) => setOrder(data.orders));
  }, []);
  const routing = useRoutes(routes);
  return (
    <OrderContext.Provider value={order}>
      <ProContext.Provider value={SQLData2}>
        <ThemeContext.Provider value={SQLData}>
          <IDContext.Provider value={id}>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              {routing}
            </ThemeProvider>
          </IDContext.Provider>
        </ThemeContext.Provider>
      </ProContext.Provider>
    </OrderContext.Provider>
  );
}
