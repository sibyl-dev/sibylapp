import createReducer from '../store/createReducer';
const initialState = {
  isFeaturesLoading: true,
  featuresData: [],
  isCategoriesLoading: true,
  categories: [],
};

function GET_FEATURES_DATA_REQUEST(nextState) {
  nextState.isFeaturesLoading = true;
}

function GET_FEATURES_DATA_SUCCESS(nextState, action) {
  nextState.featuresData = action.result.features;
  nextState.isFeaturesLoading = false;
}

function GET_FEATURES_DATA_FAILURE(nextState) {
  nextState.featuresData = [];
  nextState.isFeaturesLoading = false;
}

// ------------------
function GET_CATEGORIES_REQUEST(nextState) {
  nextState.isCategoriesLoading = true;
}

function GET_CATEGORIES_SUCCESS(nextState, action) {
  nextState.isCategoriesLoading = false;
  nextState.categories = action.result.categories;
}

function GET_CATEGORIES_FAILURE(nextState) {
  nextState.isCategoriesLoading = false;
  nextState.categories = [];
}

export default createReducer(initialState, {
  GET_FEATURES_DATA_REQUEST,
  GET_FEATURES_DATA_SUCCESS,
  GET_FEATURES_DATA_FAILURE,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
});