import defaultState from './states/entities.default';

import {
  currentEntityID,
  currentUserID,
  getActivePredictionScore,
  getCurrentEntityData,
  getCurrentEntityID,
  getCurrentModels,
  getCurrentOutcomeData,
  getCurrentUserID,
  getEntityContributions,
  getEntityDistributions,
  getEntityScore,
  getIsEntitiesLoading,
  getIsEntityDistributionsLoading,
  getIsEntityScoreLoading,
  getIsModelsLoading,
  getIsOutcomeDataLoading,
  getPredictionScore,
  getSelectedModelID,
} from '../../model/selectors/entities';

describe('Simple Entities Selectors', () => {
  describe('getIsEntitiesLoading()', () => {
    it('returns the entities loading state', () => {
      expect(getIsEntitiesLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getCurrentEntityData()', () => {
    it('return the entity data object', () => {
      expect(getCurrentEntityData(defaultState)).toEqual(defaultState.entities.entityData);
    });
  });

  describe('getIsEntityContribLoading()', () => {
    it('returns the entity contributions loading state', () => {
      expect(getIsEntitiesLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getEntityContributions()', () => {
    it('returns the entity contributions', () => {
      expect(getEntityContributions(defaultState)).toEqual(defaultState.entities.entityContributions);
    });
  });

  describe('getIsEntityScoreLoading()', () => {
    it('returns the entity score loading state', () => {
      expect(getIsEntityScoreLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getEntityScore()', () => {
    it('returns the entity score', () => {
      expect(getEntityScore(defaultState)).toEqual(5.6);
    });
  });

  describe('getIsEntityDistributionsLoading()', () => {
    it('returns the entity distributions loading state', () => {
      expect(getIsEntityDistributionsLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getEntityDistributions()', () => {
    it('returns the entity distributions', () => {
      expect(getEntityDistributions(defaultState)).toEqual({});
    });
  });

  describe('getPredictionScore()', () => {
    it('returns the prediction score', () => {
      expect(getPredictionScore(defaultState)).toEqual(1.23);
    });
  });

  describe('getIsOutcomeDataLoading()', () => {
    it('returns the outcome data loading state', () => {
      expect(getIsOutcomeDataLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getCurrentOutcomeData()', () => {
    it('returns the outcome data', () => {
      expect(getCurrentOutcomeData(defaultState)).toBeNull();
    });
  });

  describe('getIsModelsLoading()', () => {
    it('returns the models loading state', () => {
      expect(getIsModelsLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getCurrentModels()', () => {
    it('returns the current models', () => {
      expect(getCurrentModels(defaultState)).toEqual(defaultState.entities.models);
    });
  });

  describe('currentUserID()', () => {
    it('returns the user id', () => {
      expect(currentUserID(defaultState)).toEqual('testID');
    });
  });

  describe('currentEntityID()', () => {
    it('returns the user id', () => {
      expect(currentEntityID(defaultState)).toEqual('4a');
    });
  });
});

describe('Entities Created Selectors', () => {
  describe('getCurrentEntityID()', () => {
    it('returns the current entityID', () => {
      expect(getCurrentEntityID(defaultState)).toEqual('4a');
    });
    it('returns 0 because entityID is not set', () => {
      expect(getCurrentEntityID({ entities: { entityID: null } })).toEqual(0);
    });
  });
  describe('getSelectedModelID()', () => {
    it('returns the selected modelID', () => {
      expect(getSelectedModelID(defaultState)).toEqual('1');
    });
  });
  describe('getCurrentUserID()', () => {
    it('returns the currentUserID', () => {
      expect(getCurrentUserID(defaultState)).toEqual('testID');
    });
    it('returns `null` string because userID is not set', () => {
      expect(getCurrentUserID({ entities: { userID: null } })).toBeNull();
    });
  });
  describe('getActivePredictionScore()', () => {
    it('returns the prediction score', () => {
      expect(getActivePredictionScore(defaultState)).toEqual(1.23);
    });
    it('returns the entity score when prediction score is null', () => {
      const changedState = {
        entities: {
          predictionScore: null,
          entityScore: 5.6,
        },
      };

      expect(getActivePredictionScore(changedState)).toEqual(5.6);
    });
  });
});
