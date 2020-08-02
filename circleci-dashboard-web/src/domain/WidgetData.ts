export interface WidgetData {
    projectName: string
    pipelineNumber: string
    branch: string
    commitSubject: string
    actorName: string
    repoUrl: string
    revisionUrl: string
    duration: string
    since: string
    widgetWorkflows: WidgetWorkflow[]
}

export interface WidgetWorkflow {
    name: string
    id: string
    url: string
    createdAt: string
    status: string
    stoppedAt?: string
    jobs: WidgetJob[]
}

export interface WidgetJob {
    name: string
    status: string
    type: string
    url?: string
    startedAt: string
    stoppedAt?: string
}



