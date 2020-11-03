import { api } from '../api/api';

import { getCurrentCaseID } from '../selectors/cases';
import { getSelectedModelID } from '../selectors/entities';

export function setCaseIdAction(caseID) {
  return function (dispatch) {
    dispatch({
      type: 'SET_CASE_ID',
      caseID,
    });
  };
}

export function setCaseEntityScoreAction(caseEntityScore) {
  return function (dispatch) {
    dispatch({
      type: 'SET_CASE_ENTITY_SCORE',
      caseEntityScore,
    });
  };
}

export function hoverRowIdAction(scoreRowId) {
  return function (dispatch) {
    scoreRowId !== null
      ? dispatch({ type: 'SET_HOVER_ROW_ID', scoreRowId })
      : dispatch({ type: 'SET_HOVER_ROW_ID', scoreRowId: null });
  };
}

export function getCasesListAction() {
  return function (dispatch) {
    dispatch({
      type: 'GET_CASES_DATA',
      promise: api.get('/referrals/'),
    });
  };
}

export function getEntitiesInCaseListAction() {
  return function (dispatch, getState) {
    const state = getState();
    const caseID = getCurrentCaseID(state);
    const modelID = getSelectedModelID(state);

    if (!modelID || !caseID) {
      return null;
    }

    dispatch({ type: 'GET_ENTITIES_IN_CASE_DATA_REQUEST' });

    return api
      .get(`/entities_in_referral/${caseID}/`)
      .then((outcomeData) =>
        dispatch(getScoresForAllEntitiesAction(outcomeData, modelID)).then(() =>
          dispatch({ type: 'GET_ENTITIES_IN_CASE_DATA_SUCCESS', result: outcomeData }),
        ),
      )
      .catch((err) => {
        dispatch({ type: 'GET_ENTITIES_IN_CASE_DATA_FAILURE' });
        console.warn(err);
      });
  };
}
function getScoresForAllEntitiesAction(entities, modelID) {
  return (dispatch) => {
    let apiCalls = entities.map((entityID) => api.get(`/prediction/?model_id=${modelID}&eid=${entityID}`));
    const action = { type: 'GET_SCORE_FOR_ALL_ENTITIES', promise: Promise.all(apiCalls) };
    return dispatch(action);
  };
}
