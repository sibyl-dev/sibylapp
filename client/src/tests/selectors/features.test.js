import {
  getCurrentContribFilters,
  getCurrentFeatureCategories,
  getCurrentFeatures,
  getCurrentModelPrediction,
  getCurrentPredSortDir,
  getCurrentSortDiffDir,
  getFeatureCategories,
  getFeatureImpSortDir,
  getFeaturesData,
  getFeaturesFilterCriteria,
  getFeaturesImportances,
  getFeatureTypeFilterCategs,
  getFeatureTypeFilters,
  getFeatureTypeSortContribDir,
  getFilterCategories,
  getGrouppedFeatures,
  getIsCategoriesLoading,
  getIsFeaturesLoading,
  getIsModelPredictLoading,
  getMaxContributionRange,
  getModelPredDiffFilterValue,
  getModelPredictFilterValue,
  getModelPredictionData,
  getModelPredictionPayload,
  getReversedModelPredFeatures,
  getReversedModelPrediction,
  getSelectedFilterValues,
  getSortedByImportanceFeatures,
  getSortingContribDir,
  getUpdatedFeatureScore,
} from '../../model/selectors/features';

import defaultState from './states/features.default';
import entitiesDefaultState from './states/entities.default';
import expectations from './expectations/features.expectations';

describe('Features Selectors', () => {
  describe('getFeaturesImportances()', () => {
    it('returns the features importance', () => {
      expect(getFeaturesImportances(defaultState)).toEqual(defaultState.features.featuresImportances);
    });
  });
  describe('getIsFeaturesLoading()', () => {
    it('returns the features loading state', () => {
      expect(getIsFeaturesLoading(defaultState)).toBeFalsy();
    });
  });
  describe('getIsCategoriesLoading()', () => {
    it('returns the categories loading state', () => {
      expect(getIsCategoriesLoading(defaultState)).toBeFalsy();
    });
  });
  describe('getCurrentFeatureCategories()', () => {
    it('returns the features categories', () => {
      expect(getCurrentFeatureCategories(defaultState)).toEqual(defaultState.features.categories);
    });
  });
  describe('getCurrentFeatures()', () => {
    it('returns the features', () => {
      expect(getCurrentFeatures(defaultState)).toEqual(defaultState.features.featuresData);
    });
  });
  describe('getUpdatedFeatureScore()', () => {
    it('returns the new feature score', () => {
      expect(getUpdatedFeatureScore(defaultState)).toBeNull();
    });
  });
  describe('getIsModelPredictLoading()', () => {
    it('returns the model prediction loading state', () => {
      expect(getIsModelPredictLoading(defaultState)).toBeFalsy();
    });
  });
  describe('getCurrentModelPrediction()', () => {
    it('returns the model prediction', () => {
      expect(getCurrentModelPrediction(defaultState)).toEqual(defaultState.features.currentModelPrediction);
    });
  });
  describe('getReversedModelPrediction()', () => {
    it('returns the reversed model prediction', () => {
      expect(getReversedModelPrediction(defaultState)).toEqual(defaultState.features.reversedModelPrediction);
    });
  });
  describe('getFeaturesFilterCriteria()', () => {
    it('returns the features filter', () => {
      expect(getFeaturesFilterCriteria(defaultState).length).toEqual(0);
    });
  });
  describe('getSortingContribDir()', () => {
    it('returns the sorting contrib direction', () => {
      expect(getSortingContribDir(defaultState)).toEqual('asc');
    });
  });
  describe('getSelectedFilterValues()', () => {
    it('returns the selected filter value', () => {
      expect(getSelectedFilterValues(defaultState)).toEqual('all');
    });
  });
  describe('getFilterCategories()', () => {
    it('returns the filter categories', () => {
      expect(getFilterCategories(defaultState)).toBeNull();
    });
  });
  describe('getCurrentContribFilters()', () => {
    it('returns the current contrib filters', () => {
      expect(getCurrentContribFilters(defaultState)).toEqual('all');
    });
  });
  describe('getCurrentPredSortDir()', () => {
    it('returns the contrib filter direction', () => {
      expect(getCurrentPredSortDir(defaultState)).toBeNull();
    });
  });
  describe('getCurrentSortDiffDir()', () => {
    it('returns the sort diff direction', () => {
      expect(getCurrentSortDiffDir(defaultState)).toBeNull();
    });
  });
  describe('getModelPredictFilterValue()', () => {
    it('returns the model prediction filter', () => {
      expect(getModelPredictFilterValue(defaultState)).toEqual('all');
    });
  });
  describe('getModelPredDiffFilterValue()', () => {
    it('returns the model prediction difference filter', () => {
      expect(getModelPredDiffFilterValue(defaultState)).toEqual('difference');
    });
  });
  describe('getFeatureTypeFilters()', () => {
    it('returns the feature type filters', () => {
      expect(getFeatureTypeFilters(defaultState)).toEqual({
        positiveFeatures: 'all',
        negativeFeatures: 'all',
      });
    });
  });
  describe('getFeatureTypeSortContribDir()', () => {
    it('returns the feature type sorting contrib direction', () => {
      expect(getFeatureTypeSortContribDir(defaultState)).toEqual({
        positiveFeatures: 'asc',
        negativeFeatures: 'desc',
      });
    });
  });
  describe('getFeatureTypeFilterCategs()', () => {
    it('returns the feature type categories filters', () => {
      expect(getFeatureTypeFilterCategs(defaultState)).toEqual({
        positiveFeatures: null,
        negativeFeatures: null,
      });
    });
  });
  describe('getFeatureImpSortDir()', () => {
    it('returns the feature importance sorting direction', () => {
      expect(getFeatureImpSortDir(defaultState)).toEqual('asc');
    });
  });
});

