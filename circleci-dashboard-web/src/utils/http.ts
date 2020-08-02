import axios from "axios";

export async function get<T>(url: string, params: { [key: string]: string } = {}): Promise<T> {
    const result = await axios.get(url, {params, withCredentials: true});
    return result.data as T
}

export async function post<T>(url: string, params: { [key: string]: string } = {}, body = {}): Promise<T> {
    const result = await axios.post(url, body, {params, withCredentials: true});
    return result.data as T
}