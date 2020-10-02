import { combineReducers } from 'redux';
import sidebar from './sidebar';
import entities from './entities';
import features from './features';
import cases from './cases';

const dashBoardReducers = combineReducers({
  sidebar,
  entities,
  features,
  cases,
});

export default dashBoardReducers;
