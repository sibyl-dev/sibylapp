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
      expect(getFeaturesData(testState)).toEqual({
        processedFeatures: [
          {
            PRI_FOCUS_AGE_AT_REFERRAL: 0,
            category: 'demographics',
            contributionValue: 0.17030227689000002,
            description: 'Age of the child in focus at time of referral',
            featureImportance: 0,
            name: 'PRI_FOCUS_AGE_AT_REFERRAL',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST90_LOS: 0,
            category: 'placement history',
            contributionValue: 0.013295068850000001,
            description: 'Count of days the child in focus was in a child welfare placement in the last 90 days',
            featureImportance: 0.08042322147600664,
            name: 'PRI_FOCUS_PLSM_PAST90_LOS',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST90_DUMMY: 0,
            category: 'placement history',
            contributionValue: 0.0021496224,
            description: 'The child in focus had a child welfare placement in the last 90 days',
            featureImportance: 0.010154942842355652,
            name: 'PRI_FOCUS_PLSM_PAST90_DUMMY',
            negated_description: 'The child in focus has NOT had a child welfare placement in the last 90 days',
            type: 'binary',
          },
          {
            PRI_FOCUS_PLSM_PAST90_COUNT: 0,
            category: 'placement history',
            contributionValue: 0.00177941188,
            description: 'Count of child welfare placement episodes the child in focus had in the last 90 days',
            featureImportance: 0.008524681831138992,
            name: 'PRI_FOCUS_PLSM_PAST90_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST180_DUMMY: 0,
            category: 'placement history',
            contributionValue: 0,
            description: 'The child in focus had a child welfare placement in the last 180 days',
            featureImportance: 0,
            name: 'PRI_FOCUS_PLSM_PAST180_DUMMY',
            negated_description: 'The child in focus has NOT had a child welfare placement in the last 180 days',
            type: 'binary',
          },
          {
            PRI_FOCUS_PLSM_PAST365_DUMMY: 0,
            category: 'placement history',
            contributionValue: 0,
            description: 'The child in focus had a child welfare placement in the last 365 days',
            featureImportance: 0,
            name: 'PRI_FOCUS_PLSM_PAST365_DUMMY',
            negated_description: 'The child in focus has NOT had a child welfare placement in the last 365 days',
            type: 'binary',
          },
          {
            PRI_FOCUS_PLSM_PAST180_LOS: 0,
            category: 'placement history',
            contributionValue: 0,
            description: 'Count of days the child in focus was in a child welfare placement in the last 180 days',
            featureImportance: 0,
            name: 'PRI_FOCUS_PLSM_PAST180_LOS',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST365_LOS: 0,
            category: 'placement history',
            contributionValue: 0,
            description: 'Count of days the child in focus was in a child welfare placement in the last 365 days',
            featureImportance: 0,
            name: 'PRI_FOCUS_PLSM_PAST365_LOS',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST730_LOS: 0,
            category: 'placement history',
            contributionValue: 0,
            description: 'Count of days the child in focus was in a child welfare placement in the last 730 days',
            featureImportance: 0,
            name: 'PRI_FOCUS_PLSM_PAST730_LOS',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_REFSCI_PAST180_COUNT: undefined,
            category: 'referral history',
            contributionValue: 0,
            description: 'Count of prior referrals the focus child in the last 180 days that were screened in',
            featureImportance: 0,
            name: 'PRI_FOCUS_REFSCI_PAST180_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_REFSCI_PAST90_COUNT: undefined,
            category: 'referral history',
            contributionValue: -0.00074769856,
            description: 'Count of prior referrals the focus child in the last 90 days that were screened in',
            featureImportance: 0,
            name: 'PRI_FOCUS_REFSCI_PAST90_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST365_COUNT: 0,
            category: 'placement history',
            contributionValue: -0.0017823015000000002,
            description: 'Count of child welfare placement episodes the child in focus had in the last 365 days',
            featureImportance: 0,
            name: 'PRI_FOCUS_PLSM_PAST365_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST180_COUNT: 0,
            category: 'placement history',
            contributionValue: -0.00272553132,
            description: 'Count of child welfare placement episodes the child in focus had in the last 180 days',
            featureImportance: 0,
            name: 'PRI_FOCUS_PLSM_PAST180_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST730_COUNT: 0,
            category: 'placement history',
            contributionValue: -0.0043466519999999995,
            description: 'Count of child welfare placement episodes the child in focus had in the last 730 days',
            featureImportance: 0,
            name: 'PRI_FOCUS_PLSM_PAST730_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST730_DUMMY: 0,
            category: 'placement history',
            contributionValue: -0.0161774817,
            description: 'The child in focus had a child welfare placement in the last 730 days',
            featureImportance: 0,
            name: 'PRI_FOCUS_PLSM_PAST730_DUMMY',
            negated_description: 'The child in focus has NOT had a child welfare placement in the last 730 days',
            type: 'binary',
          },
          {
            PRI_FOCUS_PLSM_EVER: undefined,
            category: 'placement history',
            contributionValue: -0.029091358800000005,
            description:
              'Child in focus has ever had an out of home placement. Only includes placements more than 2 years prior to referral date.',
            featureImportance: 0,
            name: 'PRI_FOCUS_PLSM_EVER',
            negated_description:
              'Child in focus has never had an out of home placement. Only includes placements more than 2 years prior to referral date.',
            type: 'binary',
          },
          {
            PRI_FOCUS_REFSCI_PAST730_COUNT: undefined,
            category: 'referral history',
            contributionValue: -0.05318989026,
            description: 'Count of prior referrals the focus child in the last 730 days that were screened in',
            featureImportance: 0,
            name: 'PRI_FOCUS_REFSCI_PAST730_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_REFSCI_PAST365_COUNT: undefined,
            category: 'referral history',
            contributionValue: -0.08907336099999999,
            description: 'Count of prior referrals the focus child in the last 365 days that were screened in',
            featureImportance: 0,
            name: 'PRI_FOCUS_REFSCI_PAST365_COUNT',
            negated_description: null,
            type: 'numeric',
          },
        ],
      });
    });
    it('returns all the features with matching filter criteria ', () => {
      testState.features.filterCriteria = 'Age of the child';

      expect(getFeaturesData(testState)).toEqual({
        processedFeatures: [
          {
            PRI_FOCUS_AGE_AT_REFERRAL: 0,
            category: 'demographics',
            contributionValue: 0.17030227689000002,
            description: 'Age of the child in focus at time of referral',
            featureImportance: 0,
            name: 'PRI_FOCUS_AGE_AT_REFERRAL',
            negated_description: null,
            type: 'numeric',
          },
        ],
      });
    });

    it('returns all the features with matching category ', () => {
      testState.features.filterCategs = ['demographics'];

      expect(getFeaturesData(testState)).toEqual({
        processedFeatures: [
          {
            PRI_FOCUS_AGE_AT_REFERRAL: 0,
            category: 'demographics',
            contributionValue: 0.17030227689000002,
            description: 'Age of the child in focus at time of referral',
            featureImportance: 0,
            name: 'PRI_FOCUS_AGE_AT_REFERRAL',
            negated_description: null,
            type: 'numeric',
          },
        ],
      });
    });

    it('returns all the features with matching contribution', () => {
      testState.features.contribFilters = 'risk';

      expect(getFeaturesData(testState)).toEqual({
        processedFeatures: [
          {
            PRI_FOCUS_AGE_AT_REFERRAL: 0,
            category: 'demographics',
            contributionValue: 0.17030227689000002,
            description: 'Age of the child in focus at time of referral',
            featureImportance: 0,
            name: 'PRI_FOCUS_AGE_AT_REFERRAL',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST90_LOS: 0,
            category: 'placement history',
            contributionValue: 0.013295068850000001,
            description: 'Count of days the child in focus was in a child welfare placement in the last 90 days',
            featureImportance: 0.08042322147600664,
            name: 'PRI_FOCUS_PLSM_PAST90_LOS',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST90_DUMMY: 0,
            category: 'placement history',
            contributionValue: 0.0021496224,
            description: 'The child in focus had a child welfare placement in the last 90 days',
            featureImportance: 0.010154942842355652,
            name: 'PRI_FOCUS_PLSM_PAST90_DUMMY',
            negated_description: 'The child in focus has NOT had a child welfare placement in the last 90 days',
            type: 'binary',
          },
          {
            PRI_FOCUS_PLSM_PAST90_COUNT: 0,
            category: 'placement history',
            contributionValue: 0.00177941188,
            description: 'Count of child welfare placement episodes the child in focus had in the last 90 days',
            featureImportance: 0.008524681831138992,
            name: 'PRI_FOCUS_PLSM_PAST90_COUNT',
            negated_description: null,
            type: 'numeric',
          },
        ],
      });
    });
  });

  describe('getGrouppedFeatures()', () => {
    it('returns all the features grouped by contribution', () => {
      expect(getGrouppedFeatures(testState)).toEqual({
        negativeFeaturesContrib: [
          {
            PRI_FOCUS_REFSCI_PAST365_COUNT: undefined,
            category: 'referral history',
            contributionValue: -0.08907336099999999,
            description: 'Count of prior referrals the focus child in the last 365 days that were screened in',
            name: 'PRI_FOCUS_REFSCI_PAST365_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_REFSCI_PAST730_COUNT: undefined,
            category: 'referral history',
            contributionValue: -0.05318989026,
            description: 'Count of prior referrals the focus child in the last 730 days that were screened in',
            name: 'PRI_FOCUS_REFSCI_PAST730_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_EVER: undefined,
            category: 'placement history',
            contributionValue: -0.029091358800000005,
            description:
              'Child in focus has ever had an out of home placement. Only includes placements more than 2 years prior to referral date.',
            name: 'PRI_FOCUS_PLSM_EVER',
            negated_description:
              'Child in focus has never had an out of home placement. Only includes placements more than 2 years prior to referral date.',
            type: 'binary',
          },
          {
            PRI_FOCUS_PLSM_PAST730_DUMMY: 0,
            category: 'placement history',
            contributionValue: -0.0161774817,
            description: 'The child in focus had a child welfare placement in the last 730 days',
            name: 'PRI_FOCUS_PLSM_PAST730_DUMMY',
            negated_description: 'The child in focus has NOT had a child welfare placement in the last 730 days',
            type: 'binary',
          },
          {
            PRI_FOCUS_PLSM_PAST730_COUNT: 0,
            category: 'placement history',
            contributionValue: -0.0043466519999999995,
            description: 'Count of child welfare placement episodes the child in focus had in the last 730 days',
            name: 'PRI_FOCUS_PLSM_PAST730_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST180_COUNT: 0,
            category: 'placement history',
            contributionValue: -0.00272553132,
            description: 'Count of child welfare placement episodes the child in focus had in the last 180 days',
            name: 'PRI_FOCUS_PLSM_PAST180_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST365_COUNT: 0,
            category: 'placement history',
            contributionValue: -0.0017823015000000002,
            description: 'Count of child welfare placement episodes the child in focus had in the last 365 days',
            name: 'PRI_FOCUS_PLSM_PAST365_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_REFSCI_PAST90_COUNT: undefined,
            category: 'referral history',
            contributionValue: -0.00074769856,
            description: 'Count of prior referrals the focus child in the last 90 days that were screened in',
            name: 'PRI_FOCUS_REFSCI_PAST90_COUNT',
            negated_description: null,
            type: 'numeric',
          },
        ],
        positiveFeaturesContrib: [
          {
            PRI_FOCUS_AGE_AT_REFERRAL: 0,
            category: 'demographics',
            contributionValue: 0.17030227689000002,
            description: 'Age of the child in focus at time of referral',
            name: 'PRI_FOCUS_AGE_AT_REFERRAL',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST90_LOS: 0,
            category: 'placement history',
            contributionValue: 0.013295068850000001,
            description: 'Count of days the child in focus was in a child welfare placement in the last 90 days',
            name: 'PRI_FOCUS_PLSM_PAST90_LOS',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST90_DUMMY: 0,
            category: 'placement history',
            contributionValue: 0.0021496224,
            description: 'The child in focus had a child welfare placement in the last 90 days',
            name: 'PRI_FOCUS_PLSM_PAST90_DUMMY',
            negated_description: 'The child in focus has NOT had a child welfare placement in the last 90 days',
            type: 'binary',
          },
          {
            PRI_FOCUS_PLSM_PAST90_COUNT: 0,
            category: 'placement history',
            contributionValue: 0.00177941188,
            description: 'Count of child welfare placement episodes the child in focus had in the last 90 days',
            name: 'PRI_FOCUS_PLSM_PAST90_COUNT',
            negated_description: null,
            type: 'numeric',
          },
        ],
      });
    });

    it('returns the positive features matching the category filter', () => {
      testState.features.featureTypeFilterCategs.positiveFeaturesFeatures = ['demographics'];

      expect(getGrouppedFeatures(testState)).toEqual({
        negativeFeaturesContrib: [
          {
            PRI_FOCUS_REFSCI_PAST365_COUNT: undefined,
            category: 'referral history',
            contributionValue: -0.08907336099999999,
            description: 'Count of prior referrals the focus child in the last 365 days that were screened in',
            name: 'PRI_FOCUS_REFSCI_PAST365_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_REFSCI_PAST730_COUNT: undefined,
            category: 'referral history',
            contributionValue: -0.05318989026,
            description: 'Count of prior referrals the focus child in the last 730 days that were screened in',
            name: 'PRI_FOCUS_REFSCI_PAST730_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_EVER: undefined,
            category: 'placement history',
            contributionValue: -0.029091358800000005,
            description:
              'Child in focus has ever had an out of home placement. Only includes placements more than 2 years prior to referral date.',
            name: 'PRI_FOCUS_PLSM_EVER',
            negated_description:
              'Child in focus has never had an out of home placement. Only includes placements more than 2 years prior to referral date.',
            type: 'binary',
          },
          {
            PRI_FOCUS_PLSM_PAST730_DUMMY: 0,
            category: 'placement history',
            contributionValue: -0.0161774817,
            description: 'The child in focus had a child welfare placement in the last 730 days',
            name: 'PRI_FOCUS_PLSM_PAST730_DUMMY',
            negated_description: 'The child in focus has NOT had a child welfare placement in the last 730 days',
            type: 'binary',
          },
          {
            PRI_FOCUS_PLSM_PAST730_COUNT: 0,
            category: 'placement history',
            contributionValue: -0.0043466519999999995,
            description: 'Count of child welfare placement episodes the child in focus had in the last 730 days',
            name: 'PRI_FOCUS_PLSM_PAST730_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST180_COUNT: 0,
            category: 'placement history',
            contributionValue: -0.00272553132,
            description: 'Count of child welfare placement episodes the child in focus had in the last 180 days',
            name: 'PRI_FOCUS_PLSM_PAST180_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST365_COUNT: 0,
            category: 'placement history',
            contributionValue: -0.0017823015000000002,
            description: 'Count of child welfare placement episodes the child in focus had in the last 365 days',
            name: 'PRI_FOCUS_PLSM_PAST365_COUNT',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_REFSCI_PAST90_COUNT: undefined,
            category: 'referral history',
            contributionValue: -0.00074769856,
            description: 'Count of prior referrals the focus child in the last 90 days that were screened in',
            name: 'PRI_FOCUS_REFSCI_PAST90_COUNT',
            negated_description: null,
            type: 'numeric',
          },
        ],
        positiveFeaturesContrib: [
          {
            PRI_FOCUS_AGE_AT_REFERRAL: 0,
            category: 'demographics',
            contributionValue: 0.17030227689000002,
            description: 'Age of the child in focus at time of referral',
            name: 'PRI_FOCUS_AGE_AT_REFERRAL',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST90_LOS: 0,
            category: 'placement history',
            contributionValue: 0.013295068850000001,
            description: 'Count of days the child in focus was in a child welfare placement in the last 90 days',
            name: 'PRI_FOCUS_PLSM_PAST90_LOS',
            negated_description: null,
            type: 'numeric',
          },
          {
            PRI_FOCUS_PLSM_PAST90_DUMMY: 0,
            category: 'placement history',
            contributionValue: 0.0021496224,
            description: 'The child in focus had a child welfare placement in the last 90 days',
            name: 'PRI_FOCUS_PLSM_PAST90_DUMMY',
            negated_description: 'The child in focus has NOT had a child welfare placement in the last 90 days',
            type: 'binary',
          },
          {
            PRI_FOCUS_PLSM_PAST90_COUNT: 0,
            category: 'placement history',
            contributionValue: 0.00177941188,
            description: 'Count of child welfare placement episodes the child in focus had in the last 90 days',
            name: 'PRI_FOCUS_PLSM_PAST90_COUNT',
            negated_description: null,
            type: 'numeric',
          },
        ],
      });
    });
  });

  describe('getModelPredictionPayload()', () => {
    it('returns the current prediction when features are loaded', () => {
      expect(getModelPredictionPayload(testState)).toEqual({
        currentFeatures: [
          ['PRI_FOCUS_PLSM_PAST90_DUMMY', 0],
          ['PRI_FOCUS_PLSM_PAST180_DUMMY', 0],
          ['PRI_FOCUS_PLSM_PAST365_DUMMY', 0],
          ['PRI_FOCUS_PLSM_PAST730_DUMMY', 0],
        ],
        reversedFeatures: [
          ['PRI_FOCUS_PLSM_PAST90_DUMMY', 1],
          ['PRI_FOCUS_PLSM_PAST180_DUMMY', 1],
          ['PRI_FOCUS_PLSM_PAST365_DUMMY', 1],
          ['PRI_FOCUS_PLSM_PAST730_DUMMY', 1],
        ],
      });
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
      expect(getModelPredictionData(testState)).toEqual({
        PRI_FOCUS_PLSM_PAST90_DUMMY: { reversedScore: 9, currentDifference: -1 },
        PRI_FOCUS_PLSM_PAST180_DUMMY: { reversedScore: 10, currentDifference: 0 },
        PRI_FOCUS_PLSM_PAST365_DUMMY: { reversedScore: 10, currentDifference: 0 },
        PRI_FOCUS_PLSM_PAST730_DUMMY: { reversedScore: 12, currentDifference: 2 },
        PRI_FOCUS_PLSM_EVER: { reversedScore: 13, currentDifference: 3 },
        PRI_FOCUS_CYF_ACTIVE: { reversedScore: 10, currentDifference: 0 },
        PRI_FOCUS_JUVENILE_JUSTICE: { reversedScore: 14, currentDifference: 4 },
        PRI_FOCUS_COURT_ACTIVE: { reversedScore: 4, currentDifference: -6 },
        PRI_PRNT_REF_AS_CHILD: { reversedScore: 10, currentDifference: 0 },
        PRI_PRNT_PLSM_AS_CHILD: { reversedScore: 10, currentDifference: 0 },
        PRI_PRNT_CYF_ACTIVE: { reversedScore: 10, currentDifference: 0 },
        PRI_PERP_REF_AS_CHILD: { reversedScore: 10, currentDifference: 0 },
        PRI_PERP_PLSM_AS_CHILD: { reversedScore: 10, currentDifference: 0 },
        PRI_OTHC_GENDER_MISS_COUNT: { reversedScore: 12, currentDifference: 2 },
        PRI_OTHC_CYF_ACTIVE: { reversedScore: 10, currentDifference: 0 },
        PRI_OTHA_REF_AS_CHILD: { reversedScore: 10, currentDifference: 0 },
        PRI_OTHA_PLSM_AS_CHILD: { reversedScore: 10, currentDifference: 0 },
        PRI_OTHA_CYF_ACTIVE: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_CD_NOW: { reversedScore: 11, currentDifference: 1 },
        PRI_CBMS_FOCUS_CD_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_CD_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_CH_NOW: { reversedScore: 9, currentDifference: -1 },
        PRI_CBMS_FOCUS_CH_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_CH_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_CP_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_CP_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_CP_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_CW_NOW: { reversedScore: 11, currentDifference: 1 },
        PRI_CBMS_FOCUS_CW_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_CW_EVER: { reversedScore: 12, currentDifference: 2 },
        PRI_CBMS_FOCUS_DF_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_DF_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_DF_EVER: { reversedScore: 12, currentDifference: 2 },
        PRI_CBMS_FOCUS_EX_NOW: { reversedScore: 11, currentDifference: 1 },
        PRI_CBMS_FOCUS_EX_1: { reversedScore: 9, currentDifference: -1 },
        PRI_CBMS_FOCUS_EX_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FM_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FM_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FM_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FP_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FP_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FP_EVER: { reversedScore: 12, currentDifference: 2 },
        PRI_CBMS_FOCUS_FS_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FS_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FS_EVER: { reversedScore: 9, currentDifference: -1 },
        PRI_CBMS_FOCUS_FT_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FT_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FT_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_LS_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_LS_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_LS_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_LT_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_LT_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_LT_EVER: { reversedScore: 3, currentDifference: -7 },
        PRI_CBMS_FOCUS_MA_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_MA_1: { reversedScore: 8, currentDifference: -2 },
        PRI_CBMS_FOCUS_MA_EVER: { reversedScore: 9, currentDifference: -1 },
        PRI_CBMS_FOCUS_MS_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_MS_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_MS_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_NM_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_NM_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_NM_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_PE_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_PE_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_PE_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_WW_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_WW_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_WW_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_CD_DENY: { reversedScore: 9, currentDifference: -1 },
        PRI_CBMS_FOCUS_CH_DENY: { reversedScore: 9, currentDifference: -1 },
        PRI_CBMS_FOCUS_CP_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_CW_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_DF_DENY: { reversedScore: 9, currentDifference: -1 },
        PRI_CBMS_FOCUS_EX_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FM_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FP_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FS_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_FT_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_LS_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_LT_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_MA_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_MS_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_NM_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_FOCUS_PE_DENY: { reversedScore: 9, currentDifference: -1 },
        PRI_CBMS_FOCUS_WW_DENY: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_AF_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_AF_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_AF_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_AM_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_AM_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_AM_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_AP_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_AP_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_AP_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CD_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CD_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CD_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CH_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CH_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CH_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CP_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CP_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CP_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CW_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CW_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_CW_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_DF_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_DF_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_DF_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_EX_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_EX_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_EX_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FM_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FM_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FM_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FP_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FP_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FP_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FS_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FS_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FS_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FT_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FT_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_FT_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_LS_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_LS_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_LS_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_LT_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_LT_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_LT_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_MA_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_MA_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_MA_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_MS_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_MS_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_MS_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_NM_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_NM_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_NM_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_PE_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_PE_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_PE_EVER: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_WW_NOW: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_WW_1: { reversedScore: 10, currentDifference: 0 },
        PRI_CBMS_ADULT_WW_EVER: { reversedScore: 10, currentDifference: 0 },
      });
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
      expect(getFeatureCategories(testState)).toEqual([
        { abbreviation: 'RO', color: '#B30202', name: 'roles' },
        { abbreviation: 'DG', color: '#f2994a', name: 'demographics' },
        { abbreviation: 'CR', color: '#21b0b0', name: 'current referral' },
        { abbreviation: 'PH', color: '#27ae60', name: 'placement history' },
        { abbreviation: 'RH', color: '#9B51E0', name: 'referral history' },
        { abbreviation: 'AH', color: '#B32D90', name: 'founded allegation history' },
        { abbreviation: 'CW', color: '#C93655', name: 'child welfare active' },
        { abbreviation: 'JJ', color: '#219653', name: 'juvenile justice' },
        { abbreviation: 'DC', color: '#024EB3', name: 'dependency court' },
        { abbreviation: 'PI', color: '#9e09b8', name: 'program involvement' },
        { abbreviation: 'SA', color: '#b8096e', name: 'sanctions' },
        { abbreviation: 'DP', color: '#2e6ccb', name: 'diversion payments' },
      ]);
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
      expect(getReversedModelPredFeatures(testState)).toEqual([
        {
          PRI_FOCUS_PLSM_PAST90_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0.0021496224,
          description: 'The child in focus had a child welfare placement in the last 90 days',
          modelPrediction: { currentDifference: -1, reversedScore: 9 },
          name: 'PRI_FOCUS_PLSM_PAST90_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 90 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST180_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'The child in focus had a child welfare placement in the last 180 days',
          modelPrediction: { currentDifference: 0, reversedScore: 10 },
          name: 'PRI_FOCUS_PLSM_PAST180_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 180 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST365_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'The child in focus had a child welfare placement in the last 365 days',
          modelPrediction: { currentDifference: 0, reversedScore: 10 },
          name: 'PRI_FOCUS_PLSM_PAST365_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 365 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST730_DUMMY: 0,
          category: 'placement history',
          contributionValue: -0.0161774817,
          description: 'The child in focus had a child welfare placement in the last 730 days',
          modelPrediction: { currentDifference: 2, reversedScore: 12 },
          name: 'PRI_FOCUS_PLSM_PAST730_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 730 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_EVER: undefined,
          category: 'placement history',
          contributionValue: -0.029091358800000005,
          description:
            'Child in focus has ever had an out of home placement. Only includes placements more than 2 years prior to referral date.',
          modelPrediction: { currentDifference: 3, reversedScore: 13 },
          name: 'PRI_FOCUS_PLSM_EVER',
          negated_description:
            'Child in focus has never had an out of home placement. Only includes placements more than 2 years prior to referral date.',
          type: 'binary',
        },
      ]);
    });

    it('returns all the features matching the search field', () => {
      testState.features.filterCriteria = 'The child in focus had a child welfare placement in the last 90 days';

      expect(getReversedModelPredFeatures(testState)).toEqual([
        {
          PRI_FOCUS_PLSM_PAST90_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0.0021496224,
          description: 'The child in focus had a child welfare placement in the last 90 days',
          modelPrediction: { currentDifference: -1, reversedScore: 9 },
          name: 'PRI_FOCUS_PLSM_PAST90_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 90 days',
          type: 'binary',
        },
      ]);
    });

    it('returns all the features matching the category filter', () => {
      testState.features.filterCategs = ['placement history'];

      expect(getReversedModelPredFeatures(testState)).toEqual([
        {
          PRI_FOCUS_PLSM_PAST90_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0.0021496224,
          description: 'The child in focus had a child welfare placement in the last 90 days',
          modelPrediction: { currentDifference: -1, reversedScore: 9 },
          name: 'PRI_FOCUS_PLSM_PAST90_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 90 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST180_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'The child in focus had a child welfare placement in the last 180 days',
          modelPrediction: { currentDifference: 0, reversedScore: 10 },
          name: 'PRI_FOCUS_PLSM_PAST180_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 180 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST365_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'The child in focus had a child welfare placement in the last 365 days',
          modelPrediction: { currentDifference: 0, reversedScore: 10 },
          name: 'PRI_FOCUS_PLSM_PAST365_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 365 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST730_DUMMY: 0,
          category: 'placement history',
          contributionValue: -0.0161774817,
          description: 'The child in focus had a child welfare placement in the last 730 days',
          modelPrediction: { currentDifference: 2, reversedScore: 12 },
          name: 'PRI_FOCUS_PLSM_PAST730_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 730 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_EVER: undefined,
          category: 'placement history',
          contributionValue: -0.029091358800000005,
          description:
            'Child in focus has ever had an out of home placement. Only includes placements more than 2 years prior to referral date.',
          modelPrediction: { currentDifference: 3, reversedScore: 13 },
          name: 'PRI_FOCUS_PLSM_EVER',
          negated_description:
            'Child in focus has never had an out of home placement. Only includes placements more than 2 years prior to referral date.',
          type: 'binary',
        },
      ]);
    });

    it('returns all the features matching the contribution filter', () => {
      testState.features.diffFilterVal = 'risk';

      expect(getReversedModelPredFeatures(testState)).toEqual([
        {
          PRI_FOCUS_PLSM_PAST90_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0.0021496224,
          description: 'The child in focus had a child welfare placement in the last 90 days',
          modelPrediction: { currentDifference: -1, reversedScore: 9 },
          name: 'PRI_FOCUS_PLSM_PAST90_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 90 days',
          type: 'binary',
        },
      ]);
    });
  });

  describe('getSortedByImportanceFeatures()', () => {
    it('returns all the features sorted by importance', () => {
      expect(getSortedByImportanceFeatures(testState)).toEqual([
        {
          PRI_FOCUS_PLSM_PAST90_LOS: 0,
          category: 'placement history',
          contributionValue: 0.013295068850000001,
          description: 'Count of days the child in focus was in a child welfare placement in the last 90 days',
          featureImportance: 0.08042322147600664,
          name: 'PRI_FOCUS_PLSM_PAST90_LOS',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST90_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0.0021496224,
          description: 'The child in focus had a child welfare placement in the last 90 days',
          featureImportance: 0.010154942842355652,
          name: 'PRI_FOCUS_PLSM_PAST90_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 90 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST90_COUNT: 0,
          category: 'placement history',
          contributionValue: 0.00177941188,
          description: 'Count of child welfare placement episodes the child in focus had in the last 90 days',
          featureImportance: 0.008524681831138992,
          name: 'PRI_FOCUS_PLSM_PAST90_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_AGE_AT_REFERRAL: 0,
          category: 'demographics',
          contributionValue: 0.17030227689000002,
          description: 'Age of the child in focus at time of referral',
          featureImportance: 0,
          name: 'PRI_FOCUS_AGE_AT_REFERRAL',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST180_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'The child in focus had a child welfare placement in the last 180 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST180_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 180 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST365_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'The child in focus had a child welfare placement in the last 365 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST365_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 365 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST180_LOS: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'Count of days the child in focus was in a child welfare placement in the last 180 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST180_LOS',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST365_LOS: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'Count of days the child in focus was in a child welfare placement in the last 365 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST365_LOS',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST730_LOS: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'Count of days the child in focus was in a child welfare placement in the last 730 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST730_LOS',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_REFSCI_PAST180_COUNT: undefined,
          category: 'referral history',
          contributionValue: 0,
          description: 'Count of prior referrals the focus child in the last 180 days that were screened in',
          featureImportance: 0,
          name: 'PRI_FOCUS_REFSCI_PAST180_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_REFSCI_PAST90_COUNT: undefined,
          category: 'referral history',
          contributionValue: -0.00074769856,
          description: 'Count of prior referrals the focus child in the last 90 days that were screened in',
          featureImportance: 0,
          name: 'PRI_FOCUS_REFSCI_PAST90_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST365_COUNT: 0,
          category: 'placement history',
          contributionValue: -0.0017823015000000002,
          description: 'Count of child welfare placement episodes the child in focus had in the last 365 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST365_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST180_COUNT: 0,
          category: 'placement history',
          contributionValue: -0.00272553132,
          description: 'Count of child welfare placement episodes the child in focus had in the last 180 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST180_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST730_COUNT: 0,
          category: 'placement history',
          contributionValue: -0.0043466519999999995,
          description: 'Count of child welfare placement episodes the child in focus had in the last 730 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST730_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST730_DUMMY: 0,
          category: 'placement history',
          contributionValue: -0.0161774817,
          description: 'The child in focus had a child welfare placement in the last 730 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST730_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 730 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_EVER: undefined,
          category: 'placement history',
          contributionValue: -0.029091358800000005,
          description:
            'Child in focus has ever had an out of home placement. Only includes placements more than 2 years prior to referral date.',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_EVER',
          negated_description:
            'Child in focus has never had an out of home placement. Only includes placements more than 2 years prior to referral date.',
          type: 'binary',
        },
        {
          PRI_FOCUS_REFSCI_PAST730_COUNT: undefined,
          category: 'referral history',
          contributionValue: -0.05318989026,
          description: 'Count of prior referrals the focus child in the last 730 days that were screened in',
          featureImportance: 0,
          name: 'PRI_FOCUS_REFSCI_PAST730_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_REFSCI_PAST365_COUNT: undefined,
          category: 'referral history',
          contributionValue: -0.08907336099999999,
          description: 'Count of prior referrals the focus child in the last 365 days that were screened in',
          featureImportance: 0,
          name: 'PRI_FOCUS_REFSCI_PAST365_COUNT',
          negated_description: null,
          type: 'numeric',
        },
      ]);
    });

    it('returns all the features sorted by importance desc', () => {
      testState.features.featureImpSortDir = 'desc';
      expect(getSortedByImportanceFeatures(testState)).toEqual([
        {
          PRI_FOCUS_AGE_AT_REFERRAL: 0,
          category: 'demographics',
          contributionValue: 0.17030227689000002,
          description: 'Age of the child in focus at time of referral',
          featureImportance: 0,
          name: 'PRI_FOCUS_AGE_AT_REFERRAL',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST180_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'The child in focus had a child welfare placement in the last 180 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST180_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 180 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST365_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'The child in focus had a child welfare placement in the last 365 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST365_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 365 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST180_LOS: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'Count of days the child in focus was in a child welfare placement in the last 180 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST180_LOS',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST365_LOS: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'Count of days the child in focus was in a child welfare placement in the last 365 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST365_LOS',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST730_LOS: 0,
          category: 'placement history',
          contributionValue: 0,
          description: 'Count of days the child in focus was in a child welfare placement in the last 730 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST730_LOS',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_REFSCI_PAST180_COUNT: undefined,
          category: 'referral history',
          contributionValue: 0,
          description: 'Count of prior referrals the focus child in the last 180 days that were screened in',
          featureImportance: 0,
          name: 'PRI_FOCUS_REFSCI_PAST180_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_REFSCI_PAST90_COUNT: undefined,
          category: 'referral history',
          contributionValue: -0.00074769856,
          description: 'Count of prior referrals the focus child in the last 90 days that were screened in',
          featureImportance: 0,
          name: 'PRI_FOCUS_REFSCI_PAST90_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST365_COUNT: 0,
          category: 'placement history',
          contributionValue: -0.0017823015000000002,
          description: 'Count of child welfare placement episodes the child in focus had in the last 365 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST365_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST180_COUNT: 0,
          category: 'placement history',
          contributionValue: -0.00272553132,
          description: 'Count of child welfare placement episodes the child in focus had in the last 180 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST180_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST730_COUNT: 0,
          category: 'placement history',
          contributionValue: -0.0043466519999999995,
          description: 'Count of child welfare placement episodes the child in focus had in the last 730 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST730_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST730_DUMMY: 0,
          category: 'placement history',
          contributionValue: -0.0161774817,
          description: 'The child in focus had a child welfare placement in the last 730 days',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_PAST730_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 730 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_EVER: undefined,
          category: 'placement history',
          contributionValue: -0.029091358800000005,
          description:
            'Child in focus has ever had an out of home placement. Only includes placements more than 2 years prior to referral date.',
          featureImportance: 0,
          name: 'PRI_FOCUS_PLSM_EVER',
          negated_description:
            'Child in focus has never had an out of home placement. Only includes placements more than 2 years prior to referral date.',
          type: 'binary',
        },
        {
          PRI_FOCUS_REFSCI_PAST730_COUNT: undefined,
          category: 'referral history',
          contributionValue: -0.05318989026,
          description: 'Count of prior referrals the focus child in the last 730 days that were screened in',
          featureImportance: 0,
          name: 'PRI_FOCUS_REFSCI_PAST730_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_REFSCI_PAST365_COUNT: undefined,
          category: 'referral history',
          contributionValue: -0.08907336099999999,
          description: 'Count of prior referrals the focus child in the last 365 days that were screened in',
          featureImportance: 0,
          name: 'PRI_FOCUS_REFSCI_PAST365_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST90_COUNT: 0,
          category: 'placement history',
          contributionValue: 0.00177941188,
          description: 'Count of child welfare placement episodes the child in focus had in the last 90 days',
          featureImportance: 0.008524681831138992,
          name: 'PRI_FOCUS_PLSM_PAST90_COUNT',
          negated_description: null,
          type: 'numeric',
        },
        {
          PRI_FOCUS_PLSM_PAST90_DUMMY: 0,
          category: 'placement history',
          contributionValue: 0.0021496224,
          description: 'The child in focus had a child welfare placement in the last 90 days',
          featureImportance: 0.010154942842355652,
          name: 'PRI_FOCUS_PLSM_PAST90_DUMMY',
          negated_description: 'The child in focus has NOT had a child welfare placement in the last 90 days',
          type: 'binary',
        },
        {
          PRI_FOCUS_PLSM_PAST90_LOS: 0,
          category: 'placement history',
          contributionValue: 0.013295068850000001,
          description: 'Count of days the child in focus was in a child welfare placement in the last 90 days',
          featureImportance: 0.08042322147600664,
          name: 'PRI_FOCUS_PLSM_PAST90_LOS',
          negated_description: null,
          type: 'numeric',
        },
      ]);
    });

    it('returns empty array if features are loading', () => {
      testState.features.isFeaturesLoading = true;
      expect(getSortedByImportanceFeatures(testState).length).toEqual(0);
    });
  });
});
