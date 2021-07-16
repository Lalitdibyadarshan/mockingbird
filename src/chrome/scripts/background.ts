export class Background {
    constructor() {
    }

    init() {
        chrome.action.onClicked.addListener((tab) => {
            chrome.scripting.executeScript({
                target: {
                    tabId: tab.id as number
                },
                function: this.reddenPage
            });
        });
        const user = {
            username: 'demo-user'
        };

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            // 2. A page requested user data, respond with a copy of `user`
            if (message === 'get-user-data') {
                sendResponse(user);
            } else if (message === 'hello') {
                sendResponse({farewell: 'Hola'})
            }
            return true;
        });
    }

    reddenPage() {
        if (document.body.firstElementChild) {
            document.body.firstElementChild.innerHTML = "intercepted";
        }
        const originalXHR = window.fetch;
        window.fetch = function (...args) {
            console.log('intercepted', args);
            return originalXHR.apply(this, args);
        }
    }
}

const background = new Background();
background.init();
console.log('this is background script');


