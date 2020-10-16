import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select, { components } from 'react-select';

import { getEntitiesInCaseList, getEntitiesScore } from '../../../model/selectors/cases';
import { currentEntityID } from '../../../model/selectors/entities';
import { getPageName } from '../../../model/selectors/sidebar';

import { setEntityIdAction, getEntityAction } from '../../../model/actions/entities';

import { matchArrToArrOfObj } from '../../Score/components/helpers';

import { loadState } from './localStorage';

import './ClientSelect.scss';

const optionStyles = {
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused && '#F2F2F2',
    color: '#4F4F4F',
  }),
  control: (styles) => ({
    ...styles,
    border: '1px solid #E0E0E0',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #E0E0E0',
    },
  }),
};

const ClientSelect = ({
  entitiesInCaseList,
  entitiesScoreList,
  updateEntityId,
  onEntityIdChange,
  currentPage,
  getFeaturesList,
  storeEntityID,
}) => {
  useEffect(() => {
    if (entitiesInCaseList.length) {
      updateEntityId(entitiesInCaseList[0]);
    }
  }, [updateEntityId, entitiesInCaseList]);

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

    const searchScore = (lookupKey, categories, idKey, riskKey) => {
      const filteredCategories = categories.filter((category, i) => categories[i][idKey] === lookupKey);

      const foundResultScore = filteredCategories[0][riskKey];

      return foundResultScore;
    };

    const resultScore = searchScore(val.id, formatCategories, 'id', 'risk');

    onEntityIdChange(resultScore);

    const excludedPages = ['Global Feature Importance', 'Feature Distribution'];

    if (!excludedPages.includes(currentPage)) {
      getFeaturesList();
    }
  };

  const localStorageClientIds = loadState().cases.entitiesInCase;

  const formatLocalStorageClientIds = localStorageClientIds.map((id) => ({
    id,
    label: id,
    selected: 'Selected',
  }));

  const placeholder = (
    <div className="placeholder-wrapper">
      <div>Client ID</div>
      {entityId === null ? <div>{clientIds[0]?.id || formatLocalStorageClientIds[0]}</div> : null}
    </div>
  );

  const { ValueContainer, Placeholder } = components;

  const CustomValueContainer = ({ children, ...props }) => (
    <ValueContainer {...props}>
      <Placeholder {...props}>{props.selectProps.placeholder}</Placeholder>
      {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );

  const formatOptionLabel = ({ label, selected }, { context }) => {
    const isLabelSelected = (selectedVal && selectedVal.id === label) || storeEntityID === label;

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
      components={{
        ValueContainer: CustomValueContainer,
      }}
    />
  );
};

export default connect(
  (state) => ({
    storeEntityID: currentEntityID(state),
    currentPage: getPageName(state),
    entitiesInCaseList: getEntitiesInCaseList(state),
    entitiesScoreList: getEntitiesScore(state),
  }),
  (dispatch) => ({
    updateEntityId: (entityId) => dispatch(setEntityIdAction(entityId)),
    getFeaturesList: () => dispatch(getEntityAction()),
  }),
)(ClientSelect);
