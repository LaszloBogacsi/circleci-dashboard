export interface ApiData {
    project: string
    pipelines: Pipeline[]
    workflows: Workflow[]
    jobs: { workflowId: string, jobs: Job[] }[]
}

interface Job {
    dependencies: string[]
    id: string
    job_number?: number
    name: string
    project_slug: string
    started_at: string | null
    status: string
    stopped_at?: string
    type: string
}

interface Workflow {
    created_at: string
    id: string
    name: string
    pipeline_id: string
    pipeline_number: number
    project_slug: string
    started_by: string
    status: string
    stopped_at: string
}

interface Pipeline {
    created_at: string
    errors: { message: string, type: string }[]
    id: string
    number: number
    project_slug: string
    state: string
    trigger: { actor: { login: string, avatar_url: string }, received_at: string, type: string }
    updated_at: string
    vcs: { branch: string, commit?: { body: string, subject: string }, origin_repository_url: string, provider_name: string, revision: string, target_repository_url: string }
}

