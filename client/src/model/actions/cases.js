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

export function setCaseEntityScoreAction(caseEntityScore) {
  return function (dispatch) {
    const action = {
      type: 'SET_CASE_ENTITY_SCORE',
      caseEntityScore,
    };

    dispatch(action);
  };
}

export function hoverRowIdAction(scoreRowId) {
  return function (dispatch) {
    const action = {
      type: 'SET_HOVER_ROW_ID',
      scoreRowId,
    };

    dispatch(action);
  };
}

export function hoverOffRowAction(scoreRowId) {
  return function (dispatch) {
    const action = {
      type: 'RESET_HOVER_ROW_ID',
      scoreRowId,
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
    const modelID = getSelectedModelID(state);

    if (!modelID || !caseID) {
      return null;
    }
    return dispatch({ type: 'GET_ENTITIES_IN_CASE_DATA_REQUEST' })
      .then(() => api.get(`/entities_in_case/${caseID}/`))
      .then((outcomeData) =>
        dispatch(getScoresForAllEntitiesAction(outcomeData, modelID)).then(() =>
          dispatch({ type: 'GET_ENTITIES_IN_CASE_DATA_SUCCESS', result: outcomeData }),
        ),
      )
      .catch(() => {
        return dispatch({ type: 'GET_ENTITIES_IN_CASE_DATA_FAILURE' });
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
