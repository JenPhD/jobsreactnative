import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';

export default combineReducers({
  //redux requires one reducer and must return something
  //Use dummy empty object to get started
  //auth: () => { return {} }
  auth,
  jobs
});