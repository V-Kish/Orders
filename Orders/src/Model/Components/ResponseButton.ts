import {Button} from "./Button";

export class ResponseButton extends Button {

    async onPress() {
        this.preloader = true
        const lastTitle = this.title;
        this.title = ''
        try{
            await this.onPressFunction();
        } catch (e){
            console.log('onPressError', e)
        } finally {
            this.preloader = false
            this.title = lastTitle
        }
    }
}
