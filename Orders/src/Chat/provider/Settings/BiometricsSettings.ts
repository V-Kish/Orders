import { Base } from "../Base";
import FingerprintScanner, { Biometrics } from 'react-native-fingerprint-scanner';
import { navigator } from "../../../Core/Navigator";
import { Platform } from 'react-native';
import {currentUser} from "../../controllers/CurrentUser";

type biometricsSettings = {
    id: string;
}


class BiometricsSettings extends Base {
    private _model: biometricsSettings;
    private _biometry: boolean;
    private _biometryTypeAvailable: Biometrics;
    constructor(model) {
        super(model.id);
        this._model = model;
        this.detectBiometry = this.detectBiometry.bind(this);
        this.onSwitchChange = this.onSwitchChange.bind(this);

    }

    get biometry() {
        return this._biometry;
    }

    get biometryTypeAvailable() {
        return this._biometryTypeAvailable;
    }

    detectBiometry() {
        if (!navigator().biometryFlag) {
            return
        }
        FingerprintScanner
            .isSensorAvailable()
            .then((biometryType) => {
                this._biometry = true;
                this._biometryTypeAvailable = biometryType;
                navigator().biometryAvailability = this._biometry;
                this.forceUpdate();
            })
            .catch(() => { });
    }

    //if false we won't enable biometry on device
    availableOnPlatform() {
        return Platform.Version >= 23;
    }

    onSwitchChange() {
        navigator().biometryEnabled ? navigator().biometryEnabled = false : navigator().biometryEnabled = true;
        currentUser().saveUser();
        this.forceUpdate();
    }
}

export { BiometricsSettings }
