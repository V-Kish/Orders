import * as React from 'react';
import {BackHandler, Platform, SafeAreaView } from 'react-native';
import {navigator} from '../Core/Navigator';
import {controllers} from '../Controllers/Controllers';
import {STYLES} from '../constants/styles';


class BaseScreen extends React.Component {
  private _screenName: string;
  private _onFocusListeter: any;
  private _backHandler: any;
  private _onBlurListeter: any;
  private _swipeEnabled: boolean;
  private _modified: boolean;

  constructor(props) {
    super(props);
    this._modified = false;
    this._onFocusListeter = null;
    this._backHandler = null;
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  get screenName() {
    return this._screenName;
  }

  get swipeEnabled() {
    return true;
  }

  set modified(value) {
    this._modified = value;
  }
  get modified() {
    return this._modified;
  }

  async onFocus() {
    navigator().setCurrentScreen(this.screenName, this.swipeEnabled);
    this._backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return this.handleBackPress();
      },
    );
  }

  async onBlur() {
    if (this._backHandler !== null) {
      this._backHandler.remove();
    }
  }

  handleBackPress = () => {

    // if (navigator().getCurrentScreen() === 'OssbDocumentsScreen') {
    //   controllers().userController.osbbDocuments.documents.onBackPress();
    //   return true;
    // }
    navigator().toGoBack();
    return true;
  };

  componentDidMount() {
    this._onFocusListeter = this.props.navigation.addListener(
      'focus',
      this.onFocus,
    );
    this._onBlurListeter = this.props.navigation.addListener(
      'blur',
      this.onBlur,
    );
    //AppLog.error('handleBackButton', this);
  }

  componentWillUnmount() {
    if (this._onFocusListeter !== null) {
      this._onFocusListeter();
      this._onBlurListeter();
    }
  }
  content() {
    return null
  }
  render() {
    return (
        <SafeAreaView style={STYLES.safeArea}
                      onLayout={(event) => {
                        const height = event.nativeEvent.layout.height;
                        const width = event.nativeEvent.layout.width;
                          if(navigator().deviceHeight === 0 && Platform.OS !== 'ios'){
                            navigator().deviceHeight = height;
                            navigator().deviceWidth = width;
                          }
                          if (Platform.OS === 'ios'){
                            navigator().deviceHeight = height;
                            navigator().deviceWidth = width;
                          }
                      }}
        >
          {this.content()}
        </SafeAreaView>
    )
  }
}

export {BaseScreen};
