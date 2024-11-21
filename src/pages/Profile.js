import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Avatar,
  Alert,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { updateProfile } from '../services/api';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  nickname: Yup.string(),
  phone: Yup.string(),
});

const Profile = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from Directus
    const fetchUserData = async () => {
      try {
        // Implement user data fetching logic here
        // const response = await getUserProfile();
        // setUserData(response.data);
      } catch (error) {
        setErrorMessage('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateProfile(userData.id, {
        first_name: values.firstName,
        last_name: values.lastName,
        nickname: values.nickname,
        phone: values.phone,
      });
      setSuccessMessage('Profile updated successfully');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to update profile');
      setSuccessMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 2 }}
              alt="Profile Picture"
              src={userData?.avatar_url}
            />
            <Typography component="h1" variant="h5">
              Profile Settings
            </Typography>
          </Box>

          {(successMessage || errorMessage) && (
            <Alert
              severity={successMessage ? 'success' : 'error'}
              sx={{ mb: 2 }}
            >
              {successMessage || errorMessage}
            </Alert>
          )}

          <Formik
            initialValues={{
              firstName: userData?.first_name || '',
              lastName: userData?.last_name || '',
              nickname: userData?.nickname || '',
              phone: userData?.phone || '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="nickname"
                      label="Nickname"
                      value={values.nickname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.nickname && Boolean(errors.nickname)}
                      helperText={touched.nickname && errors.nickname}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Save Changes
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
