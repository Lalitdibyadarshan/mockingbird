import { useEffect, useState } from "react";

export const useChromeStorage = (key: string, initialValue: any) => {
    let value: any = null;
    let [entity, setEntity] = useState(null);
    // const [dataLoaded, setDataLoaded] = useState(false);

    chrome.storage.sync.get(key, res => {
        value = res[key];
        // setDataLoaded(true);
    });

    useEffect(() => {
        setEntity(value || initialValue);
    }, [value]);

    useEffect(() => {
        if (value !== entity) {
            chrome.storage.sync.set({[key]: entity});
        }
    }, [entity]);

    return [entity, setEntity] as any[];
}
