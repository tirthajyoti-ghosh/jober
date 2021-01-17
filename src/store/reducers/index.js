import { combineReducers } from 'redux';

import loadingStateReducer from './loadingState';

export default combineReducers({
  isLoading: loadingStateReducer,
});
