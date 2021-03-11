import {BaseModel} from '../../Common/BaseModel';
import {ICONS} from '../../constants/icons';
import {COLORS} from '../../constants/colors';

type inputType = 'default' | 'select' | 'date' | 'time' | undefined;
type keyboardType =
  | 'default'
  | 'email-address'
  | 'numeric'
  | 'phone-pad'
  | 'number-pad'
  | 'decimal-pad'
  | 'visible-password'
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'url'
  | 'name-phone-pad'
  | 'twitter'
  | 'web-search'
  | undefined;
type returnKeyType =
  | 'default'
  | 'done'
  | 'go'
  | 'next'
  | 'search'
  | 'send'
  | 'none'
  | 'previous'
  | 'google'
  | 'join'
  | 'route'
  | 'yahoo'
  | 'emergency-call'
  | undefined;
type formTextBoxModel = {
  id: string;
  title: string;
  onChangeText: (model: FormTextBox) => void;
  inputType?: inputType;
  selectItems?: any;
  icon?: string;
  iconLeft?: string;
  iconOrder?: string;
  defaultValue?: string;
  placeholder?: string;
  keyboardType?: keyboardType;
  maxLength?: number;
  minLength?: number;
  name?: string;
  onSubmitEditing?: () => void;
  onPressIcon?: () => void;
  returnKeyType?: returnKeyType;
  required?: boolean;
  editable?: boolean;
  errorComment?: string;
  style?: string;
  iconStyle?: string;
  multiLine?: boolean;
  numberOfLines?: number;
  subStrOne?: string;
  subStrTwo?: string;
  colSpan?: number;
  unsupportedValue?: string;
  minimumDate?: Date | null;
  maximumDate?: Date;
  necessarily?: string;
  blurIcon?: boolean;
  showFocusStyles?: boolean;
  visible?: boolean;
};

class FormTextBox extends BaseModel {
  private _model: formTextBoxModel;
  private _title: string;
  private _name: string;
  private _datePick: any;
  private _onChangeText: (model: FormTextBox) => void;
  private _icon: string;
  private _iconLeft: string;
  private _value: string;
  private _defaultValue: string;
  private _iconOrder: string;
  private _placeholder: string;
  private _maxLength: number;
  private _minLength: number;
  private _keyboardType: keyboardType;
  private _reference: any;
  private _refView: any;
  private _onSubmitEditing: () => void;
  private _returnKeyType: returnKeyType;
  private _required: boolean;
  private _isShouldToFiled: boolean;
  private _editable: boolean;
  private _inputType: inputType;
  private _selectItems: any;
  private _defaultSelectItems: any;
  private _errorComment: string;
  private _multiLine: boolean;
  private _numberOfLines: number;
  private _subStrOne: boolean;
  private _subStrTwo: boolean;
  private _colSpan: number;
  private _necessarily: string;
  private _unsupportedValue: string;
  private _minimumDate: Date | null;
  private _maximumDate: Date | null;
  private _focusStyles: boolean;
  private _showFocusStyles?: boolean;
  private _staticValueInput?: string;
  private _visible?: boolean;

