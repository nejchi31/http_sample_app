import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as setting_action from '../actions/setting_action.js';
import Index from './index.js';

function mapStateToProps(state){
  console.log(state)
  return{
    data: state.dataReducer,
  }
}

function mapDispachToProps(dispatch){
  return bindActionCreators(setting_action, dispatch);
}

const InterIndex = connect(mapStateToProps, mapDispachToProps)(Index);

export default InterIndex;
