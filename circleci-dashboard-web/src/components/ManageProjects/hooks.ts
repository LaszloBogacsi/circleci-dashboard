import {getFollowedProjectsData} from "../../MockResponse";
import {getFollowedProjects} from "utils/http";
import {useEffect, useState} from "react";
import {FollowedProjectsData} from "domain/FollowedProjectsData";

export function useFollowedProjects(inMockMode: boolean) {
    const initialApiData: FollowedProjectsData[] = [];
    const [apiData, setApiData] = useState(initialApiData);

    useEffect(() => {
        const loadFollowedProjects = async () => setApiData(await getFollowedProjects())
        const loadMockFollowedProjects = async () => setApiData(await getFollowedProjectsData())
        inMockMode ? loadMockFollowedProjects() : loadFollowedProjects();
    }, [])

    return apiData;
}