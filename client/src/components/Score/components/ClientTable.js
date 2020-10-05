import React from 'react';
import { connect } from 'react-redux';

import { matchArrToArrOfObj } from './helpers';

import './ClientTable.scss';

import { hoverRowIdAction, hoverOffRowAction } from '../../../model/actions/cases';

const CategoryTable = ({ entitiesInCaseList, entitiesScoreList, hoverRowOn, hoverRowOff, data }) => {
  const entitiesScoreListOutput = entitiesScoreList.map((entity) => entity.output);

  const formatKeyValCategories = ([id, risk]) => ({ id, risk });

  const formatCategories = matchArrToArrOfObj(entitiesInCaseList, entitiesScoreListOutput, formatKeyValCategories);

  const chartData = data[0].values;

  const categoriesWithRateId = formatCategories.map((category, index) => ({
    ...category,
    row_id: chartData[index].id,
  }));

  const renderHeader = () => {
    let headerElement = ['Client Id', 'Risk Score'];

    return headerElement.map((key, index) => <th key={`header-el-${index}`}>{key}</th>);
  };

  const renderBody = () => {
    return (
      categoriesWithRateId &&
      categoriesWithRateId.map(({ id, risk, row_id }) => (
        <tr onMouseEnter={() => hoverRowOn(row_id)} onMouseLeave={() => hoverRowOff(row_id)} key={id}>
          <td>{id}</td>
          <td>{risk}</td>
        </tr>
      ))
    );
  };

  return (
    <div className="table-wrapper">
      <div className="title">Risk Score by Client</div>
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
    hoverRowOn: (rowId) => dispatch(hoverRowIdAction(rowId)),
    hoverRowOff: (rowId) => dispatch(hoverOffRowAction(rowId)),
  }),
)(CategoryTable);
