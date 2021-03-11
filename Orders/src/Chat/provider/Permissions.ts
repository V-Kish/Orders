import {PermissionsAndroid, Platform} from 'react-native';

class Permissions {
    private _writeExternalStorage: boolean;
    private _writeInternalStorage: boolean;
    private _permissionTypes: {
        externalStorage: string;
        internalStorage: string;
        location: string;
    };
    private _locationAccess: boolean;

    constructor() {
        this._writeExternalStorage = false;
        this._writeInternalStorage = false;
        this._locationAccess = false;
        this._permissionTypes = {
            externalStorage: 'WRITE_EXTERNAL_STORAGE',
            internalStorage: 'WRITE_INTERNAL_STORAGE',
            location: 'ACCESS_FINE_LOCATION',
        };
    }

    get writeExternalStorage() {
        return this._writeExternalStorage;
    }

    get writeInternalStorage() {
        return this._writeInternalStorage;
    }

    get location() {
        return this._locationAccess;
    }

    get permissionTypes() {
        return this._permissionTypes;
    }

    async requestStoragePermission(requestType) {
        if(Platform.OS !== 'ios'){
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS[requestType],
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.setPermission(requestType, true);
                    return true;
                } else {
                    this.setPermission(requestType, false);
                    return false;
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            return true
        }
    }

    setPermission(requestType: string, response: boolean) {
        switch (requestType) {
            case this.permissionTypes.externalStorage:
                this._writeExternalStorage = response;
                break;
            case this.permissionTypes.internalStorage:
                this._writeInternalStorage = response;
                break;
            case this.permissionTypes.location:
                this._locationAccess = response
        }
    }
}

export { Permissions };
