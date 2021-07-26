import { useEffect, useState } from "react";
import { StorageKey } from "../enums/storage-key.enum";
import { ChromeUtils } from "../utils/chrome-utils";

export const useChromeStorage = (key: StorageKey, initialValue: any) => {
    let [entity, setEntity] = useState(async () => {
        const val =  await ChromeUtils.getChromeStorage(key);
        return val ? val : initialValue;
    });

    useEffect(() => {
        ChromeUtils.setChromeStorage(key, entity);
    }, [entity, key, initialValue]);

    return [entity, setEntity] as any[];
}
