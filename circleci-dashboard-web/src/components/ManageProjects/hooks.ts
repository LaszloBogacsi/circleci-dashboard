import {getFollowedProjects} from "../../MockResponse";
import {get} from "../../utils/http";
import {useEffect, useState} from "react";
import {FollowedProjectsData} from "../../App";

export function useFollowedProjects(inMockMode: boolean) {
    const initialApiData: FollowedProjectsData[] = [];

    async function getApiData(): Promise<FollowedProjectsData[]> {
        if (inMockMode) {
            return await getFollowedProjects();

        } else {
            return await get<FollowedProjectsData[]>("http://localhost:4000/projects");
        }
    }

    const [apiData, setApiData] = useState(initialApiData);
    useEffect(() => {
        const loadApiData = async () => {
            const apiData = await getApiData();
            setApiData(apiData);
        }
        loadApiData();
    }, [])

    return apiData;
}