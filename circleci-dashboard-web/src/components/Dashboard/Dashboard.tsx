import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import LastUpdated from "components/Dashboard/LastUpdated/LastUpdated";
import WidgetContainer from "components/Dashboard/WidgetContainer/WidgetContainer";
import {WidgetData, WidgetJob, WidgetWorkflow} from "domain/WidgetData";
import {SelectedProject} from "domain/SelectedProject";
import {ApiData} from "domain/ApiData";
import edit from "img/edit.svg";
import {useIntervalApiData, useMockIntervalApiData} from "components/Dashboard/hooks";
import styles from "./style.module.css";

interface DashboardProps {
    lastRefreshed: Date
    projects: SelectedProject[]
    setLastRefreshed: (date: Date) => void
    refreshInterval: number
    setRefreshInterval: (newInterval: number) => void
    inMockMode: boolean
}

export default (props: DashboardProps) => {
    const {projects, lastRefreshed, setLastRefreshed, refreshInterval, setRefreshInterval, inMockMode} = props;
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const apiData = inMockMode ? useIntervalApiData(projects, refreshInterval, setLastRefreshed) : useMockIntervalApiData(projects, refreshInterval, setLastRefreshed);

    useEffect(() => {
        const id = setInterval(() => setLastUpdated(getFormattedSince(new Date().getTime() - lastRefreshed.getTime())), 1000)
        return () => clearInterval(id);
    })
    const processAPIData: (apiData: ApiData[]) => WidgetData[] = apiData => {
        return apiData.map(data => {
            const getWidgetWorkflows: (data: ApiData) => WidgetWorkflow[] = (data: ApiData) => {
                return data.workflows.map(workflow => {
                    return {
                        name: workflow.name,
                        id: workflow.id,
                        url: `https://app.circleci.com/pipelines/${workflow.project_slug}/${workflow.pipeline_number}/workflows/${workflow.id}`,
                        createdAt: workflow.created_at,
                        status: workflow.status,
                        stoppedAt: workflow.stopped_at || undefined,
                        jobs: data.jobs.filter(workflowJobs => workflowJobs.workflowId === workflow.id).flatMap(workflowJobs => {
                            return workflowJobs.jobs.map(job => {
                                return {
                                    name: job.name,
                                    startedAt: job.started_at,
                                    status: job.status,
                                    stoppedAt: job.stopped_at,
                                    type: job.type,
                                    url: job.job_number ? `https://app.circleci.com/pipelines/${workflow.project_slug}/${workflow.pipeline_number}/workflows/${workflow.id}/jobs/${job.job_number}` : undefined
                                } as WidgetJob
                            })
                        })

                    } as WidgetWorkflow
                });
            }
            const widgetWorkflows = getWidgetWorkflows(data);
            const latestPipeline = data.pipelines.length ? data.pipelines[0] : undefined

            const getDuration = (workflows: any[]): number => {
                if (!workflows.length) return 0;

                const earliestStartTime = workflows.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))[0].createdAt;
                const latestStoppedTime = workflows.every(wf => wf.createdAt && wf.stoppedAt) ? workflows.sort((a, b) => Date.parse(b.stoppedAt) - Date.parse(a.stoppedAt))[0].stoppedAt : new Date().toISOString();
                return (Date.parse(latestStoppedTime) - Date.parse(earliestStartTime));
            }

            const getFormattedDuration = (durationInMillies: number): string => {
                const difference = new Date(durationInMillies);
                const padNumber = (num: number): string => num < 10 ? `0${num}` : `${num}`
                return `${padNumber((difference.getUTCDate() - 1) * 24 + difference.getUTCHours())}:${padNumber(difference.getUTCMinutes())}:${padNumber(difference.getUTCSeconds())}`;
            }

            const getSince = (workflows: any[]): number => {
                if (!workflows.length) return 0;

                const now = new Date().toISOString();
                const latestStoppedTime = workflows.every(wf => wf.createdAt && wf.stoppedAt) ? workflows.sort((a, b) => Date.parse(b.stoppedAt) - Date.parse(a.stoppedAt))[0].stoppedAt : now;
                return (Date.parse(now) - Date.parse(latestStoppedTime));
            }

            return {
                projectName: data.project.toLocaleUpperCase(),
                pipelineNumber: latestPipeline ? `#${latestPipeline?.number}` : "",
                branch: latestPipeline?.vcs.branch,
                commitSubject: latestPipeline?.vcs.commit?.subject,
                actorName: latestPipeline?.trigger.actor.login,
                repoUrl: latestPipeline?.vcs.origin_repository_url,
                revisionUrl: `${latestPipeline?.vcs.origin_repository_url}/commit/${latestPipeline?.vcs.revision}`,
                duration: getFormattedDuration(getDuration(widgetWorkflows)),
                since: getFormattedSince(getSince(widgetWorkflows)),
                widgetWorkflows: widgetWorkflows

            } as WidgetData;
        })
    }

    const getFormattedSince = (sinceInMillies: number): string => {
        const since = new Date(sinceInMillies);
        const months = since.getUTCMonth();
        if (months > 0) return months > 1 ? `${months} months ago` : `${months} month ago`

        const days = since.getUTCDate() - 1;
        if (days > 0) return days > 1 ? `${days} days ago` : `${days} day ago`

        const hours = since.getUTCHours();
        if (hours > 0) return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`

        const minutes = since.getUTCMinutes();
        if (minutes > 0) return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`

        const seconds = since.getUTCSeconds();
        return seconds > 0 ? seconds > 1 ? `${seconds} seconds ago` : `${seconds} second ago` : "";
    }


    return (
        <div>
            <div className={styles.dashboardHeader}>
                <div>
                    <h1>PROJECTS</h1>
                    <Link to="/edit-projects">
                        <div title="Manage Projects">
                            <object data={edit} type="image/svg+xml" className="svg">icon</object>
                        </div>
                    </Link>
                </div>
                <LastUpdated lastUpdated={lastUpdated} refreshInterval={refreshInterval} setRefreshInterval={setRefreshInterval}/>
            </div>
            <WidgetContainer widgetData={processAPIData(apiData)}/>
        </div>
    );
}
