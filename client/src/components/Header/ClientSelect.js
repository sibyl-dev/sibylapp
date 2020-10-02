import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { getEntitiesInCaseList } from '../../model/selectors/cases';
import { getEntitiesInCaseListAction } from '../../model/actions/cases';

import { setEntityIdAction, getEntityPredictionScoreAction } from '../../model/actions/entities';

import './ClientSelect.scss';

const ClientSelect = ({ entitiesInCaseList, getCurrentEntitiesInCase, setEntityIdAction, loadPredictionScore }) => {
  const [entityId, setEntityId] = useState(false);

  useEffect(() => {
    getCurrentEntitiesInCase();
  }, [getCurrentEntitiesInCase]);

  const clientIds = entitiesInCaseList.map((id) => {
    return {
      id: id,
      label: id,
    };
  });

  const handleChangeEntityId = (val) => {
    setEntityIdAction(val.id).then(() => {
      setEntityId(val);
      loadPredictionScore();
    });
  };

  const placeholder = (
    <div className="selectPlaceholder">
      <div>Client ID</div>
      <div>{clientIds.length !== 0 ? clientIds[0].id : null}</div>
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

    option: (styles, state) => {
      return {
        ...styles,
        backgroundColor: state.isFocused && '#F2F2F2',
        color: '#4F4F4F',
      };
    },

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
  }),
  (dispatch) => ({
    getCurrentEntitiesInCase: () => dispatch(getEntitiesInCaseListAction()),
    setEntityIdAction: (entityId) => dispatch(setEntityIdAction(entityId)),
    loadPredictionScore: () => dispatch(getEntityPredictionScoreAction()),
  }),
)(ClientSelect);
