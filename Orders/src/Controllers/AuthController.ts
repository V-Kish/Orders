import {ConfirmPhone} from '../Models/AuthStack/ConfirmPhone/ConfirmPhone';
import {Header} from '../Models/Header/Header';
import {Login} from '../Models/AuthStack/Login/Login';
import {Welcome} from '../Models/AuthStack/Welcome/Welcome';

class AuthController {
  private readonly _authHeader: Header;
  private readonly _welcome: Welcome;
  private readonly _login: Login;
  private readonly _confirmPhone: ConfirmPhone;

  constructor() {
    this._authHeader = new Header({id: 'header'});
    this._welcome = new Welcome('Welcome');
    this._login = new Login('Login');
    this._confirmPhone = new ConfirmPhone('ConfirmPhone');
  }

  get authHeader() {
    return this._authHeader;
  }

  get welcome() {
    return this._welcome;
  }

  get login() {
    return this._login;
  }

  get confirmPhone() {
    return this._confirmPhone;
  }
}

export {AuthController};
