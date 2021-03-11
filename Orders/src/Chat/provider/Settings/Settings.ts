import {Base} from "../Base";
import {currentUser} from "../../../Core/CurrentUser";
import messaging from "@react-native-firebase/messaging";
import { fetchData } from "../../../Common/fetchData";
// import { BiometricsSettings } from './BiometricsSettings';

type settings = {
    id: string;
    isDateTimePickerOpened: boolean;
}

class Settings extends Base{
    private _model: settings;
    // private _biometrySwitch: BiometricsSettings;
    private _sizeAllItems: number;
    constructor(model) {
        super(model.id);
        this._model = model;
        this._model.isDateTimePickerOpened = false;
        this._sizeAllItems = 0;
        this.openDateTimePicker = this.openDateTimePicker.bind(this);
        this.onSwitchChange = this.onSwitchChange.bind(this);
        this.setDND = this.setDND.bind(this);
        // this._biometrySwitch = new BiometricsSettings({ id: 'BiometrySwitch' });
    }

    get isDateTimePickerOpened() {
        return this._model.isDateTimePickerOpened
    }

    // get biometrySwitch() {
    //     return this._biometrySwitch;
    // }

    set sizeAllItems(value) {
        this._sizeAllItems = value;
    }

    get sizeAllItems() {
        return this._sizeAllItems;
    }
    openDateTimePicker () {
        this._model.isDateTimePickerOpened = !this._model.isDateTimePickerOpened;
        this.modified = true;
        this.forceUpdate();
    }

    onSwitchChange() {
        currentUser().DNDStatus ? this.removeDND() : this.openDateTimePicker();
    };

    removeDND() {
        messaging()
            .getToken()
            .then(deviceToken => {
                fetchData(
                    `api-v1/${currentUser().userToken}/do-not-disturb/remove`,
                    'post',
                    {
                        token: deviceToken,
                    },
                )
                    .then(
                        response => {
                            if(response.statusCode === 200){
                                currentUser().removeDND();
                                this.modified = true;
                                this.forceUpdate();
                            }
                        },
                        error => {}, //AppLog.log('onTimeChange', error),
                    );
            });
    }

    setDND(event, selectedDate) {
        if (selectedDate !== undefined) {
            messaging()
                .getToken()
                .then(deviceToken => {
                    const body = {
                        token: deviceToken,
                        dateFrom: new Date().toUTCString(),
                        dateTo: selectedDate.toUTCString(),
                    };
                    // AppLog.log('onTimeChange', body);
                    fetchData(
                        `api-v1/${currentUser().userToken}/do-not-disturb/add`,
                        'post',
                        body,
                    )
                        .then(
                            response => {
                                console.log('responseo-not-disturb',response)
                                if (response.result) {
                                   currentUser().setDND(response.result);
                                    this.openDateTimePicker();
                                    this.modified = true;
                                    this.forceUpdate();
                                }
                            },
                            error => {
                                // AppLog.log('onTimeChange', error);
                            },
                        );
                });
        } else {
           this.openDateTimePicker();
        }
    }

    setMaximumDate() {
        return new Date(new Date(new Date().setHours(24)).setMinutes(0, 0, 0));
    }


}
export {Settings};
