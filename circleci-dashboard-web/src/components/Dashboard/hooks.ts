import {SelectedProject} from "../../domain/SelectedProject";
import {getJobsForWorkflow, getPipelinesForProject, getWorkflowsForPipeline} from "../../MockResponse";
import {get} from "../../utils/http";
import {useCallback, useState} from "react";
import {useInterval} from "utils/hooks";
import {ApiData} from "domain/ApiData";

export function useIntervalApiData(projects: SelectedProject[], interval: number, setLastRefreshed: (date: Date) => void) {
    const initialApiData: ApiData[] = [];
    const [apiData, setApiData] = useState(initialApiData);

    const API_BASE_URL = "http://localhost:4000";
    const getProjectsParams = () => projects.map(project => `${project.name}|${project.branch}`).join(",")

    const getApiData = async(): Promise<ApiData[]> => await get<ApiData[]>(`${API_BASE_URL}/data/builddata`, {projects: getProjectsParams()})
    const loadApiData = useCallback(async isCancelled => {
        const apiData = await getApiData();
        if (isCancelled()) return;
        setApiData(apiData);
        setLastRefreshed(new Date());
    }, [])

    useInterval(loadApiData, interval, true);
    return apiData;
}

export function useMockIntervalApiData(projects: SelectedProject[], interval: number, setLastRefreshed: (date: Date) => void) {
    const initialApiData: ApiData[] = [];
    const [apiData, setApiData] = useState(initialApiData);

    async function getApiData(): Promise<ApiData[]> {
        const pipelines = await getPipelinesForProject();
        const workflows = await getWorkflowsForPipeline();
        const jobs = await getJobsForWorkflow();
        return projects.map(project => project.name).map(project => ({
            project,
            pipelines: pipelines.items,
            workflows: workflows.items,
            jobs: [{workflowId: "ae768c71-303e-44e0-a223-5bc3d7a35354", jobs: jobs.items}]
        }));
    }

    const loadApiData = useCallback(async isCancelled => {
        const apiData = await getApiData();
        if (isCancelled()) return;
        setApiData(apiData);
        setLastRefreshed(new Date());

    }, [])

    useInterval(loadApiData, interval, true);
    return apiData;
}