import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { getCurrentCaseID } from '../../../model/selectors/cases';
import { setCaseIdAction } from '../../../model/actions/cases';

import { loadState } from '../../Header/components/localStorage';

import './ReferralSelect.scss';

const optionStyles = {
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused && '#F2F2F2',
    color: '#4F4F4F',
  }),
};

const ReferralSelect = ({ caseID, casesList, getCurrentEntitiesInCase, setCaseId }) => {
  useEffect(() => {
    const localStorageCasesList = loadState().cases.casesList;

    if (localStorageCasesList.length) {
      setCaseId(localStorageCasesList[0]);

      return;
    }

    if (casesList.length) {
      setCaseId(casesList[0]);
    }

    getCurrentEntitiesInCase();
  }, [getCurrentEntitiesInCase, setCaseId, casesList]);

  const [selectedVal, setSelectedVal] = useState(null);

  const referralList = casesList.map((referral) => ({
    id: referral,
    label: referral,
    selected: 'Selected',
  }));

  const placeholder = (
    <div className="placeholder-wrapper">
      <div>Referral ID</div>
      <div>{caseID}</div>
    </div>
  );

  const handleReferralIdChange = (val) => {
    setCaseId(val.id);

    getCurrentEntitiesInCase();
    setSelectedVal(val);
  };

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
      classNamePrefix="sibyl-select-referral"
      className="sibyl-select-referral"
      placeholder={placeholder}
      options={referralList}
      value={caseID}
      onChange={handleReferralIdChange}
      isSearchable={false}
      formatOptionLabel={formatOptionLabel}
      styles={optionStyles}
    />
  );
};

export default connect(
  (state) => ({
    caseID: getCurrentCaseID(state),
  }),
  (dispatch) => ({
    setCaseId: (caseId) => dispatch(setCaseIdAction(caseId)),
  }),
)(ReferralSelect);
