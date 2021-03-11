import {MainNavigation} from "../Model/navigation/MainNavigation";


class NavigationController {
  private readonly _mainNavigation: MainNavigation;
  constructor() {
    this._mainNavigation = new MainNavigation({id: 'MainNavigation'});
  }

  get mainNavigation() {
    return this._mainNavigation;
  }
}

export {NavigationController};
