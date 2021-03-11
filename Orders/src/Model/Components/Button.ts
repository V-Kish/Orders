import {BaseModel} from '../../Common/BaseModel';
import {CounterModel} from '../CounterModel';
import {COLORS} from '../../constants/colors';

class Button extends BaseModel {
  private _title: string;
  private _isVisible: boolean;
  private _icon?: string;
  private _iconDouble?: string;
  private readonly _style?: string;
  private _isActive?: boolean;
  private readonly _activeOpacity?: number;
  private readonly _onPress: () => void;
  private readonly _textOut?: boolean;
  private readonly _disabled?: boolean;
  private readonly _double?: boolean;
  private _titleDouble?: string;
  private _counterModel?: CounterModel;
  private _backgroundColor?: string;
  private _preloader?: boolean;
  private _colorPreloader?: string;
  private _disabledAnimation?: boolean;
  private _showPoint?: boolean;
  private _renderType?: string;
  private _textColor?: string;
  constructor({
    id,
    title,
    icon,
    iconDouble,
    style,
    isActive,
    onPress,
    activeOpacity,
    textOut,
    double,
    disabled,
    titleDouble,
    counterModel,
    backgroundColor,
    colorPreloader,
    disabledAnimation,
    isVisible,
    showPoint,
                textColor
  }: {
    id: string;
    title?: string;
    icon?: string;
    iconDouble?: string;
    style?: string;
    isActive?: boolean;
    activeOpacity?: number;
    onPress: () => void;
    textOut?: boolean;
    disabled?: boolean;
    double?: boolean;
    titleDouble?: boolean;
    counterModel?: CounterModel;
    backgroundColor?: string;
    colorPreloader?: string;
    disabledAnimation?: boolean;
    isVisible?: boolean;
    showPoint?: boolean;
    textColor?: string;
  }) {
    super(id);
    this.onPress = this.onPress.bind(this)
    this._title = title;
    this._textColor = textColor ? textColor : false;
    this._icon = icon;
    this._iconDouble = iconDouble;
    this._style = style;
    this._isActive = isActive;
    this._activeOpacity = activeOpacity;
    this._onPress = onPress;
    this._textOut = textOut;
    this._double = double;
    this._disabled = disabled;
    this._isVisible = isVisible ? isVisible : true;
    this._titleDouble = titleDouble;
    this._showPoint = showPoint ? showPoint : false;
    this._colorPreloader = colorPreloader!==undefined ? colorPreloader : COLORS.WHITE.bg;
    this._disabledAnimation = disabledAnimation ? disabledAnimation : false;
    this._isVisible = true;
    this._backgroundColor = backgroundColor;
    this._preloader = false;
    this._counterModel = counterModel ? counterModel : new CounterModel({id: `${id}_counterModel`, counter: 0});
  }
  get renderType(){
    return this._renderType
  }
  set renderType(value){
    this._renderType = value
  }
  get isVisible() {
    return this._isVisible;
  }
  get counterModel() {
    return this._counterModel;
  }
  get colorPreloader() {
    return this._colorPreloader;
  }
  get preloader() {
    return this._preloader;
  }
  get textColor() {
    return this._textColor;
  }
  set preloader(value) {
    this._preloader = value;
    this.disabled = value === true;
  }
  set counterModel(value:number) {
    // @ts-ignore
    this._counterModel.counter = value;
    // this.modified = true;
    // this.forceUpdate();
  }
  set isVisible(value) {
    this._isVisible = value;
    this.modified = true;
    this.forceUpdate();
  }
  get onPressFunction(){
    return this._onPress
  }
  onPress() {
    this._onPress();
  }
  get title(): string {
    return this._title;
  }
  get titleDouble(): string {
    return this._titleDouble;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    this._backgroundColor = value;
  }
  set disabledAnimation(value) {
    this._disabledAnimation = value;
  }
  set title(value: string) {
    this._title = value;
    this.modified = true;
    this.forceUpdate();
  }
  set titleDouble(value: string) {
    this._titleDouble = value;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  get disabledAnimation(): boolean {
    return this._disabledAnimation;
  }

  set disabled(value: boolean) {
    this._disabled = value;
    this.modified = true;
    this.forceUpdate();
  }

  get icon() {
    return this._icon;
  }
  get showPoint() {
    return this._showPoint;
  }
  set showPoint(value) {
    if(this._showPoint!==value){
      this._showPoint = value;
      this.forceUpdate();
    }
  }
  set icon(value) {
    this._icon = value;
    this.forceUpdate();
  }
  get iconDouble() {
    return this._iconDouble;
  }

  get style() {
    return this._style;
  }
  set style(value) {
    this._style = value;
  }
  get double() {
    return this._double;
  }

  get isActive() {
    return this._isActive;
  }
  get activeOpacity() {
    return this._activeOpacity;
  }
  updateTitle(title: string) {
    if (this.title !== title) {
      this.title = title;
      this._isActive = !this._isActive;
      this.forceUpdate();
    }
  }
  updateStyle(style: string) {
    if (this.style !== style) {
      this.style = style;
      this._isActive = !this._isActive;
      this.forceUpdate();
    }
  }
  updateTitleDouble(title: string) {
    if (this.titleDouble !== title) {
      this.titleDouble = title;
      this._isActive = !this._isActive;
      this.forceUpdate();
    }
  }

  get textOut(): boolean {
    return this._textOut;
  }
  get textOut(): boolean {
    return this._textOut;
  }
  updateButtonStyles(icon: string) {
    if (this.icon !== icon) {
      this._icon = icon;
      this._isActive = !this._isActive;
      this.forceUpdate();
    }
  }
}

export {Button};
