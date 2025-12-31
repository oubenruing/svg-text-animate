import type { CacheItem } from "../types"

export default class Tools {
  /**
   * Deep copy an object or array
   * @param obj - The object to copy
   * @param cache - Cache array to handle circular references
   * @returns Deep copied object
   */
  static deepCopy<T>(obj: T, cache: CacheItem[] = []): T {
    function find(
      list: CacheItem[],
      f: (item: CacheItem) => boolean
    ): CacheItem | undefined {
      return list.filter(f)[0]
    }

    // just return if obj is immutable value
    if (obj === null || typeof obj !== "object") {
      return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, (c) => c.original === obj)
    if (hit) {
      return hit.copy
    }

    const copy: any = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
      original: obj,
      copy,
    })

    Object.keys(obj).forEach((key) => {
      copy[key] = this.deepCopy((obj as any)[key], cache)
    })

    return copy
  }
}
