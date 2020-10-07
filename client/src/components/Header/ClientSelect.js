import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { getEntitiesInCaseList, getIsEntitiesInCaseLoading, getEntitiesScore } from '../../model/selectors/cases';

import { setEntityIdAction } from '../../model/actions/entities';

import { matchArrToArrOfObj } from '../Score/components/helpers';

import './ClientSelect.scss';

const optionStyles = {
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused && '#F2F2F2',
    color: '#4F4F4F',
  }),
};

const ClientSelect = ({
  entitiesInCaseList,
  entitiesScoreList,
  updateEntityId,
  isCaseEntitiesLoading,
  onEntityIdChange,
}) => {
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

    let tempResultScore;

    const searchScore = (key, categories) => {
      categories.forEach((value, i) => {
        if (categories[i].id === key) {
          tempResultScore = categories[i].risk;
        }
      });

      return tempResultScore;
    };

    const resultScore = searchScore(val.id, formatCategories);

    onEntityIdChange(resultScore);
  };

  const placeholder = (
    <div className="placeholder-wrapper">
      <div>Client ID</div>
      <div>{!isCaseEntitiesLoading ? clientIds[0].id : null}</div>
    </div>
  );

  const formatOptionLabel = ({ id, label, selected }, { context }) => {
    let isLabelSelected;

    if (selectedVal) {
      isLabelSelected = selectedVal.id === label;
    }

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
      options={clientIds}
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
    isCaseEntitiesLoading: getIsEntitiesInCaseLoading(state),
  }),
  (dispatch) => ({
    updateEntityId: (entityId) => dispatch(setEntityIdAction(entityId)),
  }),
)(ClientSelect);
