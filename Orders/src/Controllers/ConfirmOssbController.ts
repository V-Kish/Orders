import {ChooseOssb} from '../Models/ChooseOssbStack/ChooseOssb/ChooseOssb';
import {FindOssb} from '../Models/ChooseOssbStack/FindOssb/FindOssb';
import {VerifyInOssb} from '../Models/ChooseOssbStack/VerifyInOssb/VerifyInOssb';
import {MakeOssb} from '../Models/ChooseOssbStack/MakeOssb/MakeOssb';
import {WaitingModel} from '../Models/Waiting/WaitingModel';
import { VerificationResult } from '../Models/ChooseOssbStack/VerificationResult/VerificationResult';

class ConfirmOssbController {
  private _chooseOssb: ChooseOssb;
  private _findOssb: FindOssb;
  private _verifyInOssb: VerifyInOssb;
  private _makeOssb: MakeOssb;
  private _waiting: WaitingModel;
  private _verificationResult: VerificationResult;
  constructor() {
    this._chooseOssb = new ChooseOssb('chooseOssb');
    this._findOssb = new FindOssb('findOssb');
    this._verifyInOssb = new VerifyInOssb('verifyInOssb');
    this._makeOssb = new MakeOssb('makeOssb');
    this._waiting = new WaitingModel({id: 'WaitingModel'});
    this._verificationResult = new VerificationResult('VerificationResult');
  }

  get chooseOssb() {
    return this._chooseOssb;
  }
  get waiting() {
    return this._waiting;
  }
  get findOssb() {
    return this._findOssb;
  }
  get verifyInOssb() {
    return this._verifyInOssb;
  }
  get makeOssb() {
    return this._makeOssb;
  }
  get verificationResult(){
    return this._verificationResult
  }
  
}

export {ConfirmOssbController};