  constructor(_model: formTextBoxModel) {
    super(_model.id);
    this._model = _model;
    this._title = _model.title;
    this._unsupportedValue = _model.unsupportedValue
      ? _model.unsupportedValue
      : '';
    this.initBlurIcon = this.initBlurIcon.bind(this);
    this._onChangeText = _model.onChangeText;
    this._onSubmitEditing = _model.onSubmitEditing
      ? _model.onSubmitEditing
      : () => {};
    this._icon = _model.icon ? _model.icon : '';
    this._iconLeft = _model.iconLeft ? _model.iconLeft : '';
    this._visible = _model.visible ? _model.visible : true;
    this.onChangeText = this.onChangeText.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
    this.onChangePicker = this.onChangePicker.bind(this);
    this.onPressIcon = this.onPressIcon.bind(this);
    this.isFiled = this.isFiled.bind(this);
    this.focus = this.focus.bind(this);
    this.Focus = this.Focus.bind(this);
    this.Blur = this.Blur.bind(this);
    this.removeItemFromSelector = this.removeItemFromSelector.bind(this);
    this.addItemFromSelector = this.addItemFromSelector.bind(this);
    this.restoreSelector = this.restoreSelector.bind(this);
    this._value = _model.defaultValue
      ? _model.defaultValue
      : _model.value || '';
    this._iconOrder = _model.iconOrder ? _model.iconOrder : 'end';
    this._defaultValue = _model.defaultValue ? _model.defaultValue : '';
    this._staticValueInput = _model.staticValueInput
      ? _model.staticValueInput
      : '';
    this._placeholder = _model.placeholder ? _model.placeholder : '';
    this._subStrOne = _model.subStrOne ? _model.subStrOne : '';
    this._subStrTwo = _model.subStrTwo ? _model.subStrTwo : '';
    this._necessarily = _model.necessarily ? _model.necessarily : '';
    this._keyboardType = _model.keyboardType ? _model.keyboardType : 'default';
    this._returnKeyType = _model.returnKeyType
      ? _model.returnKeyType
      : 'default';
    this._maxLength = _model.maxLength ? _model.maxLength : undefined;
    this._minLength = _model.minLength ? _model.minLength : 0;
    this._name = _model.name ? _model.name : '';
    this._required = _model.required ? _model.required : false;
    this._editable = _model.editable ? _model.editable : true;
    this._isShouldToFiled = false;
    this._inputType = _model.inputType ? _model.inputType : 'default';
    this._selectItems = _model.selectItems ? _model.selectItems : [];
    this._defaultSelectItems = _model.defaultSelectItems
      ? _model.defaultSelectItems
      : [];
    this._errorComment = _model.errorComment ? _model.errorComment : '';
    this._multiLine = _model.multiLine!==undefined ? _model.multiLine : false;
    this._numberOfLines = _model.numberOfLines ? _model.numberOfLines : 1;
    this._colSpan = _model.colSpan ? _model.colSpan : 1;
    this._datePick = new Date();
    this._minimumDate = _model.minimumDate ? _model.minimumDate : null;
    this._maximumDate = _model.maximumDate ? _model.maximumDate : null;
    this._showFocusStyles = _model.showFocusStyles
      ? _model.showFocusStyles
      : false;
    this._focusStyles = false;
    this.initBlurIcon(_model.blurIcon ? _model.blurIcon : false);
  }

  initBlurIcon(blurIcon: boolean) {
    if (!blurIcon) {
      return;
    }
    this.onSubmitEditing = () => {
      this.blur();
    };
  }
  removeItemFromSelector(element) {
    if (this._inputType == 'select') {
      const index = this._selectItems.findIndex(
        (item) => item.value == element.value,
      );
      if (index !== -1) {
        this._selectItems.splice(index, 1);
        this.modified = true;
        this.forceUpdate();
      }
    }
  }
  addItemFromSelector(element) {
    if (this._inputType == 'select') {
      const index = this._selectItems.findIndex(
        (item) => item.value == element.value,
      );
      if (index === -1) {
        this._selectItems.push(element);
        this.modified = true;
        this.forceUpdate();
      }
    }
  }
  async onChangePicker(event, selectedDate) {
    this._datePick = selectedDate || this._datePick;
    this.onChangeText(this._datePick);
  }
  handlePhoneNumber = (input) => {
    if (input === null || input === undefined){
      return
    }
    input = input.replace(/\D/g, '');
    input = input.substring(0, 9);
    let size = input.length;
    if (size == 0) {
      input = input;
    } else if (size < 4) {
      input = input;
    } else if (size < 5) {
      input = input.substring(0, 2) + ' ' + input.substring(2, 4);
    } else {
      input =
        input.substring(0, 2) +
        ' ' +
        input.substring(2, 4) +
        ' ' +
        input.substring(4, 6) +
        ' ' +
        input.substring(6, 9);
    }
    return input.trim();
  };

  onChangeText(value: string) {
    if (value.length == 0 && this._value == '+') {
      return;
    }
    if (this._keyboardType === 'phone-pad') {
      value = this.handlePhoneNumber(value);
    }
    this._value = value;
    this._isShouldToFiled = false;
    this._onChangeText(this);
    this.forceUpdate();
    try {
      if (this.value.length === this.maxLength) {
        this.onSubmitEditing();
      }
    } catch (e) {
      console.log('formTextBox ex', e);
    }
  }
  onSubmitEditing() {
    this._onSubmitEditing();
  }
  get showFocusStyles() {
    return this._showFocusStyles;
  }
  get focusStyles() {
    return this._focusStyles;
  }
  set focusStyles(value) {
    this._focusStyles = value;
    this.modified = true;
    // this.forceUpdate();
  }
  Focus() {
    // this._isShouldToFiled = false;
    // this.refView.setNativeProps({ style: {
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     borderColor: COLORS.INPUT_FOCUS,
    //   }});
    // this.focusStyles = true;
  }
  Blur() {
    // this.refView.setNativeProps({ style: {
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     borderColor: COLORS.INPUT_FOCUS,
    //   },
    // });
    // this.focusStyles = false;
  }

