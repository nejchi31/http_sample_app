import React, { Component } from 'react';
import {render} from 'react-dom';
import InputPreview from './input.js';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getJSON, putUpdate, sortByWeight} from '../lib/usable_functions.js';
import * as theme from '../config/theme.js';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    maxWidth: '100%',
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
    background:'linear-gradient(to right, #d8d8d8 0%,#ffffff 48%)',
  },
  image: {
    width: 'auto',
    height: 'auto',
  },
  img: {
    borderRadius: '25px',
    margin: 'auto',
    display: 'block',
    maxWidth: 128,
    maxHeight: 168,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
    minHeight: 8,
    maxHeight: 32,
    minWidth: 16,
  },
  indxElevation2: {
    boxShadow:'none',
  },
  divider: {
    marginTop: 2,
    marginBottom: 2,
  }
});


class About extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      item: null,
    }
    //loading data from selected item
    this.props.getActiveItem(this.props.match.params.id)
  }



 render () {
   console.log(this.props)
   const { classes } = this.props;

    if(this.props.data.current_item.length==0){
  			return <CircularProgress className={classes.progress} size={50} />;
  		} else {
       return (
          <MuiThemeProvider theme={theme.theme}>
            <Paper className={classes.root} key={"item" + "paper"}>
              <Grid container direction="row" spacing={0}>
                <Grid container container  spacing={0}>
                  <Grid item xs={6} sm={6}>
                    <Typography gutterBottom variant="subheading">
                      {this.props.data.current_item.title}
                    </Typography>
                    <Typography gutterBottom>{this.props.data.current_item.start}</Typography>
                    <Typography color="textSecondary">{this.props.data.current_item.location}</Typography>
                    <Divider classes={{root: classes.divider}} />
                    <Typography color="textSecondary">{this.props.data.current_item.short_description}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} style={{marginTop: 'auto', marginBottom: 'auto'}}>
                      <Paper classes={{root: classes.image, elevation2: classes.indxElevation2}}>
                        <img className={classes.img} alt="complex" src={this.props.data.current_item.thumb} />
                      </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </MuiThemeProvider>
        )
      }
  }
}

export default withStyles(styles)(About);
