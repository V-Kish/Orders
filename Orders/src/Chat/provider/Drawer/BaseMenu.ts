import {Base} from "../Base";
import {
    PanResponder,
} from 'react-native';
import React from 'react';
import Animation from "react-native-reanimated/lib/typescript/animations/Animation";

enum BaseMenuPosition {
    right = 1,
    left = 2,
}
const MAX = {
    maskAlpha: 0.5
};
const drawerWidth = 200
const width = 100

class BaseMenu extends Base{
    private MAX_DX: number;
    private MAX_ALPHA: number;
    private inAnimation: boolean;
    private _pan: any;
    private isOpen: boolean;
    private isActive: boolean;
    private isDisabled: boolean;
    private showMask: boolean;
    private styles: any;
    private duration: number;
    private _main: any;
    private _mask: any;
    private _leftDrawer: any;
    private _rightDrawer: any;
    private easingFunc: any;
    constructor(id) {
        super(id);
        this.MAX_DX = drawerWidth;
        this.MAX_ALPHA = MAX.maskAlpha;
        this.styles = {
            leftDrawer: {
                style: {
                    top: 0,
                    bottom: 0,
                    left: -this.MAX_DX,
                    right: width
                }
            },
            rightDrawer: {
                style: {
                    top: 0,
                    bottom: 0,
                    left: width,
                    right: -this.MAX_DX
                }
            },
            main: {
                style: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            },
            mask: {
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 0)'
                }
            }
        };
        this.inAnimation = false;
        this.isOpen = false
        this.isActive = false
        this.isDisabled = false
        this.showMask = true
        this.duration = 160
        this.updateNativeStyles = this.updateNativeStyles.bind(this);
        this._handleMainBoardPress = this._handleMainBoardPress.bind(this);
        this._drawerDidClose = this._drawerDidClose.bind(this);
        this._drawerDidOpen = this._drawerDidOpen.bind(this);
        this._bindDrawerRef = this._bindDrawerRef.bind(this);
        this._maskRefBind = this._maskRefBind.bind(this);
        this._mainRefBind = this._mainRefBind.bind(this);
        this._leftDrawerRefBind = this._leftDrawerRefBind.bind(this);
        this._rightDrawerRefBind = this._rightDrawerRefBind.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    get position() {
        return BaseMenuPosition.left
    }

    init(){
        this._pan = PanResponder.create({
            onStartShouldSetPanResponder: this._onStartShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder.bind(this),
            onPanResponderTerminationRequest: this._handleTerminationRequest.bind(this),
            onPanResponderGrant: this._handlePanResponderGrant.bind(this),
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderEnd.bind(this),
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
            onShouldBlockNativeResponder: this._shouldBlockNativeResponder.bind(this)
        });
    }

    update() {

    }
    get pan(){
        return this._pan.panHandlers;
    }

    _shouldBlockNativeResponder(evt, gestureState) {
        return true;
    }

    _handleTerminationRequest() {
        return true;
    }

    _onStartShouldSetPanResponder(evt, gestureState) {
        // set responder for tapping when the drawer is open
        if (this.isOpen && !this.inAnimation && !this.isDisabled ) return true;
        return false;
    }

    onMoveShouldSetPanResponder(evt, gestureState) {
        // custom pan responder condition function
        if (this.isDisabled) return false;
        //Todo: figure out this lines of code
        if (this._touchPositionCheck(gestureState)) {
            //this.props.showMask && !this.state.showMask && this.setState({ showMask: true });
            //this.props.onDrawerStartOpen && this.props.onDrawerStartOpen();
            return true;
        }
        return false;
    }

    _handlePanResponderGrant(evt, gestureState) {
        return ;
    }

    _handlePanResponderMove(evt, gestureState) {
        let dx = gestureState.dx;
        if (dx > 0 && dx <= this.MAX_DX) {
            // swipe right
            if (this.isOpen) return this.updateNativeStyles(-this.MAX_DX + dx);
            //Todo: figure out the difference
            if (!this.isOpen) this.updateNativeStyles(dx);
        } else if (dx < 0 && dx >= -this.MAX_DX) {
            // swipe left
            if (this.isOpen) return this.updateNativeStyles(this.MAX_DX + dx);
            //if (this.isRight && !this.isRightOpen) this._updateNativeStyles(dx);
        }
        // dx === 0 triggers tap event when drawer is opened.
    }
    _handlePanResponderEnd(evt, gestureState) {
        let currentWidth = Math.abs(this._getCurrentDrawerWidth());
        let isOpen = this.isOpen;
        if (isOpen && gestureState.dx === 0) return this._handleMainBoardPress();
        if (currentWidth === this.MAX_DX) return this._drawerDidOpen();
        if (currentWidth === 0) return this._drawerDidClose();
        if (currentWidth > this.MAX_DX / 2) {
            this.openDrawer();
        } else {
            this.closeDrawer();
        }
    }
    _getCurrentDrawerWidth() {
        return this.isActive ? this.styles.leftDrawer.style.left + this.MAX_DX :
            this.styles.rightDrawer.style.left - width;
    }
    _touchPositionCheck(gestureState) {
        const { moveX, dx, dy } = gestureState;
        // in move set panresponder state, moveX is the original point's coordinates
        let x0 = moveX;
        let isOpen = this.isOpen;
        if (Math.abs(dx) < Math.abs(dy)) return false;
        // swipe when drawer is fully opened
        if (
            this.isOpen && !this.isDisabled && dx < 0 ||
            (this.isOpen && !this.isDisabled && dx > 0)
        ) {
            return true;
        }
        // swipe right to open left drawer
        if (!this.isDisabled && x0 <= width * 0.2 && !isOpen && dx > 0) {
            this.isActive = true;
            return true;
        }
        // swipe left to open right drawer
        if (!this.isDisabled && x0 >= this.MAX_DX && !isOpen && dx < 0) {
            this.isActive = true;
            return true;
        }
        return false;
    }
    closeDrawer() {
        if (this.inAnimation) return;
        this.inAnimation = true;
        let left = this._getCurrentDrawerWidth();
        new Animation({
            start: left,
            end: 0,
            duration: this.duration,
            easingFunc: this.easingFunc = t => t,
            onAnimationFrame: (val) => {
                this.updateNativeStyles(val);
            },
            onAnimationEnd: this._drawerDidClose
        }).start();
    }
    closeLeftDrawer() {
        const disabled = this.isDisabled;
        if (!this.isOpen || disabled) return;
        this.closeDrawer();
    }
    closeRightDrawer() {
        const disabled = this.isDisabled;
        if (!this.isOpen || disabled) return;
        this.closeDrawer();
    }
    openDrawer() {
        if (this.inAnimation || this.isDisabled) return;
        this.inAnimation = true;
        const {
            duration,
            easingFunc = t => t
        } = this.props;
        // enable active status when the method is called by instance reference
        if (!this.isActive) {
            if (this.isDisabled) {
                this.isActive = true;
            } else if (this.isDisabled) {
                this.isActive = true;
            }
        }
        let left = this._getCurrentDrawerWidth();
        let maxWidth = this.MAX_DX;
        if (this.isActive) {
            maxWidth *= -1;
        }
        //this.props.showMask && !this.state.showMask && this.setState({ showMask: true });
        new Animation({
            start: left,
            end: maxWidth,
            duration: this.duration,
            easingFunc: this.easingFunc = t => t,
            onAnimationFrame: (val) => {
                this.updateNativeStyles(val);
            },
            onAnimationEnd: this._drawerDidOpen
        }).start();
    }
    openLeftDrawer() {
        let isOpen = this.isOpen;
        const disabled = this.isDisabled;
        if (isOpen || disabled) return;
        this.isActive = true;
        this.openDrawer();
    }
    openRightDrawer() {
        let isOpen = this.isOpen;
        const disabled = this.isDisabled;
        if ( isOpen || disabled) return;
        this.isActive = true;
        this.openDrawer();
    }
    _drawerDidOpen() {
        this.inAnimation = false;
        if (this.isActive) {
            this.isOpen = true;
           // this.props.onLeftDrawerOpen && this.props.onLeftDrawerOpen();
        } else {
            this.isOpen = true;
            //this.props.onRightDrawerOpen && this.props.onRightDrawerOpen();
        }
        this.props.onDrawerOpen && this.props.onDrawerOpen();
    }
    _drawerDidClose() {
        this.inAnimation = false;
        this.showMask ?
        //this.setState({ showMask: false },
            () => {
            if (this.isActive) {
                this.isOpen = false;
                this.isActive = false;
                //this.props.onLeftDrawerClose && this.props.onLeftDrawerClose();
            } else {
                this.isOpen = false;
                this.isActive = false;
                //this.props.onRightDrawerClose && this.props.onRightDrawerClose();
            }
            //this.props.onDrawerClose && this.props.onDrawerClose();
        } : null
    }
    updateNativeStyles(dx) {
        this.styles.leftDrawer.style.left = -this.MAX_DX + dx;
        this.styles.leftDrawer.style.right = width - dx;
        this.styles.rightDrawer.style.left = width + dx;
        this.styles.rightDrawer.style.right = -this.MAX_DX - dx;
        this.styles.mask.style.backgroundColor = `rgba(0, 0, 0, ${(Math.abs(dx) / this.MAX_DX * this.MAX_ALPHA).toFixed(2)})`;
        this._leftDrawer && this._leftDrawer.setNativeProps(this.styles.leftDrawer);
        this._rightDrawer && this._rightDrawer.setNativeProps(this.styles.rightDrawer);
        this._mask && this._mask.setNativeProps(this.styles.mask);
        if (this.props.type === types.Default || dx === 0) {
            this.styles.main.style.left = dx;
            this.styles.main.style.right = -dx;
            //this._main && this._main.setNativeProps(this.styles.main);
        }
    }
    _handleMainBoardPress() {
        if (this.inAnimation) return;
        this.closeDrawer();
    }
    _bindDrawerRef(component) {
        return React.cloneElement(component, {
            drawer: this
        });
    }
    _mainRefBind(main) {
        this._main = main;
    }
    _maskRefBind(mask) {
        this._mask = mask;
    }
    _leftDrawerRefBind(drawer) {
        this._leftDrawer = drawer;
    }
    _rightDrawerRefBind(drawer) {
        this._rightDrawer = drawer;
    }
}

export {BaseMenu, BaseMenuPosition};
