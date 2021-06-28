/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
// eslint-disable-next-line import/no-cycle
import { ThemeContext } from 'src/App';
import NavItem from 'src/components/NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/products',
    icon: UsersIcon,
    title: 'Products'
  },
  {
    href: '/app/order',
    icon: ShoppingBagIcon,
    title: 'Order'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [AUsers, setAUsers] = useState(useContext(ThemeContext));
  const [id, setID] = useState(localStorage.getItem('who'));
  const navigate = useNavigate();
  // eslint-disable-next-line object-curly-newline
  const [nowUser, setNowUsers] = useState({ id: '00001', user_name: '丁組長', DeptID: 'F01', JobTitle: '助理工程師' });
  useEffect(() => {
    for (let i = 0; i < AUsers.length; i++) {
      if (AUsers[i].id === localStorage.getItem('who')) {
        if (AUsers[i].user_phone === localStorage.getItem('step1')) {
          localStorage.setItem('isLog', '2');
          break;
        }
      }
    }
    if (localStorage.getItem('isLog') === '2') {
      for (let i = 0; i < AUsers.length; i++) {
        if (AUsers[i].id === id) {
          setNowUsers(AUsers[i]);
          break;
        }
      }
      if (openMobile && onMobileClose) {
        onMobileClose();
      }
    } else {
      navigate('/Login');
    }
  }, [location.pathname]);
  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    id: nowUser.id,
    name: nowUser.user_name,
    DeptID: nowUser.DeptID,
    jobTitle: nowUser.JobTitle,
  };

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.id + user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.DeptID + user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Need more?
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Upgrade to PRO version and access 20 more screens
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            See PRO version
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
