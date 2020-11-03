import React from 'react';
import Cookies from 'universal-cookie';
import { Switch, Route } from 'react-router-dom';
import Score from '../Score/Score';
import Details from '../Details/Details';
import './Dashboard.scss';
import Sandbox from '../Sandbox/Sandbox';
import NotFound from '../common/NotFound';
import Model from '../Model/Model';
import FeatureImportance from '../Model/FeatureImportance';
import FeatureDistribution from '../Model/FeatureDistribution';

const Dashboard = (props) => {
  const { location } = props;
  const cookies = new Cookies();
  const isPowerUser = cookies.get('isLoggedIn') === 'power';

  return (
    <div className="dashboard">
      <Switch location={location}>
        <Route path="/details" component={Details} />
        {isPowerUser ? <Route path="/sandbox" exact component={Sandbox} /> : null}
        {isPowerUser ? <Route path="/model" component={Model} /> : null}
        {isPowerUser ? <Route path="/global-feature-importance" component={FeatureImportance} /> : null}
        {isPowerUser ? <Route path="/feature-distribution" component={FeatureDistribution} /> : null}
        {isPowerUser ? <Route path="/score" exact component={Score} /> : null}
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default Dashboard;
