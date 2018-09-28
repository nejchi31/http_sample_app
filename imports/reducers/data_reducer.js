import { EVENT_DATA } from '../types/data_type.js';
const initState = {
 event_data: [],
 current_item: []
}
export default function dataReducer(state = initState, action){
  switch(action.type) {
   case "EVENT_CAPTURE_DATA" :
      return {...state, event_data: action.data}
   case "UPDATE_WEIGHT_DATA" :
    // checking if index and id match
    if(state.event_data[action.index].id==action.id){
      var newObj = state.event_data;
      //updating weight if PUT method successful
      newObj[action.index].weight = action.weight;
      }
    else{
      return state;
    }
    return Object.assign({}, state, {
           event_data: newObj
       })
   case "GET_ACTIVE_ITEM" :
     for (var i=0; i < state.event_data.length; i++){
       if (state.event_data[i]['id'] == action.id){
         return Object.assign({}, state, {
                current_item: state.event_data[i]
            })
       }
     }
   default :
      return state
   }
}
