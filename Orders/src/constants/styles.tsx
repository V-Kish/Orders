import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
  mockupHeightToDP as hp,
  mockupWidthToDP as wp,
} from '../constants/Dimensions';
import {COLORS} from './colors';
import {currentUser} from "../Core/CurrentUser";

export const STYLES = StyleSheet.create({
  mainFlex: {
    flex: 1,
  },
  safeArea:{
    flex: 1,
    backgroundColor: COLORS.HEADER_GRAY.bg,
     marginBottom: Platform.OS === 'ios' ? currentUser().saveAreaInset.bottom : 0,
    marginTop:Platform.OS === 'ios' ?currentUser().saveAreaInset.top : 0
  },
  hidden: {
    height: 0,
    width: 0,
    overflow: 'hidden',
  },
  paddingView: {
    paddingHorizontal: wp(15),
  },
  smallDescription: {
    fontSize: wp(12),
    color: COLORS.FONT_GRAY_TITLE.text,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollBorderBottom: {
    borderColor: COLORS.BLUE.bg,
    borderStyle: 'solid',
    borderBottomWidth: 3,
    marginHorizontal: wp(15),
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BG: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 1,
  },
  navStyles: {
    flex: 1,
    backgroundColor: COLORS.FONT_WHITE,
  },
  preloaderStyle: {
    // flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
    zIndex: 998,
    width: '100%',
    // marginTop: -50,
  },
  screen: {
    backgroundColor: COLORS.FONT_WHITE,
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    overflow: 'hidden',
    paddingHorizontal: wp(10),
  },
  input: {
    // padding: wp(10),
    backgroundColor: COLORS.GRAY_WHITE.bg,
    borderRadius: 10,
  },
  bigMarginVertical: {
    marginVertical: wp(30),
  },
  middleMarginVertical: {
    marginVertical: wp(20),
  },
  smallMarginVertical: {
    marginVertical: wp(10),
  },
  smallMarginHorizontal: {
    paddingHorizontal: wp(5),
  },
  middleMarginHorizontal: {
    paddingHorizontal: wp(10),
  },
  bigMarginHorizontal: {
    paddingHorizontal: wp(10),
  },
  robotoBigTitle: {
    fontFamily: 'Roboto-light',
    fontWeight: '300',
    fontSize: wp(30),
  },
  robotoMidleTitle: {
    fontFamily: 'Roboto-light',
    fontWeight: '300',
    fontSize: wp(25),
  },
  robotoSmallTitle: {
    fontFamily: 'Roboto-light',
    fontWeight: '300',
    fontSize: wp(20),
  },
  robotoBoldBig: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(20),
  },
  robotoBoldMiddle: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(15),
  },
  robotoBoldSmall: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(12),
  },
  robotoBig: {
    fontFamily: 'Roboto',
    fontSize: wp(20),
  },
  robotoMiddle: {
    fontFamily: 'Roboto',
    fontSize: wp(14),
  },
  robotoSmall: {
    fontFamily: 'Roboto',
    fontSize: wp(12),
  },
  mainIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(40),
  },
  mainIconImage: {
    height: hp(280),
    resizeMode: 'contain',
  },
  counter: {
    top: 0,
    right: 0,
    zIndex: 99,
    backgroundColor: COLORS.ERROR.circle,
    position: 'absolute',
    width: hp(26),
    height: hp(26),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCounter: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(12),
    color: COLORS.FONT_WHITE,
  },
  wrapSteps: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeCircle: {
    width: 65 / 2,
    height: 65 / 2,
    borderRadius: 50,
    backgroundColor: COLORS.BLUE.bg,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: COLORS.BORDER_COLOR_GRAY_DARK,
    marginHorizontal: hp(5),
  },
  disabledCircle: {
    width: 63 / 2,
    height: 63 / 2,
    borderRadius: 50,
    backgroundColor: COLORS.GRAY_WHITE.bg,
    borderWidth: 2,
    borderStyle: 'solid',
    marginHorizontal: hp(5),
    borderColor: COLORS.BORDER_COLOR_GRAY_DARK,
  },
  inputContainer: {
    backgroundColor: COLORS.GRAY_WHITE.bg,
    borderRadius: 10,
    padding: wp(10),
  },
  inputContainerTitle: {
    color: COLORS.GRAY_WHITE.text,
    fontFamily: 'Roboto-Regular',
  },
  bottomScreenImage: {
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    position: 'absolute',
    alignItems: 'center',
  },
  scrollPadding: {
    paddingBottom: hp(70),
  },
  btnPadding: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
  },
  addButtonBlock: {
    position: 'absolute',
    right: 0,
    bottom: hp(20),
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //weight
  fw100: {fontWeight: '100'},
  fw200: {fontWeight: '200'},
  fw300: {fontWeight: '300'},
  fw400: {fontWeight: '400'},
  fw500: {fontWeight: '500'},
  fw600: {fontWeight: '600'},
  fw700: {fontWeight: '700'},
  fw800: {fontWeight: '800'},
  // fonts
  fs12: {fontSize: hp(12)},
  fs14: {fontSize: hp(14)},
  fs16: {fontSize: hp(16)},
  fs18: {fontSize: hp(18)},
  fs20: {fontSize: hp(20)},
  fs22: {fontSize: hp(22)},
  // paddings
  pv2: {
    paddingVertical: hp(2),
  },
  ph2: {
    paddingHorizontal: hp(2),
  },
  pv4: {
    paddingVertical: hp(4),
  },
  ph4: {
    paddingHorizontal: hp(4),
  },
  pb6: {
    paddingBottom: hp(6),
  },
  // margin
  // paddings
  mv2: {
    marginVertical: hp(2),
  },
  mh2: {
    marginHorizontal: hp(2),
  },
  mv4: {
    marginVertical: hp(4),
  },
  mh4: {
    marginHorizontal: hp(4),
  },
  mt4: {
    marginTop: hp(4),
  },
  mb6: {
    marginBottom: hp(6),
  },
  mb8: {
    marginBottom: hp(8),
  },
});

