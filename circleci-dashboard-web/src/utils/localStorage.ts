
export function saveToLocalStorage(key: string, value: string) {
    window.localStorage.setItem(key, value);
}

export function getFromLocalStorage<T>(key: string): T | undefined {
    const item = localStorage.getItem(key)
    return item !== null ? JSON.parse(item) as any as T : undefined;
}