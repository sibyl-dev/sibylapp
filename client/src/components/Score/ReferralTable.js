import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { getCasesList, getCurrentCaseID, getEntitiesInCaseList } from '../../model/selectors/cases';
import { getCasesListAction, setCaseIdAction, getEntitiesInCaseListAction } from '../../model/actions/cases';

import './ReferralTable.scss';

const CategorySelect = ({ caseID, casesList, getCurrentCasesList, getCurrentEntitiesInCase, setCaseId }) => {
  useEffect(() => {
    getCurrentCasesList();
    setCaseId('101');
  }, [getCurrentCasesList, setCaseId]);

  const customStyles = {
    control: (provided, state) => ({
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

    option: (provided, state) => {
      return {
        ...provided,
        backgroundColor: state.isFocused && 'lightgray',
        color: '#4F4F4F',
      };
    },

    menu: (styles) => ({ ...styles, width: '240px' }),
  };

  const referralList = casesList.map((referral) => {
    return {
      id: referral,
      label: referral,
    };
  });

  const placeholder = () => {
    return (
      <div
        style={{
          width: '190px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>Referral ID</div>
        <div>{caseID === null ? (casesList.length !== 0 ? casesList[0].id : null) : caseID}</div>
      </div>
    );
  };

  const handleReferralIdChange = (val) => {
    setCaseId(val.id);
    getCurrentEntitiesInCase();
  };

  return (
    <Select
      classNamePrefix="sibyl-select-referral"
      className="sibyl-select-referral"
      placeholder={placeholder()}
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
    casesList: getCasesList(state),
    caseID: getCurrentCaseID(state),
    entitiesInCaseList: getEntitiesInCaseList(state),
  }),
  (dispatch) => ({
    getCurrentCasesList: () => dispatch(getCasesListAction()),
    setCaseId: (caseId) => dispatch(setCaseIdAction(caseId)),
    getCurrentEntitiesInCase: () => dispatch(getEntitiesInCaseListAction()),
  }),
)(CategorySelect);
