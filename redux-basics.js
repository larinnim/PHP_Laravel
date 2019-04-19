const redux = require ('redux');
const createStore = redux.createStore;
const initialState = {};

//Reducer
// const rootReducer = (state = initialState, action) => {
//     if(action.type == 'IS_AUTH'){
//         return 
//             ...state,

//     }
//     return state;
// };

//Store
const store = createStore(rootReducer);
console.log(store.getState());

//Dispatching Action
store.dispatch({type: 'IS_AUTH', value: false}); //ALL UPPER CASE AND SHORT

//Action

//Subscription

