export interface FollowedProjectsData {
    branches: { [key: string]: any }
    oss: boolean
    reponame: string
    parallel: number
    username: string
    has_usable_key: boolean
    vcs_type: string
    language: string | null
    vcs_url: string
    following: boolean
    default_branch: string
}