import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { getIsSidebarCollapsed } from './model/selectors/sidebar';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import { setEntityIdAction, getEntityAction, setUserIdAction, getModelsAction } from './model/actions/entities';
import { getCurrentEntityID, getCurrentUserID } from './model/selectors/entities';
import './assets/sass/main.scss';

class App extends Component {
  componentDidMount() {
    this.getEntityDetails();
  }

  getEntityDetails() {
    const { currentEntityID, setUserID, currentUserID, setEntityID, getModels, getFeaturesList } = this.props;
    const { location } = this.props;

    if (location.search.includes('user_id')) {
      const userID = location.search.split('=')[1];
      if (currentUserID !== userID) {
        setUserID(userID);
      }
    }

    if (currentEntityID !== null) {
      getModels().then(() => getFeaturesList());
      return;
    }

    setEntityID(currentEntityID)
      .then(getModels())
      .then(() => getFeaturesList());
  }

  render() {
    const cookies = new Cookies();
    const { isSidebarCollapsed, location, history } = this.props;
    const dashContainerClassNames = isSidebarCollapsed ? 'dash-container full-width' : 'dash-container';
    const isLoggedIn = cookies.get('isLoggedIn') === 'true' || cookies.get('isLoggedIn') === 'power';

    const isOnLoginPage = history.location.pathname === '/login';
    if (!isOnLoginPage && !isLoggedIn) {
      history.push('/login');
    }

    if (isOnLoginPage) {
      return (
        <div className="main-wrapper">
          <div className="dash-container full-width">
            <div className="dashboard">
              <Login />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="main-wrapper">
        <Sidebar />
        <div className={dashContainerClassNames}>
          {isOnLoginPage ? (
            <Login />
          ) : (
            <>
              <Header />
              <Dashboard location={location} />
            </>
          )}
        </div>
        <div className="clear" />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    isSidebarCollapsed: getIsSidebarCollapsed(state),
    currentEntityID: getCurrentEntityID(state),
    currentUserID: getCurrentUserID(state),
  }),
  (dispatch) => ({
    setEntityID: (entityID) => dispatch(setEntityIdAction(entityID)),
    setUserID: (userID) => dispatch(setUserIdAction(userID)),
    getModels: (modelID) => dispatch(getModelsAction(modelID)),
    getFeaturesList: () => dispatch(getEntityAction()),
  }),
)(App);
