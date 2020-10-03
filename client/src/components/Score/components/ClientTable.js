import React from 'react';
import { connect } from 'react-redux';

import { matchArrToArrOfObj } from './helpers';

import './ClientTable.scss';

import { setHoverRowAction, resetHoverRowAction } from '../../../model/actions/cases';

const CategoryTable = ({ entitiesInCaseList, entitiesScoreList, setHoveredRow, resetHoveredRow }) => {
  const entitiesScoreListOutput = entitiesScoreList.map((entity) => entity.output);

  const formatKeyValCategories = ([id, risk]) => ({ id, risk });

  const formatCategories = matchArrToArrOfObj(entitiesInCaseList, entitiesScoreListOutput, formatKeyValCategories);

  const renderHeader = () => {
    let headerElement = ['Client Id', 'Risk Category'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  };

  const handleMouseEnter = (e, risk) => {
    setHoveredRow(risk);
  };

  const handleMouseLeave = (e, risk) => {
    resetHoveredRow(risk);
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
  () => ({}),
  (dispatch) => ({
    setHoveredRow: (rowNo) => dispatch(setHoverRowAction(rowNo)),
    resetHoveredRow: (rowNo) => dispatch(resetHoverRowAction(rowNo)),
  }),
)(CategoryTable);
