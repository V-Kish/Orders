import {Animated} from 'react-native';
import {BaseModel} from '../../../Common/BaseModel';
import {Button} from '../Button';

type FloatButtonModelTypes = {
  id: string;
  onPress: () => void;
  button: Button;
  options: {
    SlideInLeft: any;
  };
  stateActive?: boolean;
};

class FloatButtonModel extends BaseModel {
  private _model: FloatButtonModelTypes;
  private _button: Button;
  private _stateActive: boolean;
  private _onPress: any;
  private _options: {SlideInLeft: any};
  private _hasBottomNavigation: boolean;

  constructor(_model: FloatButtonModelTypes) {
    super(_model.id);
    this._model = _model;
    this.onPress = this.onPress.bind(this);
    this.animationsBtn = this.animationsBtn.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.animationHide = this.animationHide.bind(this);
    this.animationShow = this.animationShow.bind(this);
    this.doAnimation = this.doAnimation.bind(this);
    this._button = this._model.button;
    this._onPress = this._model.onPress;
    this._stateActive = this._model.stateActive
      ? this._model.stateActive
      : false;
    this._options = this._model.options;
    this._hasBottomNavigation = false;
  }

  async onPress() {
    this._onPress(this);
  }

  get button() {
    return this._button;
  }

  get options() {
    return this._options;
  }
  get hasBottomNavigation() {
    return this._hasBottomNavigation;
  }
  set hasBottomNavigation(value) {
    this._hasBottomNavigation = value;
    this.forceUpdate();
  }
  get stateActive() {
    return this._stateActive;
  }

  set stateActive(value) {
    this._stateActive = value;
  }

  animationsBtn(firsParam = 1, secondParam = -1) {
    // firsParam = 1, secondParam = -1   при скролі вверх показуємно кнопку а вних ховаємо;
    // firsParam = -1, secondParam = 1   при скролі вверх ховаємо кнопку а вних показуємо;
    this.stateActive = !this.stateActive;
    this.forceUpdate();
    return Animated.parallel([
      Animated.timing(this.options.SlideInLeft, {
        toValue: this.stateActive ? firsParam : secondParam,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }

  doAnimation(action: 'show' | 'hide') {
    // if(this.stateActive === (action === 'show')){
    //   return false
    // }
    this.stateActive = action === 'show';
    this.forceUpdate();
    return Animated.parallel([
      Animated.timing(this.options.SlideInLeft, {
        toValue: this.stateActive ? 1 : -1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }

  animationHide() {
    return Animated.parallel([
      Animated.timing(this.options.SlideInLeft, {
        toValue: -1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }
  animationShow() {
    return Animated.parallel([
      Animated.timing(this.options.SlideInLeft, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }
  hide() {
    this.button.isVisible = false;
    this.modified = true;
    this.forceUpdate();
  }

  show() {
    this.button.isVisible = true;
    this.modified = true;
    this.forceUpdate();
  }
}

export {FloatButtonModel};
