import type { CacheItem } from "../types";
export default class Tools {
    /**
     * Deep copy an object or array
     * @param obj - The object to copy
     * @param cache - Cache array to handle circular references
     * @returns Deep copied object
     */
    static deepCopy<T>(obj: T, cache?: CacheItem[]): T;
}
