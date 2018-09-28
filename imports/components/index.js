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
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    background: 'linear-gradient(to right, #ffffff 52%,#d8d8d8 100%)',
  },
  image: {
    width: 'auto',
    height: 'auto',
  },
  img: {
    borderRadius: '15px',
    margin: 'auto',
    display: 'block',
    maxWidth: 48,
    maxHeight: 48,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  button: {
    margin: 2,
    minHeight: 4,
    minWidth: 6,
    maxWidth: 6,
  },
  indxElevation2: {
    boxShadow:'none',
  },
  iconff: {
    width: 8,
    height: 8,
    transform:'rotate(90deg)',
  },
  icon: {
    width: 8,
    height: 8,
  },
  inputLab: {
    fontSize: 8,
  },
  inputSetting: {
    height: 6,
    width: 32,
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
              <Grid container spacing={16} style={{height: '75px'}}  direction="row" >
                <Grid item xs={2} sm={3} style={{marginTop: 'auto', marginBottom: 'auto'}}>
                    <Paper classes={{root: classes.image, elevation2: classes.indxElevation2}}>
                      <img className={classes.img} alt="complex" src={item.thumb} />
                    </Paper>
                </Grid>
                <Grid item xs={10} sm={9} direction="row" container>
                  <Grid item xs container spacing={16}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subheading">
                        {item.title}
                      </Typography>
                      <Typography gutterBottom>{item.start}</Typography>
                      <Typography color="textSecondary">{item.location}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} sm={4} container>
                    <Grid item sm container direction="row" spacing={16}>
                        <FormControl style={{padding: '2px'}}>
                          <InputLabel classes={{root: classes.inputLab}} shrink htmlFor="priority">Vnesi prioriteto</InputLabel>
                          <Input
                              style={{height: '8px', padding: '0px'}}
                              fullWidth
                              id={"priority_" + index}
                              onChange={(event)=>{this.setState({priority: event.target.value})}}
                            />
                          <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Button variant="contained" color="primary" classes={{root: classes.button, label: classes.inputLab}} onClick={this.activateUpdateHandler.bind(this, item.id, index, "input")}>
                                Potrdi
                            </Button>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                              <Button variant="contained" color="primary" className={classes.button} onClick={this.activateUpdateHandler.bind(this, item.id, index, "increase")}>
                                <ExposurePlus1 className={classes.icon}  />
                              </Button>
                              <Button variant="contained" color="primary" className={classes.button} onClick={this.activateUpdateHandler.bind(this, item.id, index, "decrease")}>
                                <ExposureNeg1 className={classes.icon}  />
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
                  <Link to={"/dogodki/" + item.id} style={{textDecoration: "none"}}>
                    <Grid item>
                      <Forward className={classes.iconRedirect} style={{paddingTop: '20px', color: "black"}} />
                    </Grid>
                  </Link>
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
              <Button variant="contained" classes={{root: classes.button, label: classes.inputLab}} onClick={()=>{this.setState({ alertopen: false })}} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
      </MuiThemeProvider>
     )
   }
 }
}

export default withStyles(styles)(Index);
