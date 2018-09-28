import { EVENT_DATA } from '../types/data_type.js';

// capture data
export function captureData(data){
  return{
    type: 'EVENT_CAPTURE_DATA',
    data
  }
}

// update weight method
export function updateWeight(id, index, weight){
  return{
    type: 'UPDATE_WEIGHT_DATA',
    id,
    index,
    weight
  }
}

// redirect active item
export function getActiveItem(id){
  return{
    type: 'GET_ACTIVE_ITEM',
    id
  }
}
