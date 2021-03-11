import {BaseModel} from "../../Common/BaseModel";
import {Button} from "../Components/Button";
import {CHAT_ICONS, ICONS} from "../../constants/icons";
import {store} from "../../Chat/provider/Store";
import {loadData, UserDataProvider} from "../../DataProvider/UserDataProvider";
import {baseResponse} from "../../DataTypes/BaseTypes";
import {navigator} from "../../Core/Navigator";
import {controllers} from "../../Controllers/Controllers";
import {StepsModel} from "../Components/Step/StepsModel";
import {userApartmentDetailType, userDataType} from "../../DataTypes/userDataType";
import {currentUser} from "../../Core/CurrentUser";
type UserDetailProps = {
    id: string,
}

class UserDetailModel extends BaseModel {
    private _model: UserDetailProps
    private _userModel: userDataType;
    private _userId: number;
    private _userName: string;
    private _userAddress: string;
    private _userPhone: string;
    private _userBlocked: boolean;
    private _newChatBtn: Button;
    private _blockUserBtn: Button;
    private _steps: StepsModel;
    constructor(_model: UserDetailProps) {
        super(_model.id);
        this._model = _model
        this.onNewChatBtnPress = this.onNewChatBtnPress.bind(this)
        this.onBlockBtnPress = this.onBlockBtnPress.bind(this)
        this._userId = -1
        this._userName = ''
        this._userAddress = ''
        this._userPhone = ''
        this._newChatBtn = new Button({
            id: 'newChatBtn',
            title: 'Написати',
            style: 'newChatBtn',
            icon: CHAT_ICONS.mail,
            onPress: this.onNewChatBtnPress
        })
        this._blockUserBtn = new Button({
            id: 'blockUserBtn',
            title: 'Заблокувати',
            style: 'blockUserBtn',
            // icon: CHAT_ICONS.chatLock,
            onPress: this.onBlockBtnPress
        })
        this._userBlocked = false
        this._userModel = {}
        this._steps = new StepsModel({
            id: 'stepsModel',
            steps: [
                {name: 'loader'},
                {name: 'detail'},
            ]
        })
    }

  async getUserInfo(userHash: string) {
        console.log('userResponse getUserInfo', userHash)
    this.stepsControll.changeStep('loader');
    const userResponse = await loadData<baseResponse<any>>(
      UserDataProvider.getUserInfoByHash,
      {
          osbbHash: currentUser().currentOsbb?.hash,
          userHash
      },
    );
    console.log('userResponse', userResponse);
    this._userModel = userResponse.data;
    this.userIcon.modified = true;
    this.forceUpdate();
    this.stepsControll.changeStep('detail');
  }

  get userIcon() {
    const contact = store().contactsItems.getOrAdd(this._userModel.id);
    return contact.icon;
  }

    get userId(){
        return this._userModel.id
    }
    get userName(){
        return this._userModel.name
    }
    getAddressFromDetail(detailInfo:userApartmentDetailType){
        if(detailInfo){
            return `${detailInfo.houseAddress}, ${detailInfo.houseNumber}, ${detailInfo.apartmentNumber}`
              //  return `вул. ${detailInfo.houseAddress}, буд. ${detailInfo.houseNumber}, кв. ${detailInfo.apartmentNumber}`
        }
        return '';
    }
    get userAddress(){
        if(this._userModel?.detailInfo){
            const addresses = this._userModel?.detailInfo.filter(e=>e.osbbName === currentUser().currentOsbb?.name)
            let fullAddress = ''
            addresses.forEach(detail=>{
                fullAddress += this.getAddressFromDetail(detail)+(addresses.length>1 ? '\r\n':'');
            })
            return fullAddress
        } else {
            return ''
        }
    }
    get userPhone(){
        return this._userModel.phone
    }

  async onNewChatBtnPress() {
    if (this._userModel.id !== null && this._userModel.id !== undefined) {
      // store().chats.selectedChatId = this._userModel.id
      controllers().preloader.show();
      await navigator().toChatStack();
      console.log('newChat', this.userIcon)
      await store().contacts.createNewChat(this.userIcon);
      // await store().contactsItems.
      // await store().chats.current?.onPress()
      // alert('pressed')
        }
    }

    get newChatBtn(){
        return this._newChatBtn
    }
    get blockBtn(){
        return this._blockUserBtn
    }

    get steps(){
        return this._steps.steps
    }

    get stepsControll(){
        return this._steps
    }

    onBlockBtnPress(){}

    get chatList(){
        return store().chats.storage
            .filter(i=>i.isPublic)
            .filter(c=> c.members && c.members.find(f=>f.id == 56)!==undefined)
    }
}

export {UserDetailModel};
