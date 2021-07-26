import { ChromeEventListeners } from "../../shared/utils/chrome-event-listeners";
import { ChromeUtils } from "../../shared/utils/chrome-utils";
import { StorageKey } from "../../shared/enums/storage-key.enum";

export class Content {
    isExtensionEnabled: boolean;

    init(): void {
        this.checkExtensionState();
        ChromeEventListeners.runtimeMessage();
    }

    private checkExtensionState(): void {
        ChromeUtils.getChromeStorage(StorageKey.EXTENSION_STATE)
            .then((result) => {
                this.isExtensionEnabled = result;
                if (this.isExtensionEnabled) {
                    this.injectScript();
                    window.addEventListener('DOMContentLoaded', this.showExtensionBanner.bind(this));
                }
            });
    }

    private showExtensionBanner(): void {
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

    private injectScript(): void {
        const script = document.createElement('script');
        script.src = ChromeUtils.getRuntimeUrl("static/js/inject.js");
        script.defer = true;
        script.id = 'mbScript';
        script.setAttribute('md-id', chrome.runtime.id);
        document.getElementsByTagName('html')[0].appendChild(script);
    }
}
const content = new Content();
content.init();
