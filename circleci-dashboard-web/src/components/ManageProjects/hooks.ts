import {getFollowedProjectsData} from "../../MockResponse";
import {get} from "utils/http";
import {useEffect, useState} from "react";
import {FollowedProjectsData} from "domain/FollowedProjectsData";

export function useFollowedProjects(inMockMode: boolean) {
    const initialApiData: FollowedProjectsData[] = [];
    const [apiData, setApiData] = useState(initialApiData);

    const API_BASE_URL = "http://localhost:4000";

    const getFollowedProjects = async (): Promise<FollowedProjectsData[]> => await get<FollowedProjectsData[]>(`${API_BASE_URL}/data/projects`);
    useEffect(() => {
        const loadFollowedProjects = async () => setApiData(await getFollowedProjects())
        const loadMockFollowedProjects = async () => setApiData(await getFollowedProjectsData())
        inMockMode ? loadMockFollowedProjects() : loadFollowedProjects();
    }, [])

    return apiData;
}