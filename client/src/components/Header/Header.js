import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { ExcamationIcon } from '../../assets/icons/icons';
import { getPageName } from '../../model/selectors/sidebar';

import { getIsEntitiesScoreLoading, getEntitiesScore } from '../../model/selectors/cases';

import ModalDialog from '../common/ModalDialog';
import ClientSelect from './ClientSelect';
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

const Header = ({ isEntitiesScoreLoading, currentPage, entitiesScoreList, pageName }) => {
  const [isModalOpen, toggleModal] = useState(false);

  let [entityScore, setEntityScore] = useState(null);

  if (!isEntitiesScoreLoading && entityScore === null) {
    entityScore = entitiesScoreList[0].output;
  }

  const excludedPages = ['Global Feature Importance', 'Feature Distribution'];

  let isRiskScoreVisible = !excludedPages.includes(currentPage);

  const updateEntityScore = (value) => {
    setEntityScore(value);
  };

  return (
    <div className="header">
      <div className="main-header">
        <ul>
          <li>
            <h2>{pageName}</h2>
          </li>
          <li>
            {!isEntitiesScoreLoading && isRiskScoreVisible && pageName === 'Score' ? (
              <ClientSelect onEntityIdChange={updateEntityScore} />
            ) : (
              pageName === 'Score' && <CircularProgress />
            )}
          </li>
          <li>
            {!isEntitiesScoreLoading && isRiskScoreVisible && pageName === 'Score' && (
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
export default connect((state) => ({
  pageName: getPageName(state),
  currentPage: getPageName(state),
  isEntitiesScoreLoading: getIsEntitiesScoreLoading(state),
  entitiesScoreList: getEntitiesScore(state),
}))(Header);
