import { MessageActions } from "../../shared/enums/MessageActions";
import { PluginDataInterface } from "../../shared/interface/plugin-data.interface";
import { ChromeUtils } from "../../shared/utils/chrome-utils";

export class Inject {
    URL = 'https://jsonplaceholder.typicode.com/todos/1';
    pluginData: PluginDataInterface[];

    init() {
        this.loadData();
        this.extendXHR();
        this.extendFetch();
    }

    loadData() {
        ChromeUtils.sendRuntimeMessage({type: MessageActions.FETCH_DATA}, true)
            .then(data => {
                this.pluginData = data;
            })
    }

    extendXHR(): void {
        const self = this;
        window.XMLHttpRequest.prototype.open = ((originalXHR) => {
            return function (...args: any) {
                setTimeout(() => {
                    const mockData = self.pluginData && self.pluginData.find(data => data.url === args[1]);
                    if (mockData) {
                        self.overrideXHRProperties(this);
                        self.overrideXHREvents(this, mockData.delay);
                        self.modifyResponse(this, mockData);
                    }
                }, 0);
                originalXHR.apply(this, args as any);
            }
        })(window.XMLHttpRequest.prototype.open);
    }

    private overrideXHRProperties(proxyXhr) {
        let readyState = proxyXhr.readyState;
        let status = proxyXhr.status

        Object.defineProperty(proxyXhr, 'response',     {writable: true});
        Object.defineProperty(proxyXhr, 'responseText', {writable: true});
        Object.defineProperty(proxyXhr, 'status', {
            get() { return status },
            set(newVal) { status = newVal }
        });
        Object.defineProperty(proxyXhr, 'readyState', {
            get() { return readyState },
            set(newVal) { readyState = newVal }
        });
    }

    private overrideXHREvents(proxyXhr, delay) {
        if (proxyXhr.onreadystatechange) {
            proxyXhr.onreadystatechange = ((onreadystatechange) => {
                return () => {
                    setTimeout(() => {
                        onreadystatechange();
                    }, delay);
                }
            })(proxyXhr.onreadystatechange);
        }
        proxyXhr.onabort = () => {
            proxyXhr.onreadystatechange();
        }
    }

    private modifyResponse(proxyXhr, mockResponse: PluginDataInterface) {
        proxyXhr.abort();
        proxyXhr.response = proxyXhr.responseText = mockResponse.mockData[0].data;
        proxyXhr.status = mockResponse.status;
        proxyXhr.readyState = 4;
    }

    private extendFetch(): void {
        window.fetch = ((originalFetch) => {
            return function(...args) {
                return originalFetch.apply(this, args);
            }
        })(window.fetch);
    }

}

var inject = new Inject();
inject.init();
