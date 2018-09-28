import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as setting_action from '../actions/setting_action.js';
import About from './about.js';

function mapStateToProps(state){
  return{
    data: state.dataReducer,
  }
}

function mapDispachToProps(dispatch){
  return bindActionCreators(setting_action, dispatch);
}

const InterAbout = connect(mapStateToProps, mapDispachToProps)(About);

export default InterAbout;
