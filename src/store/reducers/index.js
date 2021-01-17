import { combineReducers } from 'redux';

import loadingStateReducer from './loadingState';
import jobSearchResultsReducer from './jobSearchResults';
import jobDetailsReducer from './jobDetails';

export default combineReducers({
  isLoading: loadingStateReducer,
  jobSearchResults: jobSearchResultsReducer,
  jobDetails: jobDetailsReducer,
});
