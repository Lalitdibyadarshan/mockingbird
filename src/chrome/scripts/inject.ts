export class Inject {
    init() {

        // TODO: Remove consoles
        console.log('this is injected', window);
        window['test'] = 'kaizen' as any;
        console.log('this is injected', window.test);
        
        let originalXHR = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function (...args: any) {
            console.log('intecept1',args);
            return originalXHR.apply(this, args as any);
        };
        
        let originalFetch = window.fetch;
        window.fetch = function(...args) {
            console.log('fetch intecept', args);
            return originalFetch.apply(this, args);
        }
    }
}

var inject = new Inject();
inject.init();