import { Base } from '../Base';
import { ArrowBackButton } from './ArrowBackButton';
import { CloseButton } from './CloseButton';
import { TextBoxHeader } from './TextBoxHeader';

import { navigator } from '../../../Core/Navigator';
// import {TextBox} from "../Auth/TextBox";
import {store} from "../Store";
class ContactsHeader extends Base {
    id: string;
    private _arrowBackButton: ArrowBackButton;
    private _closeButton: CloseButton;
    private _textBoxHeader: TextBoxHeader;
    private _changeText: (text: string) => void;

    constructor({ id, onChangeText }: { id: string, onChangeText?: (text: string) => void }) {
        super(id);
        this.arrowBackNavigation = this.arrowBackNavigation.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this._changeText = onChangeText;
        this._arrowBackButton = new ArrowBackButton({ id: 'ArrowBack', onPress: this.arrowBackNavigation });
        this._closeButton = new CloseButton({ id: 'ArrowBack', onPress: this.clearForm });
        this._textBoxHeader = new TextBoxHeader({ id: 'TextBoxHeader', style: 'searchInput', placeholder: 'знайти контакт', value: '', onChangeText: this.onChangeText });
    }
    get textBoxHeader() {
        return this._textBoxHeader;
    }
    get arrowBackButton() {
        return this._arrowBackButton;
    }
    get closeButton() {
        return this._closeButton;
    }
    onPress() {
        // navigator().navigate('Contacts')
    }
    onChangeText(text: string) {
        this._changeText(text);
    }
    clearForm() {
        this.textBoxHeader.clearForm();
        this.onChangeText('')
    }
    async arrowBackNavigation() {
        await store().preloader.showWithCallback(() => {
            // navigator().navigate('ChatListScreen');
            navigator().toGoBack();
        });
    }
}

export { ContactsHeader };
