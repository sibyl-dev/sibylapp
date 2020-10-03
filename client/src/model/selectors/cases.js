import { createSelector } from 'reselect';

export const getCasesList = (state) => state.cases.casesList;
export const getEntitiesInCaseList = (state) => state.cases.entitiesInCase;
export const getCurrentCaseID = (state) => state.cases.caseID;
export const getEntitiesScore = (state) => state.cases.entitiesScore;
export const getHoverRowNo = (state) => state.cases.hoveredRow;
export const getIsEntitiesInCaseLoading = (state) => state.cases.isEntitiesInCaseLoading;
export const getIsEntitiesScoreLoading = (state) => state.cases.isEntitiesScoreLoading;

export const getCurrentCasesList = createSelector([getCasesList], (casesList) =>
  casesList.length === 0 ? casesList : [],
);

export const getCurrentEntitiesInCaseList = createSelector([getEntitiesInCaseList], (casesList) =>
  casesList.length === 0 ? casesList : [],
);
