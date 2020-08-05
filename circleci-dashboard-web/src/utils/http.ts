import axios from "axios";
import {User} from "../domain/User";
import {Collaboration} from "../domain/Collaboration";
import {ApiData} from "../domain/ApiData";
import {FollowedProjectsData} from "../domain/FollowedProjectsData";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function get<T>(url: string, params: { [key: string]: string } = {}): Promise<T> {
    const result = await axios.get(url, {params, withCredentials: true});
    return result.data as T
}

async function post<T>(url: string, params: { [key: string]: string } = {}, body = {}): Promise<T> {
    const result = await axios.post(url, body, {params, withCredentials: true});
    return result.data as T
}

export async function getUser(): Promise<User> {
    return await get<User>(`${API_BASE_URL}/user`);
}

export async function getAuth() {
    await get(`${API_BASE_URL}/auth`);
}

export async function getCollaborations(): Promise<Collaboration[]> {
    return await get<Collaboration[]>(`${API_BASE_URL}/data/collaboration`);
}

export async function postLogin(token: string) {
    await post(`${API_BASE_URL}/auth/login`, {}, {token});
}

export async function postLogout() {
    await post(`${API_BASE_URL}/auth/logout`, {}, {});
}

export async function getApiData(projects: string): Promise<ApiData[]> {
    return await get<ApiData[]>(`${API_BASE_URL}/data/builddata`, {projects});
}

export async function getFollowedProjects(): Promise<FollowedProjectsData[]> {
    return await get<FollowedProjectsData[]>(`${API_BASE_URL}/data/projects`);
}
