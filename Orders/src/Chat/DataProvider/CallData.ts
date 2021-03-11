import { fetchData } from "../functions/fetchData";
import {currentUser} from "../controllers/CurrentUser";
class CallData {
    //Создать звонок
    static async createCall(body: { userToId: number, roomUrl:string }) {
        return await fetchData(
            `/api-v1/${currentUser().userToken}/dialer/call`,
            'POST',
            body
        );
    }

    static async canCall(body: { userToId: number}) {
        return await fetchData(
            `/api-v1/${currentUser().userToken}/dialer/call/available`,
            'POST',
            body
        );
    }
    //Ответить на входящий звонок
    //В случае успешного соединения statusCode=200
    // Обеим сторонам будет отправлено PUSH уведомление с событием “event_dialer_startconversation“
    static async answerCall(hash:string) {
        return await fetchData(
            `/api-v1/${currentUser().userToken}/dialer/call/${hash}/answer`,
            'POST',
        );
    }
    // Завершить или отклонить звонок
    //В случае успешного соединения statusCode=200
    // Обеим сторонам будет отправлено PUSH уведомление с событием “event_dialer_finishconversation“
    static async finishCall(hash) {
        try {
            return await fetchData(
                `/api-v1/${currentUser().userToken}/dialer/call/${hash}/finish`,
                'POST',
            );
        } catch(e){
            return true
        }
    }
    // Получить информацию о звонке
    static async getInformationCall(hash) {
        return await fetchData(
            `/api-v1/${currentUser().userToken}/dialer/call/${hash}`,
            'GET',
        );
    }
    // Подтвердить возможность соеденения
    static async confirmConnection(hash) {
        return await fetchData(
            `/api-v1/${currentUser().userToken}/dialer/call/${hash}/confirm-connection`,
            'POST',
        );
    }
    // Все активные звонки пользователя на данных момент
    static async getActiveCalls() {
        return await fetchData(
            `/api-v1/${currentUser().userToken}/dialer/active-calls`,
            'GET',
        );
    }
    // Завершить звонок по таймауту
    static async noAnswer(hash) {
        return await fetchData(
            `/api-v1/${currentUser().userToken}/dialer/call/${hash}/no-answer`,
            'POST',
        );
    }
}
export { CallData }
