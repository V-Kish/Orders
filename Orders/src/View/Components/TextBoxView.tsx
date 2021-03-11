import * as React from 'react';
import {TextInput} from 'react-native';
import {TypedBaseComponent} from '../../Common/BaseComponent';
import { TextBox } from '../../Model/Components/TextBox';

class TextBoxView extends TypedBaseComponent<TextBox> {
  constructor(props) {
    super(props);
  }

  render() {
    super.render();
    const props = {
      onChangeText: undefined,
      onFocus: undefined,
      onBlur: undefined,
      onEndEditing: undefined,
      value: undefined,
      autoFocus: undefined,
      multiline: undefined,
      maxLength: 35,
      keyboardType: 'default',
      editable: true,
    };
    if (typeof this.model.onChangeText === 'function') {
      props.onChangeText = this.model.onChangeText.bind(this.model);
    }
    if (typeof this.model.onFocus !== 'undefined') {
      props.onFocus = this.model.onFocus.bind(this.model);
    }
    if (typeof this.model.onBlur !== 'undefined') {
      props.onBlur = this.model.onBlur.bind(this.model);
    }
    if (typeof this.model.onEndEditing !== 'undefined') {
      props.onEndEditing = this.model.onEndEditing.bind(this.model);
    }
    if (typeof this.model.autoFocus !== 'undefined') {
      props.autoFocus = this.model.autoFocus;
    }
    if (typeof this.model.multiline !== 'undefined') {
      props.multiline = this.model.multiline;
    }
    if (typeof this.model.editable !== 'undefined') {
      props.editable = this.model.editable;
    }
    return (
      <TextInput
        key={`${this.model.id}_TextBox`}
        editable={this.model.editable}
        ref={(ref) => {
          this.model.ref = ref;
        }}
        placeholder={
          typeof this.props.placeholder !== 'undefined'
            ? this.props.placeholder
            : `${this.model.placeholder}`
        }
        placeholderStyle={
          this.props.style !== undefined && typeof this.props.style.placeholderStyle !== 'undefined'
            ? this.props.style.placeholderStyle
            : null
        }
        placeholderTextColor={
          typeof this.props.plcColor !== 'undefined'
            ? this.props.plcColor
            : null
        }
        maxLength={this.model.maxLength}
        style={
          this.props.style !== undefined &&typeof this.props.style.textInput !== 'undefined'
            ? this.props.style.textInput
            : null
        }
        secureTextEntry={this.model.secureTextEntry}
        onChangeText={props.onChangeText}
        onEndEditing={props.onEndEditing}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        autoFocus={props.autoFocus}
        autoCorrect={this.model.autoCorrect}
        autoCompleteType={'off'}
        multiline={this.model.multiline}
        value={this.model.value}
        keyboardType={this.model.keyboardType}
        defaultValue={
          typeof props.placeholder !== 'undefined' ? props.defaultValue : null
        }
      />
    );
  }
}

export {TextBoxView};
