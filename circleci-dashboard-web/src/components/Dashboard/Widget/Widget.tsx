import React from "react";
import {WidgetData} from "domain/WidgetData";
import styles from "./style.module.css";
import success from "img/success.svg";
import failed from "img/failed.svg";
import cancelled from "img/cancelled.svg";
import on_hold from "img/on_hold.svg";
import running from "img/running.svg";

interface WidgetProps {
    data: WidgetData
}

enum WorkflowStatus {
    SUCCESS = "success",
    RUNNING = "running",
    NOT_RUN = "not_run",
    FAILED = "failed",
    ERROR = "error",
    FAILING = "failing",
    ON_HOLD = "on_hold",
    CANCELLED = "cancelled",
    UNAUTHORIZED = "unathorized"
}

enum ProjectStatus {
    SUCCESS = "success",
    RUNNING = "running",
    FAILED = "failed",
    ON_HOLD = "on_hold",
    CANCELLED = "cancelled"
}

enum JobStatus {
    SUCCESS = "success",
    RUNNING = "running",
    FAILED = "failed",
    ON_HOLD = "on_hold",
    CANCELLED = "cancelled"
}

export function getProjectStatus(workflows: { name: string, status: string }[]): ProjectStatus {
    const uniqueByName = workflows.filter((v, i, a) => a.findIndex(workflow => workflow.name === v.name) === i);
    if (uniqueByName.some(wf => wf.status === WorkflowStatus.RUNNING)) {
        return ProjectStatus.RUNNING;
    } else if (uniqueByName.some(wf => wf.status === WorkflowStatus.CANCELLED)) {
        return ProjectStatus.CANCELLED;
    } else if (uniqueByName.some(wf => wf.status === WorkflowStatus.ON_HOLD)) {
        return ProjectStatus.ON_HOLD;
    } else if (uniqueByName.every(wf => wf.status === WorkflowStatus.SUCCESS)) {
        return ProjectStatus.SUCCESS;
    } else {
        return ProjectStatus.FAILED;
    }
}

export const Widget = (props: WidgetProps) => {
    const {data} = props;
    const statusIcons = {
        "success": success, "failed": failed, "cancelled": cancelled, "on_hold": on_hold, "running": running
    }
    // console.log(data);
    const projectStatus = getProjectStatus(data.widgetWorkflows.map(wwf => ({status: wwf.status, name: wwf.name})))
    const jobStatus = (jobStatus: string) => {
        switch (jobStatus) {
            case JobStatus.SUCCESS:
                return statusIcons[JobStatus.SUCCESS];
            case JobStatus.FAILED:
                return statusIcons[JobStatus.FAILED];
            case JobStatus.CANCELLED:
                return statusIcons[JobStatus.CANCELLED];
            case JobStatus.ON_HOLD:
                return statusIcons[JobStatus.ON_HOLD];
            case JobStatus.RUNNING:
                return statusIcons[JobStatus.RUNNING]
            default:
                return statusIcons[JobStatus.FAILED];

        }
    }

    return (
        <div className={`${styles.widget} ${styles[projectStatus]}`}>
            <h2><a href={data.repoUrl}>{data.projectName}</a></h2>
            <div className={styles.widgetSummary}>
                <div>{data.pipelineNumber}</div>
                <div>{data.branch}</div>
                <div>{data.actorName}</div>
                <div><a href={data.revisionUrl}>{data.commitSubject}</a></div>
            </div>
            <div className={styles.workflowsContainer}>{data.widgetWorkflows.map((wf, index) => {
                return (
                    <div key={index}>
                        <div className={styles.workflowName}><a href={wf.url}>{wf.name}</a></div>
                        <div className={styles.jobs}>{wf.jobs.map((job, index) => {
                            return (
                                <a key={index} href={job.url} title={job.name}>
                                    <div>
                                        <object data={jobStatus(job.status)} type="image/svg+xml" className="svg">icon</object>
                                    </div>
                                </a>
                            )
                        })}</div>
                    </div>
                )
            })}</div>
            <div className={styles.timeMetricsContainer}>
                <div>{data.duration}</div>
                <div>{data.since}</div>
            </div>
        </div>
    );
};