import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSidebarStateAction, setActivePageAction } from '../../model/actions/sidebar';
import { getIsSidebarCollapsed } from '../../model/selectors/sidebar';
import { getCurrentEntityID } from '../../model/selectors/entities';
import {
  IndicatorIcon,
  ScoreIcon,
  DetailsIcon,
  MetLogo,
  SandboxIcon,
  // SimilarChildrenIcon,
  ModelIcon,
} from '../../assets/icons/icons';

import './Sidebar.scss';

class Sidebar extends Component {
  render() {
    const cookies = new Cookies();
    const { toggleSidebarState, isSidebarCollapsed, setActivePage } = this.props;
    const sidebarClassNames = isSidebarCollapsed ? 'sidebar' : 'sidebar expanded';
    const isPowerUser = cookies.get('isLoggedIn') === 'power';

    return (
      <div className={sidebarClassNames}>
        <div className="logo">
          <MetLogo state={!isSidebarCollapsed && `full`} />
        </div>

        <ul className="menu">
          <li onClick={() => toggleSidebarState(!isSidebarCollapsed)} className="sidebar-trigger">
            <IndicatorIcon dir={!isSidebarCollapsed && 'left'} />
          </li>
          {isPowerUser ? (
            <li>
              <NavLink exact to="/score" activeClassName="active" onClick={() => setActivePage('Score')}>
                <ScoreIcon />
                <span>Score</span>
              </NavLink>
            </li>
          ) : null}
          <li>
            <NavLink exact to="/details" activeClassName="active" onClick={() => setActivePage('Details')}>
              <DetailsIcon />
              <span>Details</span>
            </NavLink>
          </li>
          {isPowerUser ? (
            <>
              <li>
                <NavLink exact to="/sandbox" onClick={() => setActivePage('Sandbox')}>
                  <SandboxIcon />
                  <span>Sandbox</span>
                </NavLink>
              </li>
              {/* <li> */}
              {/*  <NavLink exact to="/similar-children" onClick={() => setActivePage('Similar Children')}> */}
              {/*    <SimilarChildrenIcon /> */}
              {/*    <span>Similar Children</span> */}
              {/*  </NavLink> */}
              {/* </li> */}
              <li className="model">
                <button
                  type="button"
                  className="clean about-model"
                  onClick={() => toggleSidebarState(!isSidebarCollapsed)}
                >
                  <ModelIcon />
                  <span>About Model</span>
                  <IndicatorIcon dir="right" />
                </button>
                <ul>
                  <li>
                    <NavLink
                      exact
                      to="/global-feature-importance"
                      onClick={() => setActivePage('Global Feature Importance')}
                    >
                      <span>Global Feature Importance</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/feature-distribution" onClick={() => setActivePage('Feature Distribution')}>
                      <span>Feature Distribution</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    isSidebarCollapsed: getIsSidebarCollapsed(state),
    currentEntityID: getCurrentEntityID(state),
  }),
  (dispatch) => ({
    toggleSidebarState: (sidebarState) => dispatch(toggleSidebarStateAction(sidebarState)),
    setActivePage: (pageName) => dispatch(setActivePageAction(pageName)),
  }),
)(Sidebar);
