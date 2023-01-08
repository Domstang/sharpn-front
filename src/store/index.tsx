import { combineReducers } from 'redux'
import shortener from './modules/shortener';

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  short: shortener
})

export default rootReducer