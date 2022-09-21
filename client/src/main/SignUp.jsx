import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Axios from "axios";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

export default function signUpForm() {
    const navigate = useNavigate()

    const resetMail = () => {
        setFlags({...flags, mailExist: false})
    }

    const resetPW = () => {
        setFlags({...flags, wrongPassword: false})
    }

    const [flags, setFlags] = React.useState({
        mailExist: false,
        wrongPassword: false
    });

    const handleSubmit = (event) => {
        let finalResult = 0
        let responseLength = 0
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const repeatPassword = data.get('repeatPassword');
        const name = data.get('name');
        const surname = data.get('surname');
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email.match(regex)) {
            Axios.get('http://localhost:5000/checksignup', { params: {email: email}} )
            .then(response => {
                responseLength = response.data.length
                console.log(responseLength)
                })
            setTimeout(() => {
                if (responseLength > 0) {
                    setFlags({...flags, mailExist: true})
                    finalResult = 1
                }
                if (password != repeatPassword){
                    setFlags({...flags, wrongPassword: true})
                    finalResult = 1
                } 
                if (finalResult === 0) {
                    Axios
                    .post('http://localhost:5000/signup', {email: email, password: password, name: name, surname: surname})
                    .then(response => {
                        if(response.data === "OK") {
                            navigate('/', {replace: true})
                        }
                    })
                }
            }, 50);
        } else setFlags({...flags, mailExist: true})
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
    
    return (
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
                    <Typography component="h1" variant="h5"> Sign up </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '60%'}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            error = {flags.mailExist}
                            onFocus= {resetMail}
                            label="Email Address"
                            autoFocus
                            size='small'
                        />
                        <FormControl required onFocus= {resetPW} error = {flags.wrongPassword} fullWidth margin="normal" variant="outlined">
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
                        <FormControl required onFocus= {resetPW} error = {flags.wrongPassword} fullWidth margin="normal" variant="outlined">
                            <InputLabel size="small" htmlFor="password"> Password Repeat</InputLabel>
                            <OutlinedInput
                            id="repeatPassword"
                            name="repeatPassword"
                            size='small'
                            label="Password Repeat"
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
                        <Stack direction="row" justifyContent="space-between">
                            <TextField
                                margin="normal"
                                required
                                label="Name"
                                type="text"
                                id="name"
                                name="name"
                                size='small'
                                variant='standard'
                                sx={{width: "47%"}}
                            />
                            <TextField
                                margin="normal"
                                required
                                label="Surname"
                                type="text"
                                id="surname"
                                name="surname"
                                size='small'
                                variant='standard'
                                sx={{width: "47%"}}
                            />
                        </Stack>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                            <Link onClick={() => {navigate('/')}} component="button" variant="body2">
                                {"Already registered? Sign In"}
                            </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}