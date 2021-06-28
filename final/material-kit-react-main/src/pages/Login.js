/* eslint-disable no-unused-vars */
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from 'src/App';

function Login() {
  const [users, setUsers] = useState(useContext(ThemeContext));
  const navigate = useNavigate();
  const [flag, setFlag] = useState(true);
  localStorage.getItem('step1');
  localStorage.setItem('isLog', null);
  const canLog = () => {
    navigate('/app/dashboard', { replace: true });
  };
  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              account: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              account: Yup.string()
                .max(255)
                .required('account is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={() => canLog()}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={() => {
                        localStorage.setItem('who', values.account);
                        localStorage.setItem('step1', values.password);
                      }}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={() => {
                        localStorage.setItem('who', values.account);
                        localStorage.setItem('step1', values.password);
                      }}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="account"
                  margin="normal"
                  name="account"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.account}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      localStorage.setItem('who', values.account);
                      localStorage.setItem('step1', values.password);
                    }}
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
}

export default Login;
