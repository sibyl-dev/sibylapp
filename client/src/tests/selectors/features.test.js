import {
  getCurrentContribFilters,
  getCurrentFeatureCategories,
  getCurrentFeatures,
  getCurrentModelPrediction,
  getCurrentPredSortDir,
  getCurrentSortDiffDir,
  getFeatureImpSortDir,
  getFeaturesFilterCriteria,
  getFeaturesImportances,
  getFeatureTypeFilterCategs,
  getFeatureTypeFilters,
  getFeatureTypeSortContribDir,
  getFilterCategories,
  getIsCategoriesLoading,
  getIsFeaturesLoading,
  getIsModelPredictLoading,
  getMaxContributionRange,
  getModelPredDiffFilterValue,
  getModelPredictFilterValue,
  getReversedModelPrediction,
  getSelectedFilterValues,
  getSortingContribDir,
  getUpdatedFeatureScore,
} from '../../model/selectors/features';

import defaultState from './states/features.default';

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

  describe('getMaxContributionRange()', () => {
    it('returns the max contribution range', () => {
      expect(
        getMaxContributionRange({
          features: {
            isFeaturesLoading: false,
            featuresData: defaultState.features.featuresData,
          },
          entities: {
            entityData: {
              features: defaultState.entities.entityData.features,
            },
            entityContributions: defaultState.entities.entityContributions,
          },
        }),
      ).toEqual(0.17030227689000002);
    });

    it('returns null when features are loading', () => {
      expect(
        getMaxContributionRange({
          features: {
            isFeaturesLoading: true,
            featuresData: [],
          },
          entities: {
            entityData: {
              features: {},
            },
            entityContributions: {},
          },
        }),
      ).toBeNull();
    });

    it('returns 0 when features are empty and loaded', () => {
      expect(
        getMaxContributionRange({
          features: {
            isFeaturesLoading: false,
            featuresData: [],
          },
          entities: {
            entityData: {
              features: {},
            },
            entityContributions: {},
          },
        }),
      ).toEqual(0);
    });
  });
});
