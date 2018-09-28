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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FastForward from '@material-ui/icons/FastForward';
import ExposurePlus1 from '@material-ui/icons/ExposurePlus1';
import ExposureNeg1 from '@material-ui/icons/ExposureNeg1';
import Forward from '@material-ui/icons/Forward';


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    paddingBottom: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    background: 'linear-gradient(to right, #ffffff 52%,#d8d8d8 100%)',
  },
  image: {
    width: 'auto',
    height: 'auto',
  },
  img: {
    borderRadius: '25px',
    margin: 'auto',
    display: 'block',
    maxWidth: 64,
    maxHeight: 64,
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
  iconff: {
    transform:'rotate(90deg)',
  },
});


class Index extends Component {
  //construction method + calling event_data handler
  constructor(props){
    super(props);
    this.state = {
      priority: "",
      alertopen: false,
    }
    this._eventDataContructor();
  }

  //event_data handler using http GET method and storing return data to store + sorting by weight
  _eventDataContructor(){
    self = this;
    getJSON('http://api.vx1.ekranj.si/v5/sources/14d1aad8-49a9-44eb-aba3-94feb70e184d/elements',
      function(err, data) {
        if (err !== null) {
          alert('Something went wrong: ' + err);
        } else {
          //sorting by weight
          data = sortByWeight(data)
        }
      //storing event data to store
      self.props.captureData(data);
      });
  }

  //get element_id input value, use it in putUpdate method and clear
  activateUpdateHandler(item_id, inx, type){
    //implement
    if(type=="input"){
      try {
        var id = "priority_" + inx;
        var weight = document.getElementById(id).value;
        {weight==""? this.setState({ alertopen: true }) : putUpdate(item_id, inx, Number(weight), this.props.updateWeight, this)}
        document.getElementById(id).value="";
      }
      catch(error) {
        //not number value
        this.setState({ alertopen: true });
      }
    }
    else if(type=="increase"){
      putUpdate(item_id, inx, this.props.data.event_data[inx].weight + 1, this.props.updateWeight, this);
    }
    else if(type=="decrease"){
      putUpdate(item_id, inx, this.props.data.event_data[inx].weight - 1, this.props.updateWeight, this);
    }
    else if(type=="top"){
      putUpdate(item_id, inx, this.props.data.event_data[0].weight + 1, this.props.updateWeight, this);
    }
    else if(type=="bottom"){
      var len = this.props.data.event_data.length-1;
      var newWeight = this.props.data.event_data[len].weight==0? 0 : this.props.data.event_data[len].weight - 1
      putUpdate(item_id, inx, newWeight, this.props.updateWeight, this);
    }
  }




  //GUI elements
  render () {
   const { classes } = this.props;

   if(this.props.data.event_data.length==0){
			return <CircularProgress className={classes.progress} size={50} />;
		} else {
     return (
        <MuiThemeProvider theme={theme.theme}>
         {this.props.data.event_data.map((item, index) =>
            <Paper className={classes.root} key={item + index + "paper"}>
              <Grid container spacing={16} style={{height: '10vh'}}>
                <Grid item xs={4} sm={4} style={{marginTop: 'auto', marginBottom: 'auto'}}>
                  <Link to={"/dogodki/" + item.id} style={{textDecoration: "none"}}>
                    <Paper classes={{root: classes.image, elevation2: classes.indxElevation2}}>
                      <img className={classes.img} alt="complex" src={item.thumb} />
                    </Paper>
                  </Link>
                </Grid>
                <Grid item xs={8} sm={4} container>
                  <Grid item xs container direction="column" spacing={16}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subheading">
                        {item.title}
                      </Typography>
                      <Typography gutterBottom>{item.start}</Typography>
                      <Typography color="textSecondary">{item.location}</Typography>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <InputLabel shrink htmlFor="priority">Vnesi prioriteto</InputLabel>
                        <Input
                            id={"priority_" + index}
                            onChange={(event)=>{this.setState({priority: event.target.value})}}
                          />
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                          <Button variant="contained" color="primary" className={classes.button} onClick={this.activateUpdateHandler.bind(this, item.id, index, "input")}>
                              Potrdi
                          </Button>
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.activateUpdateHandler.bind(this, item.id, index, "increase")}>
                              <ExposurePlus1 />
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.activateUpdateHandler.bind(this, item.id, index, "decrease")}>
                              <ExposureNeg1 />
                            </Button>
                          </div>
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.activateUpdateHandler.bind(this, item.id, index, "top")}>
                              <FastForward className={classes.iconff} style={{transform: 'rotate(270deg)'}} />
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.activateUpdateHandler.bind(this, item.id, index, "bottom")}>
                              <FastForward className={classes.iconff} />
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="title">Prioriteta: {item.weight}</Typography>
                  </Grid>
                  <Grid item>
                    <Forward />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          )}
          <Dialog
            open={this.state.alertopen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Napaka"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Prosim ponovno vnesite pomembnost prioritete v obliki števila. Hvala za razumevanje.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={()=>{this.setState({ alertopen: false })}} color="primary">
                V redu
              </Button>
            </DialogActions>
          </Dialog>
      </MuiThemeProvider>
     )
   }
 }
}

export default withStyles(styles)(Index);
