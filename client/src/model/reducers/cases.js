import createReducer from '../store/createReducer';

const initialState = {
  caseID: null,
  caseEntityScore: null,
  casesList: [],
  entitiesInCase: [],
  isEntitiesScoreLoading: true,
  isEntitiesInCaseLoading: true,
  isCasesLoading: true,
  entitiesScore: [],
  scoreRowId: null,
};

function SET_CASE_ENTITY_SCORE(nextState, { caseEntityScore }) {
  nextState.caseEntityScore = caseEntityScore;
}

function SET_CASE_ID(nextState, { caseID }) {
  nextState.caseID = caseID;
}

function SET_HOVER_ROW_ID(nextState, { scoreRowId }) {
  nextState.scoreRowId = scoreRowId;
}

function GET_CASES_DATA_REQUEST(nextState) {
  nextState.isCasesLoading = true;
}

function GET_CASES_DATA_SUCCESS(nextState, action) {
  nextState.casesList = action.result.referrals;
  nextState.isCasesLoading = false;
}

function GET_CASES_DATA_FAILURE(nextState) {
  nextState.casesList = [];
  nextState.isCasesLoading = false;
}

function GET_ENTITIES_IN_CASE_DATA_REQUEST(nextState) {
  nextState.isEntitiesInCaseLoading = true;
}

function GET_ENTITIES_IN_CASE_DATA_SUCCESS(nextState, action) {
  nextState.entitiesInCase = action.result;
  nextState.isEntitiesInCaseLoading = false;
}

function GET_ENTITIES_IN_CASE_DATA_FAILURE(nextState) {
  nextState.entitiesInCase = [];
  nextState.isEntitiesInCaseLoading = false;
}

function GET_SCORE_FOR_ALL_ENTITIES_REQUEST(nextState) {
  nextState.isEntitiesScoreLoading = true;
}

function GET_SCORE_FOR_ALL_ENTITIES_SUCCESS(nextState, action) {
  nextState.entitiesScore = action.result;
  nextState.isEntitiesScoreLoading = false;
}

function GET_SCORE_FOR_ALL_ENTITIES_FAILURE(nextState) {
  nextState.entitiesScore = [];
  nextState.isEntitiesScoreLoading = false;
}

export default createReducer(initialState, {
  SET_CASE_ID,
  SET_CASE_ENTITY_SCORE,
  GET_CASES_DATA_REQUEST,
  GET_CASES_DATA_SUCCESS,
  GET_CASES_DATA_FAILURE,
  GET_ENTITIES_IN_CASE_DATA_REQUEST,
  GET_ENTITIES_IN_CASE_DATA_SUCCESS,
  GET_ENTITIES_IN_CASE_DATA_FAILURE,
  GET_SCORE_FOR_ALL_ENTITIES_REQUEST,
  GET_SCORE_FOR_ALL_ENTITIES_SUCCESS,
  GET_SCORE_FOR_ALL_ENTITIES_FAILURE,
  SET_HOVER_ROW_ID,
});
