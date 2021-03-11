// import { UserData } from '../store/actions/userData';
// import { resetTries } from './resetTries';
// import {
//   headerPreloader,
//   PassAuth,
//   PassCalories,
//   preloader,
// } from '../store/actions/AppStart';
// import { CustomAlerts } from '../store/actions/CustomAlert';
// import { navigator } from '../../Core/Navigator';
// import { currentUser } from '../../Core/CurrentUser';
// import { isUserPinCode } from './isUserPinCode';

export function CheckResponse(response, setLoader, context) {
  if (setLoader !== undefined) {
    setLoader(false);
  }
  //AppLog.log('authResponse', response);
  if (typeof response !== 'undefined' && response.statusCode === 200) {
    if (context) {
      response.__context__ = context;
    }
    return response;
  } else {
    throw response;
  }
}

// export function Resolve(answer, dispatch, setClearForm, getTokenFireBase) {
//   //AppLog.log('authResponse', navigation);
//   //  Save in secure storage userData
//   currentUser().secureUserDataSet({
//     userToken: answer.result.token,
//     userId: answer.result.userId,
//   });
//   // check user have Pin Code
//   isUserPinCode(dispatch, setClearForm);
//   navigator().isPasswordChange = false;
//   //dispatch(preloader(false));
//   dispatch(headerPreloader(false));
//   dispatch(UserData(answer));
//   getTokenFireBase(answer.result.token);
//   dispatch(PassAuth(true));
//   dispatch(PassCalories(true));
//   //setClearForm(true);
//   //navigator().navigate('Pin');
//   //currentUser().userToken = answer.result.token;
//   return resetTries('tries');
// }
// export function Reject(e, dispatch, triesLogin, clickTries) {
//   dispatch(preloader(false));
//   dispatch(headerPreloader(false));
//   clickTries(triesLogin);
//   AppLog.log('authError', e);
//   return dispatch(
//     CustomAlerts({
//       text: 'Неправильний логін або пароль',
//       textTitle: null,
//       isShow: true,
//       isShowFullScreen: false,
//     }),
//   );
// }
