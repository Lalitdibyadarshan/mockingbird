import { StorageKey } from "@shared/enums/storage-key.enum";
import { ChromeUtils } from "@shared/utils/chrome-utils";
import { ChromeEventListeners } from "../../shared/utils/chrome-event-listeners";

export class Background {
    init() {
        ChromeEventListeners.runtimeExternalMessage();
        ChromeUtils.setChromeStorage(StorageKey.EXTENSION_DATA, []);
    }
}

const background = new Background();
background.init();
console.log('this is background script');


