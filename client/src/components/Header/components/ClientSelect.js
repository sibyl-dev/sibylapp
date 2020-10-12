import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { getEntitiesInCaseList, getEntitiesScore } from '../../../model/selectors/cases';

import { setEntityIdAction } from '../../../model/actions/entities';

import { matchArrToArrOfObj } from '../../Score/components/helpers';

import { loadState } from './localStorage';

import './ClientSelect.scss';

const optionStyles = {
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused && '#F2F2F2',
    color: '#4F4F4F',
  }),
};

const ClientSelect = ({ entitiesInCaseList, entitiesScoreList, updateEntityId, onEntityIdChange }) => {
  const [entityId, setEntityId] = useState(null);

  const [selectedVal, setSelectedVal] = useState(null);

  const clientIds = entitiesInCaseList.map((id) => ({
    id,
    label: id,
    selected: 'Selected',
  }));

  const onChangeEntityID = (val) => {
    updateEntityId(val.id);
    setEntityId(val);
    setSelectedVal(val);

    const entitiesScoreListOutput = entitiesScoreList.map((entity) => entity.output);

    const formatKeyValCategories = ([id, risk]) => ({ id, risk });

    const formatCategories = matchArrToArrOfObj(entitiesInCaseList, entitiesScoreListOutput, formatKeyValCategories);

    let resultScore;

    formatCategories.forEach((category) => {
      resultScore = category.risk;
    });

    onEntityIdChange(resultScore);
  };

  const localStorageCasesState = loadState().cases;

  const localStorageClientIds = localStorageCasesState.entitiesInCase;

  const formatLocalStorageClientIds = localStorageClientIds.map((id) => ({
    id,
    label: id,
    selected: 'Selected',
  }));

  const placeholder = (
    <div className="placeholder-wrapper">
      <div>Client ID</div>
      <div>{clientIds[0]?.id || formatLocalStorageClientIds[0]}</div>
    </div>
  );

  const formatOptionLabel = ({ label, selected }, { context }) => {
    const isLabelSelected = selectedVal && selectedVal.id === label;

    return (
      <div className="option-label">
        <div>{label}</div>
        <div className="option-selected">{context === 'value' ? '' : isLabelSelected ? selected : ''}</div>
      </div>
    );
  };

  return (
    <Select
      classNamePrefix="sibyl-select-client"
      className="sibyl-select-client"
      options={clientIds || formatLocalStorageClientIds}
      placeholder={placeholder}
      isSearchable={false}
      onChange={onChangeEntityID}
      formatOptionLabel={formatOptionLabel}
      value={entityId}
      styles={optionStyles}
    />
  );
};

export default connect(
  (state) => ({
    entitiesInCaseList: getEntitiesInCaseList(state),
    entitiesScoreList: getEntitiesScore(state),
  }),
  (dispatch) => ({
    updateEntityId: (entityId) => dispatch(setEntityIdAction(entityId)),
  }),
)(ClientSelect);
