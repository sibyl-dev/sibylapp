import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { getCurrentCaseID } from '../../../model/selectors/cases';
import { setCaseIdAction } from '../../../model/actions/cases';

import './ReferralSelect.scss';

const CategorySelect = ({ caseID, casesList, getCurrentEntitiesInCase, setCaseId }) => {
  useEffect(() => {
    setCaseId(casesList[0]);
    getCurrentEntitiesInCase();
  }, [getCurrentEntitiesInCase, setCaseId, casesList]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
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

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused && '#F2F2F2',
      color: '#4F4F4F',
    }),
    menu: (styles) => ({ ...styles, width: '240px' }),
  };

  const referralList = casesList.map((referral) => ({
    id: referral,
    label: referral,
  }));

  const placeholder = (
    <div
      style={{
        width: '190px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>Referral ID</div>
      <div>{caseID}</div>
    </div>
  );

  const handleReferralIdChange = (val) => {
    setCaseId(val.id);
    getCurrentEntitiesInCase();
  };

  return (
    <Select
      classNamePrefix="sibyl-select-referral"
      className="sibyl-select-referral"
      placeholder={placeholder}
      options={referralList}
      value={caseID}
      onChange={handleReferralIdChange}
      styles={customStyles}
      isSearchable={false}
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
)(CategorySelect);