describe('Created Features Selectors', () => {
  let testState;
  beforeEach(() => {
    testState = JSON.parse(
      JSON.stringify({
        ...defaultState,
        entities: {
          entityData: entitiesDefaultState.entities.entityData,
          entityContributions: entitiesDefaultState.entities.entityContributions,
        },
      }),
    );
  });

  describe('getMaxContributionRange()', () => {
    it('returns the max contribution range', () => {
      expect(getMaxContributionRange(testState)).toEqual(0.17030227689000002);
    });

    it('returns null when features are loading', () => {
      testState.features.isFeaturesLoading = true;

      expect(getMaxContributionRange(testState)).toBeNull();
    });

    it('returns 0 when features are empty and loaded', () => {
      testState.features.featuresData = [];
      expect(getMaxContributionRange(testState)).toEqual(0);
    });
  });

  describe('getFeaturesData', () => {
    it('returns all the features when there are no filters, in asc order', () => {
      expect(getFeaturesData(testState)).toEqual(expectations.getFeaturesDataAll);
    });
    it('returns all the features with matching filter criteria ', () => {
      testState.features.filterCriteria = 'Age of the child';

      expect(getFeaturesData(testState)).toEqual(expectations.getFeaturesDataSearchFilter);
    });

    it('returns all the features with matching category ', () => {
      testState.features.filterCategs = ['demographics'];

      expect(getFeaturesData(testState)).toEqual(expectations.getFeaturesDataCategoryFilter);
    });

    it('returns all the features with matching contribution', () => {
      testState.features.contribFilters = 'risk';

      expect(getFeaturesData(testState)).toEqual(expectations.getFeaturesDataContributionFilter);
    });
  });

  describe('getGrouppedFeatures()', () => {
    it('returns all the features grouped by contribution', () => {
      expect(getGrouppedFeatures(testState)).toEqual(expectations.getGroupedFeaturesAll);
    });

    it('returns the positive features matching the category filter', () => {
      testState.features.featureTypeFilterCategs.positiveFeaturesFeatures = ['demographics'];

      expect(getGrouppedFeatures(testState)).toEqual(expectations.getGroupedFeaturesCategoryFilter);
    });
  });

  describe('getModelPredictionPayload()', () => {
    it('returns the current prediction when features are loaded', () => {
      expect(getModelPredictionPayload(testState)).toEqual(expectations.getModelPredictionPayload);
    });

    it('returns empty array when features are loading', () => {
      testState.features.isFeaturesLoading = true;
      expect(getModelPredictionPayload(testState)).toEqual([]);
    });

    it('returns two empty arrays when features are empty', () => {
      testState.features.featuresData = [];
      expect(getModelPredictionPayload(testState)).toEqual({
        currentFeatures: [],
        reversedFeatures: [],
      });
    });
  });

  describe('getModelPredictionData()', () => {
    it('returns the current prediction data when model is loaded', () => {
      expect(getModelPredictionData(testState)).toEqual(expectations.getModelPredictionData);
    });

    it('returns empty array when model prediction is loading', () => {
      testState.features.isModelPredictionLoading = true;
      expect(getModelPredictionData(testState)).toEqual([]);
    });

    it('returns empty object when there are no model predictions', () => {
      testState.features.currentModelPrediction = [];
      expect(getModelPredictionData(testState)).toEqual({});
    });
  });

  describe('getFeatureCategories()', () => {
    it('returns all processed the categories', () => {
      expect(getFeatureCategories(testState)).toEqual(expectations.getFeatureCategories);
    });

    it('returns empty array when categories are loading', () => {
      testState.features.isCategoriesLoading = true;
      expect(getFeatureCategories(testState)).toEqual([]);
    });

    it('returns empty array when categories are empty', () => {
      testState.features.categories = [];
      expect(getFeatureCategories(testState)).toEqual([]);
    });
  });

  describe('getReversedModelPredFeatures()', () => {
    it('returns all the features', () => {
      expect(getReversedModelPredFeatures(testState)).toEqual(expectations.getReversedModelPredictionFeaturesAll);
    });

    it('returns all the features matching the search field', () => {
      testState.features.filterCriteria = 'The child in focus had a child welfare placement in the last 90 days';

      expect(getReversedModelPredFeatures(testState)).toEqual(expectations.getReversedModelPredictionFeaturesSearchFilter);
    });

    it('returns all the features matching the category filter', () => {
      testState.features.filterCategs = ['placement history'];

      expect(getReversedModelPredFeatures(testState)).toEqual(
        expectations.getReversedModelPredictionFeaturesCategoryFilter,
      );
    });

    it('returns all the features matching the contribution filter', () => {
      testState.features.diffFilterVal = 'risk';

      expect(getReversedModelPredFeatures(testState)).toEqual(expectations.getReversedModelPredictionFeaturesPredictionFilter);
    });
  });

  describe('getSortedByImportanceFeatures()', () => {
    it('returns all the features sorted by importance', () => {
      expect(getSortedByImportanceFeatures(testState)).toEqual(expectations.getSortedByImportanceFeaturesAsc);
    });

    it('returns all the features sorted by importance desc', () => {
      testState.features.featureImpSortDir = 'desc';
      expect(getSortedByImportanceFeatures(testState)).toEqual(expectations.getSortedByImportanceFeaturesDesc);
    });

    it('returns empty array if features are loading', () => {
      testState.features.isFeaturesLoading = true;
      expect(getSortedByImportanceFeatures(testState).length).toEqual(0);
    });
  });
});
