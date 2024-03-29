import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import DashWrapper from '../common/DashWrapper';
import { CategorySelect } from '../common/Form';
import Search from '../common/Search';
import SandboxFilters from './SandboxFilters';
import {
  getModelPredictionAction,
  setFilterCategsAction,
  setSortPredDirection,
  setSortDiffDirectionAction,
  setContribFiltersAction,
  // setModelPredictFilterValueAction,
  setModelPredDiffFilterAction,
} from '../../model/actions/features';
import { getIsEntitiesLoading, getSelectedModelID } from '../../model/selectors/entities';
import {
  getIsFeaturesLoading,
  getIsModelPredictLoading,
  getIsCategoriesLoading,
  getFeatureCategories,
  getFilterCategories,
  getCurrentPredSortDir,
  getReversedModelPredFeatures,
  getCurrentSortDiffDir,
  // getModelPredictFilterValue,
  getModelPredDiffFilterValue,
} from '../../model/selectors/features';

import { ArrowIcon, SortIcon } from '../../assets/icons/icons';
import { setUserActionRecording } from '../../model/actions/userActions';
import { setCaseIdAction, getEntitiesInCaseListAction, getCasesListAction } from '../../model/actions/cases';
import { getCasesList } from '../../model/selectors/cases';

import './Sandbox.scss';
import MetTooltip from '../common/MetTooltip';
import Loader from '../common/Loader';
import { setActivePageAction } from '../../model/actions/sidebar';

import { loadState } from '../Header/components/localStorage';

// const valueSelect = [
//   { value: 'all', label: 'All Values', isFixed: true },
//   { value: 'false', label: 'True -> False', isFixed: true },
//   { value: 'true', label: 'False -> True', isFixed: true },
// ];

const diffValues = [
  { value: 'difference', label: 'Difference', isFixed: true },
  { value: 'risk', label: 'Risk', isFixed: true },
  { value: 'protective', label: 'Protective', isFixed: true },
];

const localStorageCasesList = loadState()?.cases.casesList;

class Sandbox extends Component {
  componentDidMount() {
    const userData = {
      element: 'sandbox_page',
      action: 'click',
    };
    this.props.setUserActions(userData);
    this.props.setPageName('Sandbox');
    this.props.getCurrentCasesList();
  }

  componentDidUpdate(prevProps) {
    const { modelID, setCaseId, casesList, getCurrentEntitiesInCase } = this.props;

    if (modelID !== prevProps.modelID) {
      if (localStorageCasesList.length) {
        setCaseId(localStorageCasesList[0]);
      }
    }

    if (casesList.length !== prevProps.casesList.length) {
      setCaseId(casesList[0]);
      getCurrentEntitiesInCase();
    }
  }

  renderDashHeader() {
    const {
      featureCategories,
      setFilterCategories,
      isCategoriesLoading,
      currentFilterCategs,
      // setFilterValue,
      // currentFilterValue,
      currentDiffFilterVal,
      setDiffFilter,
      modelPredFeatures,
    } = this.props;

    return (
      !isCategoriesLoading && (
        <header className="dash-header">
          <ul className="dash-controls">
            <li>
              <Search />
            </li>
            <li className="sep" />
            <li>
              <CategorySelect
                options={featureCategories}
                onChange={(selectedCategories) => setFilterCategories(selectedCategories)}
                value={currentFilterCategs}
              />
            </li>
            {/* <li>
              <Select
                isSearchable={false}
                isMulti={false}
                classNamePrefix="sibyl-select"
                className="sibyl-select"
                options={valueSelect}
                placeholder="Changed Value"
                onChange={(filterValue) => setFilterValue(filterValue.value)}
                value={valueSelect.filter((currentVal) => currentVal.value === currentFilterValue)}
              />
            </li> */}
            <li>
              <Select
                isSearchable={false}
                isMulti={false}
                classNamePrefix="sibyl-select"
                className="sibyl-select"
                options={diffValues}
                placeholder="Difference"
                value={diffValues.filter((currentVal) => currentVal.value === currentDiffFilterVal)}
                onChange={(filterValue) => setDiffFilter(filterValue.value)}
              />
            </li>
            <li className="sep" />
            <li className="results-counter">
              <span>{modelPredFeatures.length}</span> factors
            </li>
          </ul>
        </header>
      )
    );
  }

  renderOrderValues(currentFeature) {
    const falseRow = (
      <span>
        True -&gt; <b>False</b>
      </span>
    );
    const trueRow = (
      <span>
        False -&gt; <b>True</b>
      </span>
    );
    return currentFeature === 0 ? trueRow : falseRow;
  }

  getFeatureCategoryColor(feature) {
    const { featureCategories } = this.props;
    const colorIndex = featureCategories.findIndex((currentCategory) => currentCategory.name === feature);

    if (colorIndex === -1) {
      return null;
    }

    return (
      <>
        <MetTooltip title={featureCategories[colorIndex].name} placement="top">
          <i className="bullet" style={{ background: featureCategories[colorIndex].color }} />
        </MetTooltip>
        <span className="feature-category-label">{featureCategories[colorIndex].abbreviation}</span>
      </>
    );
  }

