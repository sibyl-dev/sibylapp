import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ExcamationIcon, LoaderIcon } from '../../assets/icons/icons';
import { getPageName } from '../../model/selectors/sidebar';
import { getIsEntitiesScoreLoading, getEntitiesScore, getCurrentCaseEntityScore } from '../../model/selectors/cases';

import { setCaseEntityScoreAction } from '../../model/actions/cases';

import ModalDialog from '../common/ModalDialog';
import ClientSelect from './components/ClientSelect';
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

const Header = ({ isEntitiesScoreLoading, currentPage, entitiesScoreList, caseEntityScore, setCaseEntityScore }) => {
  const [isModalOpen, toggleModal] = useState(false);

  useEffect(() => {
    if (entitiesScoreList.length) {
      setCaseEntityScore(entitiesScoreList[0].output);
    }
  }, [setCaseEntityScore, entitiesScoreList]);

  const updateEntityScore = (value) => {
    setCaseEntityScore(value);
  };

  const excludedPages = ['Global Feature Importance', 'Feature Distribution'];

  return (
    <div className="header">
      <div className="main-header">
        <ul>
          <li>
            <h2>{currentPage}</h2>
          </li>
          <li>
            {!isEntitiesScoreLoading ? (
              !excludedPages.includes(currentPage) ? (
                <ClientSelect onEntityIdChange={updateEntityScore} />
              ) : null
            ) : (
              <LoaderIcon />
            )}
          </li>
          <li>
            {!isEntitiesScoreLoading && !excludedPages.includes(currentPage) && (
              <span>
                Risk Score: <strong>{caseEntityScore}</strong>
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
    caseEntityScore: getCurrentCaseEntityScore(state),
    currentPage: getPageName(state),
    isEntitiesScoreLoading: getIsEntitiesScoreLoading(state),
    entitiesScoreList: getEntitiesScore(state),
  }),
  (dispatch) => ({
    setCaseEntityScore: (caseEntityScore) => dispatch(setCaseEntityScoreAction(caseEntityScore)),
  }),
)(Header);
