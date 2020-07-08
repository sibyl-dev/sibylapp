import React, { Component } from 'react';
import DashWrapper from '../common/DashWrapper';

import Search from '../common/Search';
import ScoreInfo from '../common/ScoreInfo';
import PieChart from '../common/PieChart';
import './Model.scss';
import { connect } from 'react-redux';
import { getIsEntitiesLoading, getCurrentEntityData } from '../../model/selectors/entitites';
import { getEntityAction } from '../../model/actions/entities';
import { PercentageProgressBar } from '../common/ProgressBars';

// mock search result
const hayStack = [
  { feature: 'Child in focus had a prior court active child welfare case' },
  { feature: 'Child in focus is younger than 1 years old' },
  { feature: 'Feature #1' },
  { feature: 'Feature #2' },
  { feature: 'Feature #3' },
];

class FeatureDistribution extends Component {
  componentDidMount() {
    this.props.getFeaturesList(15);
  }

  renderDashHeader() {
    return (
      <header className="dash-header">
        <ul className="dash-controls">
          <li>
            <Search hayStack={hayStack} />
          </li>
          <li>&nbsp;</li>
        </ul>
      </header>
    );
  }

  render() {
    const { entityData, isEntityLoading } = this.props;
    const { featuresData } = entityData;
    return (
      <div className="component-wrapper">
        <table className="distrib-info">
          <tbody>
            <tr>
              <td>
                <ScoreInfo />
              </td>
              <td>
                <PieChart />
              </td>
            </tr>
          </tbody>
        </table>
        <DashWrapper>
          {this.renderDashHeader()}
          <div className="sticky-wrapper scroll-style" style={{ maxHeight: '600px' }}>
            <table className="dash-table sticky-header">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th width="25%" className="align-right">
                    Distribution of Values
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isEntityLoading &&
                  featuresData.map((currentFeature, featureIndex) => (
                    <tr key={featureIndex}>
                      <td>{currentFeature.description}</td>
                      <td className="align-right">
                        <PercentageProgressBar negativeProgress="20" />
                      </td>
                    </tr>
                  ))}
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
    isEntityLoading: getIsEntitiesLoading(state),
    entityData: getCurrentEntityData(state),
  }),
  (dispatch) => ({
    getFeaturesList: (entityID) => dispatch(getEntityAction(entityID)),
  }),
)(FeatureDistribution);
