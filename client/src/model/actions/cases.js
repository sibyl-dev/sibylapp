import { api } from '../api/api';

import { getCurrentCaseID } from '../selectors/cases';
import { getSelectedModelID } from '../selectors/entities';

export function setCaseIdAction(caseID) {
  return function (dispatch) {
    const action = {
      type: 'SET_CASE_ID',
      caseID,
    };

    dispatch(action);
  };
}

export function setHoverRowAction(hoveredRow) {
  return function (dispatch) {
    const action = {
      type: 'SET_HOVER_ROW_NO',
      hoveredRow,
    };

    dispatch(action);
  };
}

export function ressetHoverRowAction(hoveredRow) {
  return function (dispatch) {
    const action = {
      type: 'RESET_HOVER_ROW_NO',
      hoveredRow,
    };

    dispatch(action);
  };
}

export function getCasesListAction() {
  return function (dispatch) {
    const action = {
      type: 'GET_CASES_DATA',
      promise: api.get('/cases/'),
    };

    dispatch(action);
  };
}

export function getEntitiesInCaseListAction() {
  return function (dispatch, getState) {
    const state = getState();

    const caseID = getCurrentCaseID(state);

    return dispatch({ type: 'GET_ENTITIES_IN_CASE_DATA_REQUEST' })
      .then(() => api.get(`/entities_in_case/${caseID}/`))
      .then((outcomeData) => {
        return dispatch(getScoresForAllEntities(outcomeData)).then(() =>
          dispatch({ type: 'GET_ENTITIES_IN_CASE_DATA_SUCCESS', result: outcomeData }),
        );
      })
      .catch((err) => {
        console.log(err);
        return dispatch({ type: 'GET_ENTITIES_IN_CASE_DATA_FAILURE' });
      });
  };
}

export function getScoresForAllEntities(entities) {
  return (dispatch, getState) => {
    const state = getState();
    const modelID = getSelectedModelID(state);

    let apiCalls = entities.map((entityID) => api.get(`/prediction/?model_id=${modelID}&eid=${entityID}`));

    const action = { type: 'GET_SCORE_FOR_ALL_ENTITIES', promise: Promise.all(apiCalls) };

    return dispatch(action);
  };
}
