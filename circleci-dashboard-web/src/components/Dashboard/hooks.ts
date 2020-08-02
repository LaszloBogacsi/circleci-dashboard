import {SelectedProject} from "../../domain/SelectedProject";
import {getJobsForWorkflow, getPipelinesForProject, getWorkflowsForPipeline} from "../../MockResponse";
import {get} from "../../utils/http";
import {useCallback, useState} from "react";
import {useInterval} from "utils/hooks";
import {ApiData} from "domain/ApiData";

export function useIntervalApiData(projects: SelectedProject[], interval: number, setLastRefreshed: (date: Date) => void, inMockMode: boolean) {
    const initialApiData: ApiData[] = [];

    async function getApiData(): Promise<ApiData[]> {

        if (inMockMode) {
            console.log("called");
            const pipelines = await getPipelinesForProject();
            const workflows = await getWorkflowsForPipeline();
            const jobs = await getJobsForWorkflow();
            return projects.map(project => project.name).map(project => ({
                project,
                pipelines: pipelines.items,
                workflows: workflows.items,
                jobs: [{workflowId: "ae768c71-303e-44e0-a223-5bc3d7a35354", jobs: jobs.items}]
            }));
        } else {
            return await get<ApiData[]>("http://localhost:4000/data", {projects: projects.map(project => `${project.name}|${project.branch}`).join(",")});
        }
    }

    const [apiData, setApiData] = useState(initialApiData);
    const loadApiData = useCallback(async isCancelled => {
        const apiData = await getApiData();
        if (isCancelled()) return;
        setApiData(apiData);
        setLastRefreshed(new Date());

    }, [])

    useInterval(loadApiData, interval, true);

    return apiData;
}