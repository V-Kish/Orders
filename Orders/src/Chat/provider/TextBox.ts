//
import { Base } from './Base';

type propsTypes = {
    id: string,
    value?: string,
    placeholder?: string,
    style?: string,
    secureTextEntry?: boolean,
    onChangeText?: (textBox: TextBox, text: string) => void,
    onSelectionChange?: (nativeEvent: any) => void,
    onContentSizeChange?: (event: any) => void,
    isValid?: boolean,
    onFocus?: (textBox: TextBox) => void,
    onBlur?: (textBox: TextBox) => void,
    onEndEditing?: (textBox: TextBox) => void,
    autoFocus?: boolean,
    autoCorrect?: boolean,
    multiline?: boolean,
    maxLength?: number,
    numberOfLines?: number;
};

class TextBox extends Base {

    private _model: propsTypes;
    constructor(model: propsTypes) {
        super(model.id);
        this._model = model;
    }
    set numberOfLines(value){
        if(this._model.numberOfLines!==value) {
            this._model.numberOfLines = value
        }
    }
    get numberOfLines(){
        return this._model.numberOfLines
    }
    set autoFocus(value) {
        this._model.autoFocus = value;
    }
    get autoFocus() {
        return this._model.autoFocus;
    }
    get multiline() {
        return this._model.multiline;
    }
    clearForm() {
        this.value = ''
        this.ref.clear();
        this.ref.blur();
    }
    clearFormWithoutBlur() {
        this.value=''
        this.ref.clear();
    }
    get value(): string {
        if (this.ref === null) {
            return '';
        }
        return this.ref._lastNativeText || '';
    }
    set value(value: string) {
        if (this.value !== value) {
            if (this.ref !== null) {
                try {
                    this.ref._lastNativeText = value;
                    this.ref.setNativeProps({ text: value });
                } catch (error) {
                    console.log('error  set value', error)
                }
            }

        }
    }
    /*
    comment
    * */
    get placeholder() {
        return this._model.placeholder;
    }
    get maxLength() {
        return this._model.maxLength;
    }
    get secureTextEntry() {
        return this._model.secureTextEntry;
    }
    set secureTextEntry(value) {
        this._model.secureTextEntry = value;
    }
    get style() {
        return this._model.style;
    }
    set style(value) {
        this._model.style = value;
    }
    get isValid() {
        return this._model.isValid;
    }
    set isValid(value) {
        this._model.isValid = value;
    }
    get autoCorrect() {
        return this._model.autoCorrect;
    }

    update(isValid: boolean, style: string): boolean {
        if (this.isValid !== isValid || this.style !== style) {
            this.style = style;
            this.isValid = isValid;
            this.modified = true;
            this.forceUpdate();
            return true;
        }
        return false;
    }
    onChangeText(text: string) {
        if (typeof this._model.onChangeText !== 'undefined') {
            this.value = text;
            this._model.onChangeText(this, text);
        }
    }
    onFocus() {
        if (typeof this._model.onFocus !== 'undefined') {
            this._model.onFocus(this);
        }
    }
    onBlur() {
        if (typeof this._model.onBlur !== 'undefined') {
            this._model.onBlur(this);
        }
    }
    onEndEditing() {
        if (typeof this._model.onEndEditing !== 'undefined') {
            this._model.onEndEditing(this);
        }
    }
    onSelectionChange({ nativeEvent }) {
        if (typeof this._model.onSelectionChange !== 'undefined') {
            this._model.onSelectionChange(nativeEvent);
        }
    }

    onContentSizeChange(event) {
        if (typeof this._model.onContentSizeChange === 'function') {
            this._model.onContentSizeChange(event);
        }
    }

    focus() {
        if (this.ref === null) {
            return;
        }
        try {
            this.ref.focus();
        }
        catch (ex) {
            console.error('TextBox focus error ->', ex);
        }
    }

    blur() {
        if (this.ref === null) {
            return;
        }
        try {
            this.ref.blur();
        }
        catch (ex) {
            console.error('TextBox blur error ->', ex);
        }
    }
}

export { TextBox };
