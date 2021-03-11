import { fetchData } from "../../Common/fetchData";
import { currentUser } from "../../Core/CurrentUser";
import { ContactItem } from "../provider/Contacts/ContactItem";
// import { console } from "../Common/console";

class ChatDataProvider {

    static createPrivateChat(contact: ContactItem): Promise<any> {
        return new Promise((resolve, reject) => {
            fetchData(
                `${currentUser().userToken}/${currentUser().currentOsbb.hash}/user/${contact.id}/messages/init`,
                'post',
                null,
                null,
                null,
                true
            )
                .then(
                    (response) => {
                        console.log('CheckResponse', [response]);
                        if (response.statusCode === 200 && response.result && response.result.GroupId) {
                            resolve(response);
                        }
                        reject(response);
                    },
                    error => reject(error)
                )
                .catch(
                    error => reject(error)
                );
        });
    }

    static async createGroupChat(body: { members: Array<string>, name: string, isEncrypt: boolean }) {
        return await fetchData(
            `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/create-group`,
            'POST',
            body,
            null,
            null,
            true
        );
    }

    static async deleteChat(chatId: number) {
        return await fetchData(
            `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${chatId}/remove`,
            'post',
            { userId: currentUser().userId },
            null,
            null,
            true
        );
    }

    static async addUserToChat(chatId: number, members: Array<string>) {
        return await fetchData(
            `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${chatId}/members/add`,
            'post',
            { members },
            null,
            null,
            true
        );
    }

    static async deleteUserFromChat(chatId: number, userId: number) {
        return await  fetchData(`${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${chatId}/members/${userId}/remove`,
            'post',
            { userId },
            null,
            null,
            true
        );
    }

    static async renameChat(chatId: number, name: string) {
        return await
            fetchData(
                `${currentUser().userToken}/${currentUser().currentOsbb.hash}/chat/${chatId}/rename`,
                'post',
                { name },
                null,
                null,
                true
            );
    }
    static async removeUser() {
        return await
            fetchData(
                `/api-v1/auth/tokens/remove`,
                'post',
                { userId:currentUser().userId, token:currentUser().userToken}
            ).then(
                json=>{console.log('removeUser', json)},
                error=>{console.log('removeUser error', error)}
            );
    }
}

export { ChatDataProvider };
