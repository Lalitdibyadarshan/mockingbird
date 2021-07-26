import { ChromeEventListeners } from "../../shared/utils/chrome-event-listeners";

export class Background {
    init() {
        ChromeEventListeners.runtimeExternalMessage();
    }
}

const background = new Background();
background.init();
console.log('this is background script');


