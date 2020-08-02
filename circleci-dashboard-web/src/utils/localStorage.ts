
export function saveToLocalStorage(key: string, value: string) {
    window.localStorage.setItem(key, value);
}