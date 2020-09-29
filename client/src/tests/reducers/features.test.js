import reducer from '../../model/reducers/features';
import { generateTestsForPromiseReducers, generateTestsForSetReducers } from '../helpers/reducers.helpers';

const defaultState = {
  isFeaturesLoading: true,
  featuresData: [],
  isCategoriesLoading: true,
  categories: [],
  isFeaturesImportanceLoading: true,
  featuresImportances: {},
  newFeatureScore: null,
  isModelPredictionLoading: true,
  currentModelPrediction: [],
  reversedModelPrediction: [],
  filterCriteria: '',
  sortContribDir: 'asc',
  currentFilterValue: 'all',
  filterValue: 'all',
  filterCategs: null,
  contribFilters: 'all',
  sortPredDirection: null,
  sortDiffDirection: null,
  modelPredFilterValue: 'all',
  diffFilterVal: 'difference',
  featureTypeFilters: {
    positiveFeatures: 'all',
    negativeFeatures: 'all',
  },
  featureTypeSortDir: {
    positiveFeatures: 'asc',
    negativeFeatures: 'desc',
  },
  featureTypeFilterCategs: {
    positiveFeatures: null,
    negativeFeatures: null,
  },
  featureImpSortDir: 'asc',
};

const setReducers = [
  {
    name: 'SET_FILTER_CRITERIA',
    description: 'updates the filter criteria',
    key: 'filterCriteria',
    sendData: 'test1!',
    testData: 'test1!',
  },
  {
    name: 'SET_FEATURE_CONTRIB_SORT_DIRECTION',
    description: 'updates the contributions sorting direction',
    key: 'sortContribDir',
    sendData: 'test1!',
    testData: 'test1!',
  },
  {
    name: 'SET_FILTER_VALUE',
    description: 'updates the filter value by type (numeric/binary/categorical)',
    key: 'filterValue',
    sendData: 'test1!',
    testData: 'test1!',
  },
  {
    name: 'SET_FILTER_CATEGS',
    description: 'updates the filter categories',
    key: 'filterCategs',
    sendData: ['cat1', 'cat2'],
    testData: ['cat1', 'cat2'],
  },
  {
    name: 'SET_CONTRIB_FILTERS',
    description: 'updates the contributions filter',
    key: 'contribFilters',
    sendData: 'test1!',
    testData: 'test1!',
  },
  {
    name: 'SET_SORT_PRED_DIR',
    description: 'updates the direction for sort predictions',
    key: 'sortPredDirection',
    sendData: 'asc',
    testData: 'asc',
  },
  {
    name: 'SET_SORT_DIFF_DIR',
    description: 'updates the direction for sort diff',
    key: 'sortDiffDirection',
    sendData: 'asc',
    testData: 'asc',
  },
  {
    name: 'SET_MODEL_PRED_FILTER_VALUE',
    description: 'updates the value for model prediction filter',
    key: 'modelPredFilterValue',
    sendData: 'test1!',
    testData: 'test1!',
  },
  {
    name: 'SET_MODEL_PRED_DIFF_FILTER',
    description: 'updates the value for model prediction difference filter',
    key: 'diffFilterVal',
    sendData: 'test1!',
    testData: 'test1!',
  },
  {
    name: 'SET_FEATURE_IMPORTANCE_SORT_DIR',
    description: 'updates the direction for feature importance sorting',
    key: 'featureImpSortDir',
    sendData: 'desc',
    testData: 'desc',
  },
];

const promiseReducers = [
  {
    name: 'GET_FEATURES_DATA',
    loading: 'isFeaturesLoading',
    key: 'featuresData',
    sendData: { result: { features: [1, 2] } },
    testData: [1, 2],
    failData: [],
  },
  {
    name: 'GET_CATEGORIES',
    loading: 'isCategoriesLoading',
    key: 'categories',
    sendData: { result: { categories: [1, 2] } },
    testData: [1, 2],
    failData: [],
  },
  {
    name: 'GET_FEATURES_IMPORTANCES',
    loading: 'isFeaturesImportanceLoading',
    key: 'featuresImportances',
    sendData: { result: { importances: { 1: 'test' } } },
    testData: { 1: 'test' },
    failData: {},
  },
];

