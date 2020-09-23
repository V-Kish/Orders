import DeviceInfo from 'react-native-device-info';
type deviceInfoType = {
  AndroidID: string;
  Bootloader: string;
  Brand: string;
  DeviceID: string;
  BuildID: string;
  MAC: string;
  IP: string;
} | null;
let androidId = '';
let bootloader = '';
let buildId = '';
let mac = '';
let ip = '';
let inited = false;
let deviceInfo: deviceInfoType = null;

export class PhoneInfo {
  private static async init() {
    if (inited) {
      return;
    }
    //Gets the ANDROID_ID
    const promise1 = DeviceInfo.getAndroidId();
    // const promise1 = DeviceInfo.getAndroidId().then((androidId) => {
    //   PhoneInfo.androidId = androidId;
    // });
    //The system bootloader version number.
    const promise2 = DeviceInfo.getBootloader();
    // const promise2 = DeviceInfo.getBootloader().then((bootloader) => {
    //   PhoneInfo.bootloader = bootloader;
    // });
    //Gets build number of the operating system.
    const promise3 = DeviceInfo.getBuildId();
    // const promise3 = DeviceInfo.getBuildId().then((buildId) => {
    //   PhoneInfo.buildId = buildId;
    // });
    //Gets the network adapter MAC address.
    const promise4 = DeviceInfo.getMacAddress();
    // const promise4 = DeviceInfo.getMacAddress().then((mac) => {
    //   PhoneInfo.mac = mac;
    // });
    //  Gets the device current IP address
    const promise5 = DeviceInfo.getIpAddress();
    // const promise5 = DeviceInfo.getIpAddress().then((ip) => {
    //   PhoneInfo.ip = ip;
    // });
    const results = await Promise.all([
      promise1,
      promise2,
      promise3,
      promise4,
      promise5,
    ]);
    androidId = results[0];
    bootloader = results[1];
    buildId = results[2];
    mac = results[3];
    ip = results[4];
    inited = true;
  }

  static async getDeviceInfo() {
    if (deviceInfo !== null) {
      return deviceInfo;
    }
    await PhoneInfo.init();
    deviceInfo = {
      AndroidID: androidId,
      Bootloader: bootloader,
      Brand: DeviceInfo.getBrand(),
      DeviceID: DeviceInfo.getDeviceId(),
      BuildID: buildId,
      MAC: mac,
      IP: ip,
    };
    return deviceInfo;
  }
}
