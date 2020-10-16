import initialState from './states/sidebar.default';
import { getIsSidebarCollapsed, getPageName } from '../../model/selectors/sidebar';

describe('Sidebar Selectors', () => {
  describe('getIsSidebarCollapsed()', () => {
    it("returns the sidebar's collapsed state", () => {
      expect(getIsSidebarCollapsed(initialState)).toEqual(false);
    });
  });
  describe('getPageName()', () => {
    it("returns the sidebar's collapsed state", () => {
      const randomPageState = initialState;
      randomPageState.sidebar.pageName = 'Random Page';

      expect(getPageName(randomPageState)).toEqual('Random Page');
    });
  });
});