export const PAYMENT_STYLE = StyleSheet.create({
  balanceSumm: {
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'flex-start',
  },
  balanceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userBalanceBlock: {
    backgroundColor: COLORS.GRAY_WHITE.bg,
    borderColor: COLORS.BORDER_COLOR_GRAY,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: wp(8),
    alignItems: 'center',
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  paymentTitle: {
    fontFamily: 'Roboto',
    fontSize: wp(12),
    fontWeight: '400',
    color: COLORS.FONT_DETAIL_GRAY,
    letterSpacing: 0.6,
    // fontFamily: 'Roboto',
    // fontStyle: 'normal',
    // fontWeight: 'normal',
    // fontSize: hp(17),
    // lineHeight: hp(15),
    // /* identical to box height, or 19px */
    //
    // letterSpacing: 0.06,
    //
    // /* Gray 2 */
    //
    // color: COLORS.FONT_DETAIL_GRAY,
  },
  paymentTitleMin: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: hp(16),
    // lineHeight: hp(10),
    /* or 15px */

    letterSpacing: 0.06,

    /* Gray 3 */

    // color: COLORS.FONT_DETAIL_GRAY,
    color: '#828282',
  },
  paymentDateBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentDateText: {
    // fontFamily: 'Roboto-Light',
    // fontSize: wp(12),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: hp(16),
    lineHeight: hp(18),
    color: COLORS.FONT_DETAIL_GRAY,
  },
  paymentDateImageBox: {
    paddingHorizontal: wp(5),
  },
  paymentDateImage: {},
  userBalance: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // width: '60%',
    justifyContent: 'space-between',
    paddingVertical: hp(20),
    // backgroundColor: 'red',
  },
  oneSumBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  paymentSumm: {
    fontFamily: 'Roboto',
    fontSize: wp(30),
    fontWeight: '500',
    marginBottom: -hp(5),
    // backgroundColor: 'red'
    // paddingHorizontal: wp(10),
  },
  paymentSummSub: {
    fontFamily: 'Roboto-Light',
    fontSize: wp(15),
    // alignItems: 'flex-start',
    // marginHorizontal: wp(3),
    // backgroundColor: 'red',
    // textAlignVertical: "top",
  },
  subTitleBox: {
    paddingVertical: hp(30),
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: wp(17),
    lineHeight: wp(22),
    color: COLORS.FONT_DETAIL_GRAY,
  },
  paymentInfo: {
    backgroundColor: COLORS.GRAY_WHITE.bg,
    borderColor: COLORS.BORDER_COLOR_GRAY,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: wp(8),
  },
  successStatus: {
    color: COLORS.SUCCESS.text,
  },
  errorStatus: {
    color: COLORS.ERROR.text,
  },
  successPayment: {
    backgroundColor: COLORS.SUCCESS_EVENT.bg,
    borderColor: COLORS.SUCCESS_EVENT.borderColor,
  },
  errorPayment: {
    backgroundColor: COLORS.DANGER_EVENT.bg,
    borderColor: COLORS.DANGER_EVENT.borderColor,
  },
  statusMess: {
    fontSize: wp(16),
  },
  userBalanceImageBox: {
    // paddingRight: hp(10)
  },
  userBalanceImage: {
    width: wp(35),
    height: wp(35),
  },

  tariffInfo: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,240,.3)',
    paddingHorizontal: wp(5),
    paddingVertical: hp(10),
  },
  oneTariffInfo: {
    flexDirection: 'row',
    // width:'100%'
  },
  oneTatiffInfoTitle: {
    fontFamily: 'Roboto',
    fontSize: wp(12),
    fontWeight: '400',
    color: COLORS.FONT_DETAIL_GRAY,
    letterSpacing: 0.6,
  },
  oneTatiffInfoValue: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(14),
    fontWeight: '700',
    color: COLORS.FONT_DETAIL_GRAY,
    letterSpacing: 0.6,
    textAlign: 'right',
  },

  userInfoBox: {
    // backgroundColor: 'red',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // flexWrap: 'wrap'
    marginVertical: hp(5),
  },

  userInfo: {
    // flex: 1,
  },
  userInfoOneBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
    marginVertical: hp(3),
  },
  userInfoTitle: {
    // fontSize: wp(10),
    // width: '100%',
    height: '100%',
  },
  rightBox: {
    alignItems: 'flex-end',
  },
  userInfoValue: {
    // width: '100%',
  },
});
export const STYLES_LIST = StyleSheet.create({
  list: {
    flex: 1,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    paddingVertical: hp(10),
  },
  listItemFile: {
    width: '15%',
  },
  container: {
    width: '100%',
  },
  listItemDate: {
    justifyContent: 'flex-end',
    width: '85%',
  },
  listBlock: {
    width: '85%',
    flexDirection: 'row',
  },
  listItemGroupName: {
    width: '80%',
  },
  listItemGroupCount: {
    width: '20%',
    alignItems: 'flex-end',
  },
  listItemDateText: {
    textAlign: 'right',
    fontSize: hp(12),
    color: COLORS.FONT_GRAY_TITLE.text,
  },
  listItemTitle: {
    width: '85%',
  },
  listItemTitleText: {
    fontSize: hp(16),
    color: COLORS.FONT_BLACK,
  },
  counterText: {
    fontSize: hp(16),
    color: 'green',
  },
  listItemComment: {
    width: '85%',
  },
  listItemCommentText: {
    fontSize: hp(14),
    color: COLORS.FONT_GRAY_TITLE.text,
  },
  listItemBorderButton: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER_BOTTOM_LINE,
  },
  // list Group
  listGroup: {},
  listGroupTitle: {},
  listGroupTitleTextMedium: {
    fontFamily: 'Roboto-Medium',
    color: COLORS.FONT_BLACK,
  },
  listGroupTitleTextRegular: {
    fontFamily: 'Roboto-Regular',
    color: COLORS.FONT_BLACK,
  },
  listGroupItems: {},
  filesImage: {
    resizeMode: 'contain',
    width: wp(35),
    height: hp(35),
    marginRight: hp(10),
  },
  borderShadows: {
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 2,
  },
});
export const DOCUMENT_LIST = StyleSheet.create({});
