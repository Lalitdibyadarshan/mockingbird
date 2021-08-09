import { MessageActions } from "../../shared/enums/MessageActions";
import { PluginDataInterface } from "../../shared/interface/plugin-data.interface";
import { ChromeUtils } from "../../shared/utils/chrome-utils";

export class Inject {
    pluginData: PluginDataInterface[];

    init() {
        this.extendXHR();
        this.extendFetch();
    }

    loadData() {
        ChromeUtils.sendRuntimeMessage({type: MessageActions.FETCH_DATA}, true).then((res) => {
            this.pluginData = res;
        }) 
    }

    private extendXHR(): void {
        this.XHROpenFacade();
        this.XHRSendFacade();
    }

    private XHROpenFacade() {
        window.XMLHttpRequest.prototype.open = ((originalXHR) => {
            return function (...args: any) {
                [this.requestType, this.requestUrl] = args
                originalXHR.apply(this, args as any);
            }
        })(window.XMLHttpRequest.prototype.open);
    }

    private XHRSendFacade() {
        const self = this;
        window.XMLHttpRequest.prototype.send = ((originalSend) => {
            return function(args) {
                if (!self.pluginData) {
                    ChromeUtils.sendRuntimeMessage({type: MessageActions.FETCH_DATA}, true).then((res) => {
                        self.pluginData = res;
                        const mockData = self.verifyRequest(this);
                        mockData ? self.interceptXHR(this, mockData) : originalSend.apply(this, args ? [args] : []);                     
                    }) 
                } else {
                    const mockData = self.verifyRequest(this);
                    mockData ? self.interceptXHR(this, mockData) : originalSend.apply(this, args ? [args] : []);
                }
                
            }
        })(window.XMLHttpRequest.prototype.send);
    }

    private verifyRequest(requestObj: XMLHttpRequest): PluginDataInterface {
        return this.pluginData
            .find(data => {
                if (!data.isEnabled) return false;
                const regexURL = new RegExp(data.url
                    // eslint-disable-next-line no-useless-escape
                    .replace(/[|\\{}()[\]^$+*?.\/\:]/g, '\\$&')
                    .replace(/-/g, '\\x2d')
                    .replace('DYNAMIC', '[A-Za-z0-9]'));

                return regexURL.test(requestObj['requestUrl']) && data.type === requestObj['requestType']
            });
    }
    
    private interceptXHR(requestObj: XMLHttpRequest, mockData: PluginDataInterface) {
        setTimeout(() => {
            this.overrideXHRProperties(requestObj);
            this.overrideXHREvents(requestObj, mockData.delay);
            this.modifyResponse(requestObj, mockData);
        }, 0);
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
    }

    private modifyResponse(proxyXhr, mockResponse: PluginDataInterface) {
        const selectedMock = mockResponse.mockData.find(data => data.alias === mockResponse.selectedMock);
        proxyXhr.response = proxyXhr.responseText = selectedMock.data;
        proxyXhr.status = mockResponse.status;
        proxyXhr.readyState = 4;
        proxyXhr.onreadystatechange();
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
