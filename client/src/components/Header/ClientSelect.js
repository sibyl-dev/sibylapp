import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { getEntitiesInCaseList, getIsEntitiesInCaseLoading, getEntitiesScore } from '../../model/selectors/cases';

import { setEntityIdAction } from '../../model/actions/entities';

import { matchArrToArrOfObj } from '../Score/components/helpers';

import './ClientSelect.scss';

const ClientSelect = ({
  entitiesInCaseList,
  entitiesScoreList,
  setEntityIdActionProp,
  entitiesInCaseLoading,
  onEntityIdChange,
}) => {
  const [entityId, setEntityId] = useState(null);

  const clientIds = entitiesInCaseList.map((id) => ({
    id,
    label: id,
  }));

  const handleChangeEntityId = (val) => {
    setEntityIdActionProp(val.id).then(() => {
      setEntityId(val);

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
    });
  };

  const placeholder = (
    <div className="selectPlaceholder">
      <div>Client ID</div>
      <div>{!entitiesInCaseLoading ? clientIds[0].id : null}</div>
    </div>
  );

  const customStyles = {
    control: (styles) => ({
      ...styles,
      minWidth: '240px',
      width: '240px',
      minHeight: '40px',
      height: '40px',
    }),

    valueContainer: (styles) => ({
      ...styles,
      height: '40px',
    }),

    indicatorSeparator: (styles) => ({
      ...styles,
      display: 'none',
    }),

    indicatorsContainer: (styles) => ({
      ...styles,
      height: '40px',
    }),

    option: (styles, state) => ({
      ...styles,
      backgroundColor: state.isFocused && '#F2F2F2',
      color: '#4F4F4F',
    }),

    menu: (styles) => ({ ...styles, width: '240px' }),
  };

  return (
    <Select
      classNamePrefix="sibyl-select-client"
      className="sibyl-select-client"
      placeholder={placeholder}
      options={clientIds}
      styles={customStyles}
      isSearchable={false}
      onChange={handleChangeEntityId}
      value={entityId}
    />
  );
};

export default connect(
  (state) => ({
    entitiesInCaseList: getEntitiesInCaseList(state),
    entitiesScoreList: getEntitiesScore(state),
    entitiesInCaseLoading: getIsEntitiesInCaseLoading(state),
  }),
  (dispatch) => ({
    setEntityIdActionProp: (entityId) => dispatch(setEntityIdAction(entityId)),
  }),
)(ClientSelect);
