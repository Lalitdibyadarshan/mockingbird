import { useEffect, useState } from "react";
import { StorageKey } from "../enums/storage-key.enum";
import { ChromeUtils } from "../utils/chrome-utils";

export const useChromeStorage = (key: StorageKey, initialValue: any) => {
    let [entity, setEntity] = useState(initialValue);

    useEffect(() => {
        ChromeUtils.getChromeStorage(key)
            .then(setEntity);
    }, [key]);

    useEffect(() => {
        console.log(entity)
        ChromeUtils.setChromeStorage(key, entity);
    }, [entity, key]);

    return [entity, setEntity] as any[];
}
