import Cookies from 'universal-cookie';
import { api } from '../api/api';
import { getFeaturesAction, getCategoriesAction } from './features';
import { getCurrentEntityID } from '../selectors/entities';

const modelID = '5f0dc12ea69e913b28b44292';

export function setEntityIdAction(entityID) {
  return function (dispatch) {
    const cookies = new Cookies();
    cookies.remove('entityID');
    cookies.set('entityID', entityID, { path: '/' });

    const action = {
      type: 'SET_ENTITY_ID',
      entityID: parseInt(entityID),
    };
    dispatch(action);
  };
}

export function getEntityContributionsAction() {
  return function (dispatch, getState) {
    const entityID = getCurrentEntityID(getState());
    dispatch({ type: 'GET_ENTITY_CONTRIBUTIONS_REQUEST' });

    api
      .post(`/contributions/`, { eid: entityID, model_id: modelID })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'GET_ENTITY_CONTRIBUTIONS_SUCCESS', entityContributions: data.contributions });
      })
      .catch((error) => dispatch({ type: 'GET_ENTITY_CONTRIBUTIONS_FAILURE', error }));
  };
}

export function getEntityAction() {
  return function (dispatch, getState) {
    let entityID = getCurrentEntityID(getState());
    const cookies = new Cookies();

    if (entityID === null) {
      entityID = cookies.get('entityID');
    }

    const action = {
      type: 'GET_ENTITY_DATA',
      promise: api.get(`/entities/${entityID}`),
    };

    dispatch(action)
      .then(dispatch(getCategoriesAction()))
      .then(dispatch(getFeaturesAction()))
      .then(dispatch(getEntityContributionsAction()));
  };
}