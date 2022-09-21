import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import { Container, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack, Typography } from '@mui/material';
import { Close, Done, Save, Visibility, VisibilityOff } from '@mui/icons-material';
import Axios from "axios";
import ModeIcon from '@mui/icons-material/Mode';

export default function FormAddCard(props) {
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    web: "",
    mail: "",
    user: "",
    password: "",
    name: "Add New Account",
    changedName: "",
  });

  const [flags, setFlags] = React.useState({
    showPassword: false,
    editNameField: false,
    isValid: true,
    isEmptyMail: false,
    isEmptyUsername: false,
    isEmptyPassword: false,
    isEmptyWeb: false,
  });

  const clearValues = () => {
    setValues({
      id: "",
      web: "",
      mail: "",
      user: "",
      password: "",
      name: "Add New Account",
      changedName: ""
    })
  };

  const handleClickOpen = () => {
    setOpen(true);
    clearValues()
    values.name = "Add New Account";
  };

  const handleClose = () => {
    setOpen(false);
    clearValues()
    setFlags({...flags, isValid: true})
  };

  const CheckAccount = () => {
    var isValid = true;
    var isEmptyMail = false;
    var isEmptyWeb = false;
    var isEmptyUsername = false;
    var isEmptyPassword = false;
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(values.mail.length === 0){
      isValid = false;
      isEmptyMail = true;
    };
    if(values.web.length === 0){
      isValid = false;
      isEmptyWeb = true;
    };
    if(values.user.length === 0){
      isValid = false;
      isEmptyUsername = true
    };
    if(values.password.length === 0){
      isValid = false;
      isEmptyPassword = true
    }
    if(!values.mail.match(regex)){
      isValid = false;
      isEmptyMail = true;
    }
    setFlags({
      ...flags,
      isValid: isValid,
      isEmptyWeb: isEmptyWeb,
      isEmptyMail: isEmptyMail,
      isEmptyPassword: isEmptyPassword,
      isEmptyUsername: isEmptyUsername})
    return isValid
  }

  const addPassword = () => {
    const isValid = CheckAccount();
    if(isValid){
      Axios.post('http://localhost:5000/addpassword', {name: values.name, web: values.web, mail:values.mail, user: values.user, password: values.password, id: props.user});
    setOpen(false);
    flags.editNameField = false;
    clearValues()
    setTimeout(() => {
      handleAddCard()
    }, 10);
    }
  };

  const resetMailField = () => {
    setFlags({...flags, isEmptyMail: false});
  };

  const resetUsernameField = () => {
    setFlags({...flags, isEmptyUsername: false});
  };

  const resetPasswordField = () => {
    setFlags({...flags, isEmptyPassword: false});
  };

  const resetWebField = () => {
    setFlags({...flags, isEmptyWeb: false});
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeMail = (event) => {
    setValues({ ...values, mail: event.target.value, user: event.target.value});
  };

  const handleClickShowPassword = () => {
    setFlags({
      ...values,
      showPassword: !flags.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickEditName = () => {
    setFlags({
      ...flags,
      editNameField: !flags.editNameField,
    });
  };

  const handleDoneEditName = () => {
    setFlags({
      ...flags,
      editNameField: !flags.editNameField,
    });
    values.name = values.changedName;
  };

  const handleCloseEditName = () => {
    setFlags({
      ...flags,
      editNameField: !flags.editNameField,
    });
  };

  const handleSelect = () => {
    let domain = "";
    domain = values.web.replace(/.+\/\/|www.|\..+/g, '');
    setValues({...values, name: domain});
  }

  const handleAddCard = () => {
    props.handleClickSave();
  }

  return (
    <>
      <SpeedDial
            ariaLabel='formaddcard'
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
        >
        <SpeedDialAction
        key={'add'}
        icon={<AddIcon/>}
        tooltipTitle={'add'}
        onClick={handleClickOpen}
        />
      </SpeedDial>
      <Dialog open={open} onClose={handleClose} fullWidth>
      {!flags.editNameField ? (<Stack direction="row" alignItems="center" justifyContent="flex-start">
          <DialogTitle> {values.name} </DialogTitle>
          <IconButton size='small' onClick={handleClickEditName}>
            <ModeIcon/>
          </IconButton>
        </Stack>) : (<Stack direction="row" alignItems="center" justifyContent="flex-start">
          <TextField
            sx={{ml:2, mt:2, mb:2}}
            placeholder="Name"
            defaultValue={values.name}
            size='small'
            autoFocus
            id="name"
            type="text"
            variant='standard'
            onChange={handleChange('changedName')}
          />
          <IconButton onClick={handleDoneEditName}>
            <Done/>
          </IconButton>
          <IconButton onClick={handleCloseEditName}>
            <Close/>
          </IconButton>
        </Stack>)}
        <Divider/>
        <DialogContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography noWrap sx={{width: '200px'}}>
              Website address
            </Typography>
            <TextField
              id="website"
              placeholder="Ex: www.site.com"
              type="url"
              fullWidth
              autoFocus
              error = {flags.isEmptyWeb}
              variant="standard"
              onChange={handleChange('web')}
              onBlur={handleSelect}
              onFocus={resetWebField}
            />
          </Stack>
          <Container sx={{mt: 4}}>
            <Typography>Account</Typography>
            <TextField
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              error = {flags.isEmptyMail}
              variant="standard"
              margin="dense"
              onChange={handleChangeMail}
              onFocus={resetMailField}
            />
            <TextField
              id="username"
              label="Username"
              type="text"
              value={values.user}
              fullWidth
              error = {flags.isEmptyUsername}
              variant="standard"
              margin="dense"
              onChange={handleChange('user')}
              onFocus={resetUsernameField}
            />
            <FormControl variant="standard" fullWidth margin="dense" onFocus={resetPasswordField} error = {flags.isEmptyPassword}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={flags.showPassword ? 'text' : 'password'}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="passwordVisibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {flags.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Container>

        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={addPassword}> <Save/> Save</Button>
          <Button size="large" color="error" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}