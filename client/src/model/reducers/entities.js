import createReducer from '../store/createReducer';

const initialState = {
  isEntityDataLoading: true,
  isEntityContributionsLoading: true,
  isEntityScoreLoading: true,
  entityScore: null,
  entityData: [],
  entityContributions: [],
  entityID: null,
};

function GET_ENTITY_DATA_REQUEST(nextState) {
  nextState.isEntityDataLoading = true;
}
function GET_ENTITY_DATA_SUCCESS(nextState, action) {
  nextState.entityData = action.result;
  nextState.isEntityDataLoading = false;
}

function GET_ENTITY_DATA_FAILURE(nextState) {
  nextState.entityData = [];
  nextState.isEntityDataLoading = false;
}

function SET_ENTITY_ID(nextState, { entityID }) {
  nextState.entityID = entityID;
}

// -------
function GET_ENTITY_CONTRIBUTIONS_REQUEST(nextState) {
  nextState.isEntityContributionsLoading = true;
}

function GET_ENTITY_CONTRIBUTIONS_SUCCESS(nextState, action) {
  nextState.entityContributions = action.entityContributions;
  nextState.isEntityContributionsLoading = false;
}

function GET_ENTITY_CONTRIBUTIONS_FAILURE(nextState) {
  nextState.isEntityContributionsLoading = false;
  nextState.entityContributions = [];
}

// -----
function GET_ENTITY_SCORE_REQUEST(nextState) {
  nextState.isEntityScoreLoading = true;
}

function GET_ENTITY_SCORE_SUCCESS(nextState, action) {
  nextState.isEntityScoreLoading = false;
  nextState.entityScore = action.result.output;
}

function GET_ENTITY_SCORE_FAILURE(nextState) {
  nextState.isEntityContributionsLoading = false;
  nextState.entityScore = null;
}

export default createReducer(initialState, {
  GET_ENTITY_DATA_REQUEST,
  GET_ENTITY_DATA_SUCCESS,
  GET_ENTITY_DATA_FAILURE,
  SET_ENTITY_ID,
  GET_ENTITY_CONTRIBUTIONS_REQUEST,
  GET_ENTITY_CONTRIBUTIONS_SUCCESS,
  GET_ENTITY_CONTRIBUTIONS_FAILURE,
  GET_ENTITY_SCORE_REQUEST,
  GET_ENTITY_SCORE_SUCCESS,
  GET_ENTITY_SCORE_FAILURE,
});