describe('Features Reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  describe('Reducers to set feature type on filters', () => {
    describe('SET_FEATURE_TYPE_FILTERS', () => {
      it('updates feature type filter', () => {
        const requestAction = {
          type: 'SET_FEATURE_TYPE_FILTERS',
          featureFilters: {
            filters: 'notAll',
            featureType: 'negativeFeatures',
          },
        };

        expect(reducer(defaultState, requestAction)).toEqual({
          ...defaultState,
          featureTypeFilters: {
            positiveFeatures: 'all',
            negativeFeatures: 'notAll',
          },
        });
      });
    });
    describe('SET_FEATURE_TYPE_SORT_CONTRIB_DIR', () => {
      it('updates feature type sort direction by contribution', () => {
        const requestAction = {
          type: 'SET_FEATURE_TYPE_SORT_CONTRIB_DIR',
          featureSortDir: {
            direction: 'desc',
            featureType: 'negativeFeatures',
          },
        };

        expect(reducer(defaultState, requestAction)).toEqual({
          ...defaultState,
          featureTypeSortDir: {
            negativeFeatures: 'desc',
            positiveFeatures: 'asc',
          },
        });
      });
    });
    describe('SET_FEATURE_TYPE_FILTER_CATEGS', () => {
      it('updates feature type filter categories', () => {
        const requestAction = {
          type: 'SET_FEATURE_TYPE_FILTER_CATEGS',
          featureTypeFilterCategs: {
            filterCategs: 'all',
            featureType: 'negativeFeatures',
          },
        };

        expect(reducer(defaultState, requestAction)).toEqual({
          ...defaultState,
          featureTypeFilterCategs: {
            positiveFeatures: null,
            negativeFeatures: 'all',
          },
        });
      });
    });
  });

  describe('Promise reducers without generation', () => {
    describe('GET_MODEL_PREDICTION', () => {
      it('GET_MODEL_PREDICTION_REQUEST', () => {
        const requestAction = {
          type: 'GET_MODEL_PREDICTION_REQUEST',
        };
        expect(reducer(defaultState, requestAction)).toEqual({
          ...defaultState,
          isModelPredictionLoading: true,
        });
      });
      it('GET_MODEL_PREDICTION_SUCCESS', () => {
        const requestAction = {
          type: 'GET_MODEL_PREDICTION_SUCCESS',
          currentPrediction: [1, 2],
          reversedPrediction: [2, 1],
        };
        expect(reducer(defaultState, requestAction)).toEqual({
          ...defaultState,
          isModelPredictionLoading: false,
          currentModelPrediction: [1, 2],
          reversedModelPrediction: [2, 1],
        });
      });
      it('GET_MODEL_PREDICTION_FAILURE', () => {
        const requestAction = {
          type: 'GET_MODEL_PREDICTION_FAILURE',
        };
        expect(reducer(defaultState, requestAction)).toEqual({
          ...defaultState,
          isModelPredictionLoading: false,
          currentModelPrediction: [],
          reversedModelPrediction: [],
        });
      });
    });
    describe('UPDATE_FEATURE_PREDICTION_SUCCESS', () => {
      it('updates new feature score on success', () => {
        const requestAction = {
          type: 'UPDATE_FEATURE_PREDICTION_SUCCESS',
          newFeatureScore: [1, 2],
        };
        expect(reducer(defaultState, requestAction)).toEqual({
          ...defaultState,
          newFeatureScore: [1, 2],
        });
      });
    });
  });

  generateTestsForSetReducers(reducer, defaultState, setReducers);
  generateTestsForPromiseReducers(reducer, defaultState, promiseReducers);
});
