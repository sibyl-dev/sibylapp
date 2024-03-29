import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashWrapper from '../common/DashWrapper';
import Search from '../common/Search';
import { ProgressIndicator } from '../common/ProgressBars';
import {
  getFeaturesImportances,
  getFeaturesData,
  getIsFeaturesLoading,
  getSortedByImportanceFeatures,
  getFeatureImpSortDir,
} from '../../model/selectors/features';

import { setUserActionRecording } from '../../model/actions/userActions';
import Loader from '../common/Loader';
import { setActivePageAction } from '../../model/actions/sidebar';
import { setFeatureImpSortDirAction } from '../../model/actions/features';
import { SortIcon } from '../../assets/icons/icons';

const BoxNote = () => (
  <div className="blue-box">
    <h4>How the Model works</h4>
    <h4>Model Performance:</h4>
  </div>
);

const getFeatureImportanceMax = (importances) => Math.max.apply(null, Object.values(importances));

class FeatureImportance extends Component {
  componentDidMount() {
    const userData = {
      element: 'feature_importance',
      action: 'click',
    };
    this.props.setUserActions(userData);
    this.props.setActivePage('Global Feature Importance');
  }

  setSortFeaturesDirection() {
    const { setSortDir, currentSortDir } = this.props;
    setSortDir(currentSortDir === 'asc' ? 'desc' : 'asc');
  }

  render() {
    const { sortedImpFeatures, features, isFeaturesLoading, featuresImportances } = this.props;

    const { processedFeatures } = features;
    const importanceMax = getFeatureImportanceMax(featuresImportances);
    const resultsCount = isFeaturesLoading ? 0 : processedFeatures.length;

    return (
      <div className="component-wrapper">
        <BoxNote />
        <DashWrapper>
          <header className="dash-header">
            <ul className="dash-controls">
              <li>
                <Search />
              </li>
              <li className="sep" />
              <li className="results-counter">
                <span>{resultsCount} factors</span>
              </li>
              <li>&nbsp;</li>
            </ul>
          </header>
          <div className="sticky-wrapper scroll-style">
            <table className="dash-table sticky-header">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th width="20%" className="align-right">
                    <ul className="sort">
                      <li>Importance</li>
                      <li>
                        <button type="button" onClick={() => this.setSortFeaturesDirection()}>
                          <SortIcon />
                        </button>
                      </li>
                    </ul>
                  </th>
                </tr>
              </thead>
              <tbody>
                <Loader isLoading={isFeaturesLoading} colSpan="2">
                  {sortedImpFeatures &&
                    sortedImpFeatures.map((currentFeature) => (
                      <tr key={currentFeature.name}>
                        <td>{currentFeature.description}</td>
                        <td>
                          <ProgressIndicator
                            maxValue={importanceMax}
                            progressWidth={currentFeature.featureImportance}
                          />
                        </td>
                      </tr>
                    ))}
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
    isFeaturesLoading: getIsFeaturesLoading(state),
    features: getFeaturesData(state),
    featuresImportances: getFeaturesImportances(state),
    sortedImpFeatures: getSortedByImportanceFeatures(state),
    currentSortDir: getFeatureImpSortDir(state),
  }),
  (dispatch) => ({
    setUserActions: (userAction) => dispatch(setUserActionRecording(userAction)),
    setActivePage: (pageName) => dispatch(setActivePageAction(pageName)),
    setSortDir: (direction) => dispatch(setFeatureImpSortDirAction(direction)),
  }),
)(FeatureImportance);
