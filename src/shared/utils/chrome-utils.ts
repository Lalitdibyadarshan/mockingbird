import { StorageKey } from "../enums/storage-key.enum";
import { MessageInterface } from "../interface/message.interface";

export class ChromeUtils {
    
    static getChromeStorage(key: StorageKey): Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, (result) => {
                result ?
                    resolve(result[key]) :
                    reject('no results');
            });
        });
    }

    static setChromeStorage(key: StorageKey, val: any): void {
        chrome.storage.sync.set({[key]: val});
    }

    static sendTabMessage(message: MessageInterface, responseCB?: (response: any) => void) {
        responseCB = responseCB || function(res) {};
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, responseCB);
        });
    }

    static sendRuntimeMessage(message: MessageInterface, isInjectedScript = false): Promise<any> {


        return new Promise((resolve, reject) => {
            const chromeId  = document.getElementById('mbScript') && document.getElementById('mbScript').getAttribute('md-id');
            if (isInjectedScript && !chromeId) {
                reject('Chrome id not available');
            };
            const args = [
                chromeId,
                message,
                resolve
            ].filter(Boolean);
    
            chrome.runtime.sendMessage.apply(this, args);
        });
    }

    static getRuntimeUrl(path:string) {
        return chrome.runtime.getURL(path);
    }

    static openOptionsPage() {
        chrome.runtime.openOptionsPage()
    }
}