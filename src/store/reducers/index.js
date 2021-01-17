import { combineReducers } from 'redux';

import loadingStateReducer from './loadingState';
import jobSearchResultsReducer from './jobSearchResults';

export default combineReducers({
  isLoading: loadingStateReducer,
  jobSearchResults: jobSearchResultsReducer,
});
