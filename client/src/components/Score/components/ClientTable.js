import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { matchArrToArrOfObj } from './helpers';

import './ClientTable.scss';

import { hoverRowIdAction, hoverOffRowAction } from '../../../model/actions/cases';
import { getIsEntitiesInCaseLoading, getScoreRowId } from '../../../model/selectors/cases';

const CategoryTable = ({
  entitiesInCaseList,
  entitiesScoreList,
  hoverRowOn,
  hoverRowOff,
  isCaseEntitiesLoading,
  data,
  scoreRowId,
}) => {
  const [hoveredClass, setHoveredClass] = useState('');

  const entitiesScoreListOutput = entitiesScoreList.map((entity) => entity.output);

  const formatKeyValCategories = ([id, risk]) => ({ id, risk });

  const formatCategories = matchArrToArrOfObj(entitiesInCaseList, entitiesScoreListOutput, formatKeyValCategories);

  const chartData = data[0].values;

  const ratedIdCategories = formatCategories.map((category, index) => ({
    ...category,
    row_id: chartData[index].id,
  }));

  useEffect(() => {
    if (!isCaseEntitiesLoading && ratedIdCategories) {
      const firstRowId = ratedIdCategories[0].row_id;

      if (scoreRowId === null) {
        hoverRowOn(firstRowId);
        setHoveredClass('hovered');
      }
    }
  }, [isCaseEntitiesLoading, ratedIdCategories, scoreRowId, hoverRowOn]);

  const renderHeader = () => {
    let headerElement = ['Client Id', 'Risk Score'];

    return headerElement.map((head) => <th key={uuidv4()}>{head}</th>);
  };

  const handleMouseEnter = (row_id) => {
    setHoveredClass('');
    hoverRowOn(row_id);
  };

  const renderBody = () => {
    return (
      ratedIdCategories &&
      ratedIdCategories.map(({ id, risk, row_id }, i) => (
        <tr
          className={i === 0 ? hoveredClass : ''}
          onMouseEnter={() => handleMouseEnter(row_id)}
          onMouseLeave={() => hoverRowOff(row_id)}
          key={id}
        >
          <td>{id}</td>
          <td>{risk}</td>
        </tr>
      ))
    );
  };

  return (
    <div className="table-wrapper">
      <div className="title">Risk Score by Client</div>
      <div className="scroll-wrapper">
        <table className="table-category">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    isCaseEntitiesLoading: getIsEntitiesInCaseLoading(state),
    scoreRowId: getScoreRowId(state),
  }),

  (dispatch) => ({
    hoverRowOn: (rowId) => dispatch(hoverRowIdAction(rowId)),
    hoverRowOff: (rowId) => dispatch(hoverOffRowAction(rowId)),
  }),
)(CategoryTable);