  setOnSubmitEdititng(value: () => void) {
    this._onSubmitEditing = value;
  }

  focus() {
    if (typeof this._reference.focus !== 'undefined') {
      this._reference.focus();
    }
  }
  blur() {
    if (typeof this._reference.blur !== 'undefined') {
      this._reference.blur();
    }
  }
  get necessarily() {
    return this._necessarily;
  }
  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  isFiled() {
    if (!this._required) {
      return true;
    }
    if (typeof this._value === 'string') {
      this._value = this._value.trim();
    }
    if (
      this._value == this._unsupportedValue ||
      (this._keyboardType === 'email-address' &&
        !this.validateEmail(this._value)) ||
      this.value === undefined ||
      this.value === null ||
      this.value === '' ||
      this.value.length < this._minLength
    ) {
      this._isShouldToFiled = true;
      this.forceUpdate();
      return false;
    }
    return true;
  }

  get title() {
    return this._title;
  }
  get subStrTwo() {
    return this._subStrTwo;
  }
  get subStrOne() {
    return this._subStrOne;
  }
  get staticValueInput() {
    return this._staticValueInput;
  }
  set title(value: string) {
    this._title = value;
    this.forceUpdate();
  }
  get multiLine() {
    return this._multiLine;
  }

  get numberOfLines() {
    return this._numberOfLines;
  }

  get icon() {
    return this._icon;
  }
  set icon(value: string) {
    this._icon = value;
    this.forceUpdate();
  }
  get iconLeft() {
    return this._iconLeft;
  }
  set iconLeft(value: string) {
    this._iconLeft = value;
    this.forceUpdate();
  }

  get iconOrder() {
    return this._iconOrder;
  }
  get editable() {
    return this._editable;
  }
  set editable(value: boolean) {
    this._editable = value;
    this.forceUpdate();
  }

  get value() {
    return this._value;
  }
  get visible() {
    return this._visible;
  }
  set visible(value) {
     this._visible = value;
    //this.modified = true;
      this.forceUpdate();
  }

  set value(text: string) {
    this._value = text;
    this.forceUpdate();
  }

  get defaultValue() {
    return this._defaultValue;
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.forceUpdate();
  }

  get keyboardType() {
    return this._keyboardType;
  }

  get reference() {
    return this._reference;
  }
  set reference(value) {
    this._reference = value;
  }
  get refView() {
    return this._refView;
  }
  set refView(value) {
    this._refView = value;
  }
  get maxLength() {
    return this._maxLength;
  }

  get name() {
    return this._name;
  }

  get returnKeyType() {
    return this._returnKeyType;
  }

  get required() {
    return this._required;
  }

  get isShouldToFiled() {
    return this._isShouldToFiled;
  }

  get inputType() {
    return this._inputType;
  }

  get selectItems() {
    return this._selectItems;
  }
  set selectItems(value) {
    this._selectItems = value;
  }

  get errorComment() {
    return this._errorComment;
  }

  get style() {
    return this._model.style;
  }

  get iconStyle() {
    return this._model.iconStyle;
  }

  get colSpan() {
    return this._colSpan;
  }

  get datePick() {
    return this._datePick;
  }
  set datePick(value: Date) {
    this._datePick = value;
  }

  get minimumDate() {
    return this._minimumDate;
  }

  get maximumDate() {
    return this._maximumDate;
  }

  onPressIcon() {
    if (this._model.onPressIcon === undefined) {
      return;
    }
    try {
      this._model.onPressIcon(this);
    } catch (e) {
      console.log('onPressIcon ex', e);
    }
  }

  clear(toDefault: boolean = true) {
    this.value = toDefault ? this._defaultValue : '';
  }
  restoreSelector() {
    // add item
    this._defaultSelectItems.forEach((selItem, ind) => {
      const index = this._selectItems.findIndex(
        (item) => item.value == selItem.value,
      );
      if (index === -1) {
        this._selectItems.splice(ind, 0, selItem);
      }
    });
    // Якщо вибраних айтемів більше за деф... тоді видаляємо
    if (this._selectItems.length > this._defaultSelectItems.length) {
      // remove item
      this._selectItems.forEach((selItem) => {
        const index = this._defaultSelectItems.findIndex(
          (item) => item.value == selItem.value,
        );
        if (index === -1) {
          this._selectItems.splice(index, 1);
        }
      });
    }
    this.modified = true;
    this.forceUpdate();
  }
}

export {FormTextBox};
