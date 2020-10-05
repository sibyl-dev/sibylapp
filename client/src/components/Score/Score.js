import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { getCasesList, getEntitiesInCaseList, getEntitiesScore } from '../../model/selectors/cases';
import { getSelectedModelID } from '../../model/selectors/entities';
import { getCasesListAction, getEntitiesInCaseListAction } from '../../model/actions/cases';

import ReferralSelect from './components/ReferralSelect';
import ClientTable from './components/ClientTable';
import LineChart from '../common/LineChart/LineChart';

const chartData = [
  {
    name: 'Client',
    values: [
      { x: 1, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
      { x: 6, y: 3 },
      { x: 7, y: 3 },
      { x: 8, y: 4 },
      { x: 9, y: 5 },
      { x: 10, y: 6 },
      { x: 11, y: 7 },
      { x: 12, y: 8 },
      { x: 13, y: 8 },
      { x: 14, y: 11 },
      { x: 15, y: 14 },
      { x: 16, y: 16 },
      { x: 17, y: 20 },
      { x: 18, y: 24 },
      { x: 19, y: 32 },
      { x: 20, y: 48 },
    ],
  },
];

const chartDataWithIds = chartData.map((point) => ({
  ...point,
  values: point.values.map((valuePoint) => ({ ...valuePoint, id: uuidv4() })),
}));

const Score = ({
  modelID,
  casesList,
  entitiesInCaseList,
  entitiesScoreList,
  getCurrentCasesList,
  getCurrentEntitiesInCase,
}) => {
  useEffect(() => {
    if (modelID) {
      getCurrentCasesList();
    }
  }, [getCurrentCasesList, modelID]);

  return (
    <>
      <ReferralSelect
        casesList={casesList}
        entitiesInCaseList={entitiesInCaseList}
        getCurrentCasesList={getCurrentCasesList}
        getCurrentEntitiesInCase={getCurrentEntitiesInCase}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <LineChart width={650} height={650} data={chartDataWithIds} />
        <ClientTable
          entitiesInCaseList={entitiesInCaseList}
          entitiesScoreList={entitiesScoreList}
          data={chartDataWithIds}
        />
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    modelID: getSelectedModelID(state),
    casesList: getCasesList(state),
    entitiesInCaseList: getEntitiesInCaseList(state),
    entitiesScoreList: getEntitiesScore(state),
  }),
  (dispatch) => ({
    getCurrentCasesList: () => dispatch(getCasesListAction()),
    getCurrentEntitiesInCase: () => dispatch(getEntitiesInCaseListAction()),
  }),
)(Score);
