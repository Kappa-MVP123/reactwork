import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import OrderList from 'src/pages/OrderList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductsList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import AddProducts from './components/products/AddProducts';
import AddOrder from './components/order/AddOrder';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'order', element: <OrderList /> },
      { path: 'add_order', element: <AddOrder /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'add_pro', element: <AddProducts /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
