import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './ClientTable.scss';

import { getEntitiesInCaseList } from '../../../model/selectors/cases';
import { getEntitiesScore } from '../../../model/selectors/cases';
import { getEntitiesInCaseListAction, setHoverRowAction, ressetHoverRowAction } from '../../../model/actions/cases';
import { getEntityPredictionScoreAction } from '../../../model/actions/entities';

const CategoryTable = ({
  entitiesInCaseList,
  getCurrentEntitiesInCase,
  entitiesScoreList,
  setHoveredRow,
  resetHoveredRow,
}) => {
  useEffect(() => {
    getCurrentEntitiesInCase();
  }, [getCurrentEntitiesInCase]);

  const entitiesScoreListOutput = entitiesScoreList.map((entity) => entity.output);

  const riskCategories = {};

  for (let i = 0; i < entitiesInCaseList.length; i++) {
    riskCategories[entitiesInCaseList[i]] = entitiesScoreListOutput[i];
  }

  const formatCategories = Object.entries(riskCategories).map(([id, risk]) => ({ id, risk }));

  const renderHeader = () => {
    let headerElement = ['Client Id', 'Risk Category'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  };

  const renderBody = () => {
    return (
      formatCategories &&
      formatCategories.map(({ id, risk }) => {
        return (
          <tr
            onMouseEnter={(e) => {
              handleMouseEnter(e, risk);
            }}
            onMouseLeave={(e) => {
              handleMouseLeave(e, risk);
            }}
            key={id}
          >
            <td>{id}</td>
            <td>{risk}</td>
          </tr>
        );
      })
    );
  };

  const handleMouseEnter = (e, risk) => {
    setHoveredRow(risk);
  };

  const handleMouseLeave = (e, risk) => {
    resetHoveredRow(risk);
  };

  return (
    <div className="table-wrapper">
      <div className="title">Risk Category by Client</div>
      <table className="table-category">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};

export default connect(
  (state) => ({
    entitiesInCaseList: getEntitiesInCaseList(state),
    entitiesScoreList: getEntitiesScore(state),
  }),
  (dispatch) => ({
    getCurrentEntitiesInCase: () => dispatch(getEntitiesInCaseListAction()),
    loadPredictionScore: () => dispatch(getEntityPredictionScoreAction()),
    setHoveredRow: (rowNo) => dispatch(setHoverRowAction(rowNo)),
    resetHoveredRow: (rowNo) => dispatch(ressetHoverRowAction(rowNo)),
  }),
)(CategoryTable);
