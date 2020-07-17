import { createSelector } from 'reselect';
import Cookies from 'universal-cookie';

export const getIsEntitiesLoading = (state) => state.entities.isEntityDataLoading;
export const getCurrentEntityData = (state) => state.entities.entityData;
export const getIsEntityContributionsLoading = (state) => state.entities.isEntityontributionsLoading;
export const getIsEntityContribLoading = (state) => state.entities.isEntityContributionsLoading;
export const getEntityContributions = (state) => state.entities.entityContributions;
export const getIsEntityScoreLoading = (state) => state.entities.isEntityScoreLoading;
export const getEntityScore = (state) => state.entities.entityScore;

export const currentEntityID = (state) => state.entities.entityID;

export const getCurrentEntityID = createSelector([currentEntityID], (entityID) => {
  const cookies = new Cookies();

  if (entityID === null) {
    entityID = cookies.get('entityID');
  }
  return entityID;
});

// @TODO - finish and use this selector for entityData,
// this sorts contributions in descendat order
export const getCurrentEntityDataSorted = createSelector(
  [getIsEntitiesLoading, getCurrentEntityData],
  (isEntitiesLoading, currentEntities) => {
    if (isEntitiesLoading) {
      return [];
    }

    const { contributions } = currentEntities;
    let sortedContrib = [];
    for (let currentContrib in contributions) {
      sortedContrib.push([currentContrib, Number(contributions[currentContrib])]);
    }

    sortedContrib.sort((a, b) => b[1] - a[1]);

    return currentEntities;
  },
);
