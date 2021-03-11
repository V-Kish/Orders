import { BaseModel } from '../../Common/BaseModel';

class WelcomeHeader extends BaseModel {
  private _title: string;
  private _subTitle: string;
  constructor({
    id,
    title,
    subTitle
  }: {
    id: string;
    title: string;
    subTitle?: string;
  }) {
    super(id);
    this._title = title;
    this._subTitle = subTitle ? subTitle : ''
  }

  get title(){
      return this._title
  }
  get subTitle(){
    return this._subTitle
  }
}

export { WelcomeHeader };