  setSortContribDirection() {
    const { currentPredSortDir, setSortPrediction } = this.props;
    const currentDirection = currentPredSortDir === 'asc' ? 'des' : 'asc';
    setSortPrediction(currentDirection);
  }

  setSortDiffDirection() {
    const { currentDiffDirection, setSortDiffDirection } = this.props;
    const currentDirection = currentDiffDirection === 'asc' ? 'desc' : 'asc';
    setSortDiffDirection(currentDirection);
  }

  render() {
    const { isModelPredictionLoading, isFeaturesLoading, modelPredFeatures } = this.props;
    const isDataLoading = isFeaturesLoading || isModelPredictionLoading;

    const arrowIconProps = (data) => {
      const arrowClassName = data === 0 ? 'gray' : data > 0 ? 'red' : 'blue';
      const arrowDir = data === 0 ? 'equal' : data > 0 ? 'up' : 'down';
      return {
        className: arrowClassName,
        dir: arrowDir,
      };
    };

    return (
      <div className="component-wrapper">
        <SandboxFilters />
        <div className="dash-title">
          <h4>Model predictions if each value was changed</h4>
        </div>
        <DashWrapper>
          {this.renderDashHeader()}
          <div className="sticky-wrapper scroll-style">
            <table className="dash-table sticky-header sandbox">
              <thead>
                <tr>
                  <th className="align-center">Category</th>
                  <th>Factor</th>
                  <th className="align-right" width="15%">
                    Changed Value
                  </th>
                  <th className="align-right" width="185">
                    <ul className="sort">
                      <li>New Prediction</li>
                      <li>
                        <button type="button" onClick={() => this.setSortContribDirection()} disabled={isDataLoading}>
                          <SortIcon />
                        </button>
                      </li>
                    </ul>
                  </th>
                  <th className="align-right" width="16%">
                    <ul className="sort">
                      <li>Difference</li>
                      <li>
                        <button type="button" onClick={() => this.setSortDiffDirection()} disabled={isDataLoading}>
                          <SortIcon />
                        </button>
                      </li>
                    </ul>
                  </th>
                </tr>
              </thead>
              <tbody>
                <Loader isLoading={isModelPredictionLoading} colSpan="5" minHeight="480">
                  {modelPredFeatures && modelPredFeatures.length > 0 ? (
                    modelPredFeatures.map((currentFeature) => {
                      const { name, description, category, modelPrediction } = currentFeature;
                      const { reversedScore, currentDifference } = modelPrediction;

                      return (
                        <tr key={name}>
                          <td className="align-center">{this.getFeatureCategoryColor(category)}</td>
                          <td>
                            <span>{description}</span>
                          </td>
                          <td className="align-right">{this.renderOrderValues(currentFeature[name])}</td>
                          <td className="align-right">{reversedScore}</td>
                          <td className="align-right spaced" valign="middle">
                            <span>{currentDifference}</span>
                            <ArrowIcon {...arrowIconProps(currentDifference)} />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="align-center">
                        <p>No Matches found....</p>
                      </td>
                    </tr>
                  )}
                </Loader>
              </tbody>
            </table>
          </div>
        </DashWrapper>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    modelID: getSelectedModelID(state),
    isEntityLoading: getIsEntitiesLoading(state),
    isFeaturesLoading: getIsFeaturesLoading(state),
    isModelPredictionLoading: getIsModelPredictLoading(state),
    featureCategories: getFeatureCategories(state),
    isCategoriesLoading: getIsCategoriesLoading(state),
    currentFilterCategs: getFilterCategories(state),
    currentPredSortDir: getCurrentPredSortDir(state),
    modelPredFeatures: getReversedModelPredFeatures(state),
    currentDiffDirection: getCurrentSortDiffDir(state),
    // currentFilterValue: getModelPredictFilterValue(state),
    currentDiffFilterVal: getModelPredDiffFilterValue(state),
    casesList: getCasesList(state),
  }),
  (dispatch) => ({
    getModelPrediction: () => dispatch(getModelPredictionAction()),
    setFilterCategories: (filterCategs) => dispatch(setFilterCategsAction(filterCategs)),
    setSortPrediction: (direction) => dispatch(setSortPredDirection(direction)),
    setSortDiffDirection: (direction) => dispatch(setSortDiffDirectionAction(direction)),
    setContribFilters: (filters) => dispatch(setContribFiltersAction(filters)),
    // setFilterValue: (filterValue) => dispatch(setModelPredictFilterValueAction(filterValue)),
    setDiffFilter: (filterValue) => dispatch(setModelPredDiffFilterAction(filterValue)),
    setUserActions: (userAction) => dispatch(setUserActionRecording(userAction)),
    setPageName: (pageName) => dispatch(setActivePageAction(pageName)),
    setCaseId: (caseId) => dispatch(setCaseIdAction(caseId)),
    getCurrentEntitiesInCase: () => dispatch(getEntitiesInCaseListAction()),
    getCurrentCasesList: () => dispatch(getCasesListAction()),
  }),
)(Sandbox);
