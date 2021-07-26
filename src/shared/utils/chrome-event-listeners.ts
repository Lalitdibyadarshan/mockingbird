import messageResolver from "./message-resolver";

export class ChromeEventListeners {
    static runtimeMessage() {
        chrome.runtime.onMessage.addListener(messageResolver.resolve);
    }

    static runtimeExternalMessage() {
        chrome.runtime.onMessageExternal.addListener(messageResolver.resolve);
    }
}