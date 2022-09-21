import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from "copy-to-clipboard";
import { Component } from 'react';
import { Divider, Grid, InputAdornment, OutlinedInput, Tooltip, Menu, MenuItem, Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Delete, Visibility, VisibilityOff } from '@mui/icons-material';

export default class AccountCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      website: this.props.website,
      id: this.props.id,
      username: this.props.username,
      password: this.props.password,
      email: this.props.email,
      visibility: false,
      anchorEl: null,
      open: Boolean(this.anchorEl),
      copyText: this.props.username + "\n" + this.props.password,
    };

    this.updateState = this.updateState.bind(this)
  }

  handleClick = (event) => {
    this.setState({...this, anchorEl: event.currentTarget, open: Boolean(event.currentTarget)});
  };

  handleClose = () => {
    this.setState({...this, anchorEl: null, open: Boolean(null)});
  };

  updateState(){
    this.setState({
      ...this,
      visibility : !this.state.visibility
    })
  }

  handleDeleteAccount = () => {
    this.props.deleteAccount(this.state.id);
  }

  copyToClipboard = () => {
    copy(this.state.copyText);
 }

  render() {
    return (
      <Grid item xs="auto">
        <Card sx={{ maxWidth: 250, minWidth: 250 }}>
          <CardHeader
            avatar={
                <img height="16" width="16" src={'http://www.google.com/s2/favicons?domain=' + this.props.web} />
            }
            title={this.state.name}
            subheader={this.state.website}
          />
          <CardContent>
            <Divider/>
            <TextField
              id={'username' + this.state.id.toString()}
              size="small"
              type="text"
              value={this.state.username}
              variant="outlined"
              inputProps={{
                readOnly: true,
              }}
            />
            <OutlinedInput
              id={'password' + this.state.id.toString()}
              size="small"
              type={this.state.visibility ? "text" : "password"}
              value={this.props.password}
              variant="outlined"
              inputProps={{
                readOnly: true,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.updateState}
                    edge="end"
                  >
                    {this.state.visibility ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <TextField
              id={'email' + this.state.id.toString()}
              size="small"
              type="text"
              label="Email"
              value={this.state.email}
              variant="outlined"
              inputProps={{
                readOnly: true,
              }}
              sx={{mt:3}}
            />
          </CardContent>
          <CardActions disableSpacing>
            <Tooltip title="copy">
              <IconButton aria-label="copyAccount" onClick={this.copyToClipboard}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="delete">
              <IconButton aria-label="deleteAccount" onClick={this.handleDeleteAccount}>
                <Delete/>
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}
