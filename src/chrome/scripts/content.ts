import { MessageActions } from "../../shared/enums/MessageActions";
import { StorageConstants } from "../../shared/constants/StorageConstant";

export class Content {
    isExtensionEnabled: boolean;

    init(): void {
        this.checkExtensionState();
        this.showExtensionBanner();
        chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
    }

    private checkExtensionState(): void {
        this.getData(StorageConstants.EXTENSION_STATE)
        .then((result) => {
            this.isExtensionEnabled = result;
            this.isExtensionEnabled && this.injectScript();
        });
    }

    private getData(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, (result) => {
                resolve(result[key]);
            });
        });
    }

    private handleMessage({ type }, sender, sendResponse): void {
        switch(type) {
            case MessageActions.POWER:
                window.location.reload();            
        }
    }

    private showExtensionBanner(): void {
        window.addEventListener('DOMContentLoaded', () => {
            if (this.isExtensionEnabled) {
                setTimeout(() => {
                    const containerDiv = document.createElement('div');
                    containerDiv.classList.add('interceptor');
                    containerDiv.innerHTML = `
                        <p>MockingBird interception Active🚀</p>
                    `;
                    containerDiv.classList.add('interceptor');
                    document.getElementsByTagName('html')[0].appendChild(containerDiv);
                    document.body.setAttribute('mb-intercept', 'true');
                }, 50);
            }  
        });
    }

    private injectScript(): void {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL("static/js/inject.js");
        script.defer = true;
        document.getElementsByTagName('html')[0].appendChild(script);
    }
}
const content = new Content();
content.init();
