import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Axios from "axios";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useAuth } from '../utils/auth';
import {useNavigate} from 'react-router-dom';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Cookies from 'js-cookie';

function Copyright(props) {
  const navigate = useNavigate()
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" component="button" onClick={() => {navigate('/')}}>
        Key Saver
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function signInForm() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [flags, setFlags] = React.useState({
    error: false,
    showPassword: false
  });

  const [checked, setChecked] = React.useState(true);

  const resetError = () => {
    setFlags({error: false})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    Axios.get('http://localhost:5000/checklogin', { params: { email: email, password: password }} )
    .then(response => {
      if (response.data === "Error") {
        setFlags({error: true})
      } else {
        const user = response.data
        auth.login(user)
        if(checked) Cookies.set('KeySaver', response.data, {expires: 7})
        navigate('/home', {replace: true})
      }
  })
  };

  const handleClickShowPassword = () => {
    setFlags({
      ...flags,
      showPassword: !flags.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh'}}>
        <Grid
          item
          
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('/download.jpeg')",
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6
        } square>
          <Box
            sx={{
                height: '85vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '60%'}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                error = {flags.error}
                onFocus= {resetError}
                autoFocus
                size='small'
              />
              <FormControl required onFocus={resetError} error={flags.error} fullWidth margin="normal" variant="outlined">
                <InputLabel size="small" htmlFor="password"> Password </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  size='small'
                  label="Password"
                  type={flags.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {flags.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link onClick={() => {navigate('/registration')}} component="button" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}