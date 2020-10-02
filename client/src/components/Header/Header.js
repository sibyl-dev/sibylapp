import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { ExcamationIcon } from '../../assets/icons/icons';
import { getPageName } from '../../model/selectors/sidebar';

import { getEntitiesInCaseList } from '../../model/selectors/cases';
import { getEntitiesInCaseListAction } from '../../model/actions/cases';
import { setEntityIdAction, getEntityPredictionScoreAction } from '../../model/actions/entities';

import { getIsEntityScoreLoading, getEntityScore } from '../../model/selectors/entities';
import ModalDialog from '../common/ModalDialog';
import './Header.scss';

const toggleModalDialog = (modalState, onClose) => (
  <ModalDialog isOpen={modalState} onClose={onClose} title="Risk Score">
    <p>
      This is the risk score prediction for this child. The scores range from 1 to 20. The higher the risk score, the
      higher the chance of placement. A score of **1** therefore represents the bottom 5% of risk among referred
      children, and a **20** represents the top 5%.
    </p>
  </ModalDialog>
);

const Header = (props) => {
  const {
    isEntityScoreLoading,
    entityScore,
    entitiesInCaseList,
    getCurrentEntitiesInCase,
    setEntityIdAction,
    loadPredictionScore,
    currentPage,
  } = props;
  const [isModalOpen, toggleModal] = useState(false);
  const excludedPages = ['Global Feature Importance', 'Feature Distribution'];
  let isRiskScoreVisible = !excludedPages.includes(currentPage);

  const [entityId, setEntityId] = useState(false);

  useEffect(() => {
    getCurrentEntitiesInCase();
  }, [getCurrentEntitiesInCase]);

  const selectClientId = () => {
    const clientIds = entitiesInCaseList.map((id) => {
      return {
        id: id,
        label: id,
      };
    });

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
          backgroundColor: state.isFocused && 'lightgray',
          color: '#4F4F4F',
        };
      },

      menu: (styles) => ({ ...styles, width: '240px' }),
    };

    const placeholder = () => {
      return (
        <>
          <div
            style={{
              width: '190px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>Client ID</div>
            <div>{clientIds.length !== 0 ? clientIds[0].id : null}</div>
          </div>
        </>
      );
    };

    const handleChangeEntityId = (val) => {
      setEntityIdAction(val.id).then(() => {
        setEntityId(val);
        loadPredictionScore();
      });
    };

    return (
      <Select
        classNamePrefix="sibyl-select-client"
        className="sibyl-select-client"
        placeholder={placeholder()}
        options={clientIds}
        styles={customStyles}
        isSearchable={false}
        onChange={handleChangeEntityId}
        value={entityId}
      />
    );
  };

  return (
    <div className="header">
      <div className="main-header">
        <ul>
          <li>
            <h2>{props.pageName}</h2>
          </li>
          <li>{!isEntityScoreLoading && isRiskScoreVisible && selectClientId()}</li>
          <li>
            {!isEntityScoreLoading && isRiskScoreVisible && (
              <span>
                Risk Score: <strong>{entityScore}</strong>
                <button type="button" className="clean" onClick={() => toggleModal(true)}>
                  <ExcamationIcon />
                </button>
              </span>
            )}
          </li>
        </ul>
      </div>
      {toggleModalDialog(isModalOpen, toggleModal)}
    </div>
  );
};
export default connect(
  (state) => ({
    pageName: getPageName(state),
    isEntityScoreLoading: getIsEntityScoreLoading(state),
    entityScore: getEntityScore(state),
    currentPage: getPageName(state),
    entitiesInCaseList: getEntitiesInCaseList(state),
  }),
  (dispatch) => ({
    getCurrentEntitiesInCase: () => dispatch(getEntitiesInCaseListAction()),
    setEntityIdAction: (entityId) => dispatch(setEntityIdAction(entityId)),
    loadPredictionScore: () => dispatch(getEntityPredictionScoreAction()),
  }),
)(Header);
